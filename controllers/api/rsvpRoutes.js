const router = require('express').Router();
const { Events, Rsvp, User } = require('../../models');

// GET all RSVPs
router.get('/', async (req, res) => {
    try {
      const rsvpData = await Rsvp.findAll({
        include: [Events, {model: User, attributes: {exclude: 'password'}}]
      });
      res.status(200).json(rsvpData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// CREATE new RSVP
router.post('/', async (req, res) => {
    try {
      const existingRsvp = await Rsvp.findOne({
        where: req.body
      });
      if (!existingRsvp){
        const rsvpData = await Rsvp.create(req.body)
      res.status(200).json(rsvpData);
      }
      else{
       console.log('Duplicate rsvp refused')
      }
      
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