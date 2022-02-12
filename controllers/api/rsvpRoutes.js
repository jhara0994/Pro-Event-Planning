const router = require('express').Router();
const { Events, Rsvp } = require('../../models');

// GET all RSVPs
router.get('/', async (req, res) => {
    try {
      const rsvpData = await Rsvp.findAll({
        include: [{ model: Events}],
      });
      res.status(200).json(rsvpData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// CREATE new RSVP
router.post('/', async (req, res) => {
    try {
      const rsvpData = await Rsvp.create(req.body)
      res.status(200).json(rsvpData);
    } catch (err) {
      res.status(400).json(err);
    }
});

// UPDATE a RSVP using its ID
router.put('/:id', async (req, res) => {
    try {
    const rsvpData = await Rsvp.update(req.body, {
        where: {
          id: req.params.id,
        },
      })
  
      if (!rsvpData) {
        res.status(404).json({ message: 'No RSVP found with that ID!' })
        return
      }
      res.status(200).json(rsvpData)
    } catch (err) {
      res.status(500).json(err)
    }
  
});


// DELETE an RSVP by its ID
router.delete('/:id', async (req, res) => {
    try {
      const rsvpData = await Rsvp.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!rsvpData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
  
      res.status(200).json(rsvpData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;