const router = require('express').Router();
const { Guests , User, Events } = require('../../models');

// GET all Guests
router.get('/', async (req, res) => {
    try {
      const guestData = await Guests.findAll({
        
        include:[ {model: User, attributes: {exclude: 'password'}}, Events ],
      });
      res.status(200).json(guestData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// CREATE new Guest
router.post('/', async (req, res) => {
    try {
      const guestData = await Guests.create(req.body)
      res.status(200).json(guestData);
    } catch (err) {
      res.status(400).json(err);
    }
});

// UPDATE a Guest using its ID
router.put('/:id', async (req, res) => {
    try {
    const guestData = await Guests.update(req.body, {
        where: {
          id: req.params.id,
        },
      })
  
      if (!guestData) {
        res.status(404).json({ message: 'No guest found with that ID!' })
        return
      }
      res.status(200).json(guestData)
    } catch (err) {
      res.status(500).json(err)
    }
  
});

// DELETE a Guest by its ID
router.delete('/:id', async (req, res) => {
    try {
      const guestData = await Guests.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!guestData) {
        res.status(404).json({ message: 'No guest found with that id!' });
        return;
      }
  
      res.status(200).json(guestData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;