require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const app = express();
const PORT = process.env.DB_PORT;

app.use(express.json());

const userLoginRouter = require('./routes/userLogin');
app.use('/api/auth', userLoginRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Connection error ❌:', err));
