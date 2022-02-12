const { Photo } = require('../models');

const photoData = [
    {
        id: 1,
        image: 'conference-center.jpeg',
        event_id: 1,
        user_id: 3
    },
    {
        id: 2,
        image: 'party.jpeg',
        event_id: 2,
        user_id: 1
    },
]

const seedPhoto = () => Photo.bulkCreate(photoData);

module.exports = seedPhoto;