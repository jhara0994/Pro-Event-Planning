// create a new HTML controller and retrieve the data and pass that data to handlebars

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