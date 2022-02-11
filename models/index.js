const User = require('./User');
const Events = require('./Events');
const Weather = require('./Weather')
const Photo = require('./Photo')

User.hasMany(Events, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});

Events.belongsTo(User, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
})

// Event.hasOne(Weather, {

// })

// Weather.belongsTo(Event, {

// })

Events.hasMany(Photo, {
  foreignKey: 'id'
})

Photo.belongsTo(Events, {
  foreignKey: 'id'
})

Photo.belongsTo(User, {
  foreignKey: 'id'
})


module.exports = { User, Events, Weather, Photo };