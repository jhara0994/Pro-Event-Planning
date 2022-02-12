const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
// const photoRoutes = require('./photoRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
// router.use('/photos', photoRoutes);

module.exports = router;