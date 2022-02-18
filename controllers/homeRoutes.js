const router = require("express").Router();
const { User, Events, Weather, Photo, Rsvp } = require("../models");
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
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.get("/event/:id", async (req, res) => {
  try {
    const eventData = await Events.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ["id", "name"],
      },
    });

    const events = eventData.get({ plain: true });
      let eventDate = new Date(events.event_date);
      const month = eventDate.toLocaleString('default', { month: 'long' });
      let formattedDate = `${month} ${eventDate.getDate()}, ${eventDate.getFullYear()} ${eventDate.toLocaleTimeString()}`;
      console.log(req.session)
    res.render("event", { data : {
      events,
      formattedDate,
      loggedIn: req.session.logged_in,
      userId: req.session.user_id,
    }
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// router.post('/registration/:event_id/:user_id', async (req, res) =>{
//   try {
//     const newRsvp = Rsvp.create({
//       user_id: req.params.user_id,
//       event_id: req.params.event_id
//     });
//     res.status(200).json(newRsvp);
//   } catch (err) {
//     res.status(500);
//   }
// })


// Todo: GET route to redirect for login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

