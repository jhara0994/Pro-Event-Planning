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
    res.render("homepage", { data: {
      events,
      loggedIn: req.session.logged_in,
    }
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
      let formattedDate = `${month} ${eventDate.getDate()}, ${eventDate.getFullYear()} `;
      let formattedTime = `${eventDate.toLocaleTimeString()}`;
      console.log(req.session)
    res.render("event", { data : {
      events,
      formattedDate,
      formattedTime,
      loggedIn: req.session.logged_in,
      userId: req.session.user_id,
    }
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// GET user dashboard 
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password']},
      include: {model: Events}
    })

    const user = userData.get({ plain: true })

    res.render('dashboard', { data: {
      user,
      logged_in: true
    }
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

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

