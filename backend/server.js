   require('dotenv').config();
   const express = require('express');
   const sequelize = require('./config/database');
   const app = express();
   const PORT = process.env.DB_PORT;

   sequelize.authenticate()
       .then(() => console.log('Database connected ✅'))
       .catch((err) => console.error('Connection error ❌:', err));
   app.listen(PORT, () => {
       console.log(`Server running on http://localhost:${PORT} 🚀`);
   });
   