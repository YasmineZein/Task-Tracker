   const { DataTypes } = require('sequelize')
   const sequelize = require('../config/database')
   const User = require('./User')



   const NotificationPreferences = sequelize.define('NotificationPreferences', {
       notifs_id: {
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
       email_notifs: {
           type: DataTypes.BOOLEAN,
           defaultValue: false,
       },
       reminder_hours: {
           type: DataTypes.INTEGER,
           allowNull: true,
       },
   }, {
       sequelize,
       modelName: 'NotificationPreferences',
       timestamps: false,
   });

   User.hasOne(NotificationPreferences, { foreignKey: 'user_id' });
   NotificationPreferences.belongsTo(User, { foreignKey: 'user_id' });

   module.exports = NotificationPreferences;
   