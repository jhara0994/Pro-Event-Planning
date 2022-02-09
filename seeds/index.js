const sequelize = require('../config/connection');
const { User } = require('../models');

const seedUsers = require('./userData');
const seedEvents = require('./eventData');
const seedWeather = require('./weatherData');
const seedPhotos = require('./photoData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  const users = await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  })
  console.log('\n----- USERS SYNCED -----\n');

  await seedEvents();
  console.log('\n----- EVENTS SEEDED -----\n');

  await seedWeather();
  console.log('\n----- WEATHER SEEDED -----\n');

  await seedPhotos();
  console.log('\n----- EVENT PHOTOS SEEDED -----\n');

  process.exit(0);
};

seedAll();