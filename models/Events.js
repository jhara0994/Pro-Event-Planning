const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Events extends Model { }

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
    location_city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location_state: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [2]
    },
    event_description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'This is a default message'
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    guest_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  event_description: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'This is a default message'
},
  user_id: {
  type: DataTypes.INTEGER,
  reference: {
    model: 'user',
    key: 'id'
  }
}
  },
  event_description: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'This is a default message'
},
  user_id: {
  type: DataTypes.INTEGER,
  reference: {
    model: 'User',
    key: 'id'
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
