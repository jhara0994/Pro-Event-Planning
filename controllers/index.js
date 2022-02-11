const router = require("express").Router();

//const apiRoutes = require('./api');
const homeRoutes = require("./homeRoutes.js");

<<<<<<< HEAD
router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
=======
router.use("/", homeRoutes);
//router.use('/api', apiRoutes);
>>>>>>> main

module.exports = router;
