const { User } = require('../models');

const userData = [
    {
        id: 1,
        name: "LadyUx",
        email: "ladyux@hotmail.com",
        password: "password12345"
    },
    {
        id: 2,
        name: "SirTechie",
        email: "sirtechie@gmail.com",
        password: "password12345"
    },
    {
        id: 3,
        name: "JavaMan",
        email: "javaman@aol.com",
        password: "password12345"
    }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
