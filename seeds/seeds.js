const sequelize = require("../config/connection");
const { User, Events, Photo, Weather } = require("../models");

<<<<<<< HEAD:seeds/seeds.js
const seedUsers = require('./userData.json');
const seedEvents = require('./eventData.json');
const seedWeather = require('./weatherData');
const seedPhotos = require('./photoData.json');
=======
const seedUsers = require("./userData.json");
const seedEvents = require("./eventData.json");
const seedWeather = require("./weatherData");
const seedPhotos = require("./photoData");
>>>>>>> main:seeds/index.js

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });
  console.log("\n----- USERS SYNCED -----\n");

  await Events.bulkCreate(seedEvents, {
<<<<<<< HEAD:seeds/seeds.js
    returning: true
  })
  console.log('\n----- EVENTS SEEDED -----\n');
=======
    returning: true,
  });
  console.log("\n----- EVENTS SEEDED -----\n");
>>>>>>> main:seeds/index.js

  // await seedWeather();
  // console.log('\n----- WEATHER SEEDED -----\n');

  // await seedPhotos();
  // console.log('\n----- EVENT PHOTOS SEEDED -----\n');

  process.exit(0);
};

seedAll();
