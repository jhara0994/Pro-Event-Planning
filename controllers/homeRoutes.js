const router = require("express").Router();
const { User, Events, Weather, Photo } = require("../models");
const withAuth = require("../utils/auth.js");

// Todo: GET route to show all events on homepage
router.get("/", async (req, res) => {
  try {
    const eventData = await Events.findAll({
      include: {
        model: User,
        attributes: ["id"],
      },
    });
    
    const events = eventData.map((Events) => Events.get({ plain: true }));
    res.render("homepage", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Todo: GET route to redirect for login
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;

