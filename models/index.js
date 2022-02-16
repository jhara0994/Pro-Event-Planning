const User = require('./User');
const Events = require('./Events');
const Photo = require('./Photo')
const Rsvp = require('./Rsvp');
const Guests = require('./Guests');

User.hasMany(Events);

Events.belongsTo(User);

Events.hasMany(Guests);

Guests.belongsTo(Events);

User.hasMany(Guests);

Guests.belongsTo(User);

Events.hasMany(Photo);

Photo.belongsTo(Events);

Photo.belongsTo(User);

User.hasMany(Photo);

Events.hasMany(Rsvp);

Rsvp.belongsTo(Events);

User.hasMany(Rsvp);

Rsvp.belongsTo(User);



module.exports = { User, Events, Photo, Rsvp, Guests };