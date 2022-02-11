const sequelize = require("../config/connection");
const { User, Events, Photo, Weather } = require("../models");


const seedUsers = require('./userData.json');
const seedEvents = require('./eventData.json');
const seedWeather = require('./weatherData');
const seedPhotos = require('./photoData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });
  console.log("\n----- USERS SYNCED -----\n");

  await Events.bulkCreate(seedEvents, {
    returning: true
  })
  console.log('\n----- EVENTS SEEDED -----\n');

  // await seedWeather();
  // console.log('\n----- WEATHER SEEDED -----\n');

  await Photo.bulkCreate(seedPhotos, {
    returning: true
  });
  console.log('\n----- EVENT PHOTOS SEEDED -----\n');

  process.exit(0);
};

seedAll();
