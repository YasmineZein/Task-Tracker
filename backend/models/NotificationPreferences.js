   const { Model, DataTypes } = require('sequelize');
   const sequelize = require('../config/database');
   const User = require('./User');


   const NotificationPreferences = sequelize.define('NotificationPreferences', {
       notifsId: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
       },
       userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: User,
            key: 'userId',
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

   User.hasOne(NotificationPreferences, { foreignKey: 'userId' });
   NotificationPreferences.belongsTo(User, { foreignKey: 'userId' });

   module.exports = NotificationPreferences;
   