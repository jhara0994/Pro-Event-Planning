<<<<<<< HEAD
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
=======
const User = require("./User");
const Events = require("./Events");
const Weather = require("./Weather");
const Photo = require("./Photo");

User.hasMany(Events, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

Events.belongsTo(User, {
  foreignKey: "id",
  onDelete: "CASCADE",
});
>>>>>>> main

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

<<<<<<< HEAD

module.exports = { User, Events, Weather, Photo };
=======
module.exports = { User, Events, Weather, Photo };
>>>>>>> main
