require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const app = express();
const PORT = process.env.DB_PORT;

const userSignupRouter = require('./routes/userSignup');

app.use(express.json());
app.use('/api/auth', userSignupRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Connection error ❌:', err));
