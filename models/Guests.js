const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Guests extends Model{}

Guests.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      event_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'events',
              key: 'id'
          }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'guests',
    }
  );
  
  module.exports = Guests;