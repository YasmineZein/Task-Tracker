const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Logger = require('../config/logger');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  Logger.info('Login attempt initiated', { email });

  if (!email || !password) {
    Logger.warn('Login failed - missing credentials', { email });
    return res
      .status(400)
      .json({ success: false, message: 'Missing email or password.' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      Logger.warn('Login failed - user not found', { email });
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      Logger.warn('Login failed - invalid password', {
        email,
        userId: user.userId,
      });
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    // Return user data (without password) and token
    const userData = {
      id: user.userId,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    };

    Logger.info('User login successful', {
      userId: user.userId,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: userData,
    });
  } catch (err) {
    Logger.error('Error during login:', {
      error: err.message,
      stack: err.stack,
      email,
    });
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
