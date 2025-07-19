   const { DataTypes } = require('sequelize');
   const sequelize = require('../config/database'); 
   const User = require('./User');



   const Task = sequelize.define('Task', {
       task_id: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
       },
       user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'user_id',
            },
        },
       title: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       description: {
           type: DataTypes.TEXT,
           allowNull: true,
       },
       status: {
           type: DataTypes.ENUM('To-do', 'In progress', 'Done'),
           allowNull: false,
           defaultValue: 'To-do'
       },
       estimate_time: {
           type: DataTypes.INTEGER,
           allowNull: true,
       },
       logged_time: {
           type: DataTypes.INTEGER,
           allowNull: true,
       },
       due_date: {
           type: DataTypes.DATE,
           allowNull: true,
       },
       priority: {
           type: DataTypes.INTEGER,
           allowNull: true,
       }
   }, {
       timestamps: true,
   });

   User.hasMany(Task, { foreignKey: 'user_id' });
   Task.belongsTo(User, { foreignKey: 'user_id' });

   module.exports = Task;
   