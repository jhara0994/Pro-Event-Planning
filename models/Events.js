const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Events extends Model{}

Events.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      event_description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'This is a default message'
      },
      creator_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      guest_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'events',
    }
  );
  
  module.exports = Events;
