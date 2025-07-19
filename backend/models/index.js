  const sequelize = require('../config/database')
  const User = require('./User')
  const Task = require('./Task')
  const NotificationPreferences = require('./NotificationPreferences')

  
  User.hasMany(Task, { foreignKey: 'user_id' })
  Task.belongsTo(User, { foreignKey: 'user_id' })

  User.hasOne(NotificationPreferences, { foreignKey: 'user_id' })
  NotificationPreferences.belongsTo(User, { foreignKey: 'user_id' })

  module.exports = {
    sequelize,
    User,
    Task,
    NotificationPreferences
  };
  