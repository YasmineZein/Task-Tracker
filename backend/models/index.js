
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');


const User = require('./User');
const Task = require('./Task');
const NotificationPreferences = require('./NotificationPreferences');


User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(NotificationPreferences, { foreignKey: 'userId' });
NotificationPreferences.belongsTo(User, { foreignKey: 'userId' });


module.exports = {
  sequelize,
  User,
  Task,
  NotificationPreferences
};
