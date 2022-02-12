const User = require('./User');
const Events = require('./Events');
// const Weather = require('./Weather')
const Photo = require('./Photo')
const Rsvp = require('./Rsvp');

User.hasMany(Events);

Events.belongsTo(User);

// Event.hasOne(Weather, {

// })

// Weather.belongsTo(Event, {

// })

Events.hasMany(Photo);

Photo.belongsTo(Events);

Photo.belongsTo(User);

Events.hasMany(Rsvp);

Rsvp.belongsTo(Events);


module.exports = { User, Events, Photo, Rsvp };