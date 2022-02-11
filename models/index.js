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

// Event.hasMany(Photo, {

// })

// Photo.belongsTo(Event, {

// })

// Photo.belongsTo(User, {

// })


module.exports = { User, Events, Weather, Photo };