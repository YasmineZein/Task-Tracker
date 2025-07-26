require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const app = express();
const PORT = process.env.DB_PORT;
const User = require('./models/User');
const bcrypt = require('bcryptjs');

app.use(express.json());

app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: email, password, name.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid email format.' });
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        'Password must be at least 8 characters long and contain both letters and numbers.',
    });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: 'Email is already registered.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.create({ name, email, password: hashedPassword });
    return res
      .status(201)
      .json({ success: true, message: 'User created successfully.' });
  } catch (err) {
    console.error('Error during signup:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Connection error ❌:', err));
