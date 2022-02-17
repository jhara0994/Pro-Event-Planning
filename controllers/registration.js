router.get("/", async (req, res) => {
    try {
      const regData = await Registration.findByPk(req.params.id, {
        include: {
          model: Registration,
          attributes: ["id"],
        },
      });
  
      const registration = regData.map((registration) => registration.get({ plain: true }));
      res.render("event", {
        events,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  });