const User = require('./User');
const Event = require('./Events');
const Weather = require('./Weather')
const Photo = require('./Photo')

User.hasMany(Event, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});

Event.belongsTo(User, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
})

// Event.hasOne(Weather, {

// })

// Weather.belongsTo(Event, {

// })

// Event.hasMany(Photo, {

// })

// Photo.belongsTo(Event, {

// })

// Photo.belongsTo(User, {

// })


module.exports = { User, Event, Weather, Photo };