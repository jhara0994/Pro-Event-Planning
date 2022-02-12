const User = require('./User');
const Events = require('./Events');
const Weather = require('./Weather')
const Photo = require('./Photo')

User.hasMany(Events);

Events.belongsTo(User)

// Event.hasOne(Weather, {

// })

// Weather.belongsTo(Event, {

// })

Events.hasMany(Photo)

Photo.belongsTo(Events)

Photo.belongsTo(User)


module.exports = { User, Events, Weather, Photo };