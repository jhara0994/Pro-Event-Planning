const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const photoRoutes = require('./photoRoutes');
const rsvpRoutes = require('./rsvpRoutes')
const {weatherRouter} = require('./weatherroute')

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/photos', photoRoutes);
router.use('/rsvp', rsvpRoutes);
router.use('/weather', weatherRouter);

module.exports = router;