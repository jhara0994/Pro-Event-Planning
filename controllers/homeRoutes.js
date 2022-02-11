const router = require("express").Router();
const { User, Events, Weather, Photo } = require("../models");
const withAuth = require("../utils/auth.js");

// Todo: GET route to show all events on homepage
<<<<<<< HEAD
router.get('/', async (req, res) => {
    try {
      const eventData = await Events.findAll({
        include:
          {
            model: User,
            attributes: [ 'id' ],
          },
      });
  
      const events = eventData.map((Events) => Events.get({ plain: true }));
  
      res.render('homepage', {
        events,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

=======
router.get("/", async (req, res) => {
  try {
    const eventData = await Events.findAll({
      include: {
        model: User,
        attributes: ["id"],
      },
    });
>>>>>>> main

    const events = eventData.map((Events) => Events.get({ plain: true }));
    res.render("homepage", {
      events,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Todo: GET route to redirect for login
<<<<<<< HEAD
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;
=======
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
>>>>>>> main
