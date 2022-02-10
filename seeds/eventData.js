const { Events } = require('../models');

const eventData = [
    {
        id: 1,
        title: 'Party like its 1999',
        event_date: '4/20/2022',
        event_description: 'Smoke shows and good jams are the highlight of this event.',
        user_id: 1
    },
    {
        id: 2,
        title: 'Welcome to the Metaverse',
        event_date: '3/15/2022',
        event_description: 'Welcome to the metaverse! Where all your dreams can come true virtually!',
        user_id: 2
    },
]

const seedEvents = () => Events.bulkCreate(eventData);

module.exports = seedEvents;