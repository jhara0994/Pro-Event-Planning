const sequelize = require("../config/connection");
const { User, Events, Photo, Rsvp, Guests } = require("../models");


const seedUsers = require('./userData.json');
const seedEvents = require('./eventData.json');
const seedPhotos = require('./photoData.json');
const seedRsvp = require('./rsvpData.json');
const seedGuests = require('./guestsData.json');

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

  await Photo.bulkCreate(seedPhotos, {
    returning: true
  });
  console.log('\n----- EVENT PHOTOS SEEDED -----\n');

  await Rsvp.bulkCreate(seedRsvp, {
    returning: true
  });
  console.log('\n----- RSVPs SEEDED -----\n');

  await Guests.bulkCreate(seedGuests, {
    returning: true
  });
  console.log('\n----- GUESTS SEEDED -----\n');

  process.exit(0);
};

seedAll();
