const router = require('express').Router();
const { Photo, Events } = require('../../models');

// GET all photos
router.get('/', async (req, res) => {
  try {
    const photoData = await Photo.findAll({
      include: [{ model: Events }]
    });
    res.status(200).json(photoData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new photo
router.post('/', async (req, res) => {
    try {
      const photoData = await Photo.create(req.body)
      res.status(200).json(photoData);
    } catch (err) {
      res.status(400).json(err);
    }
});

// DELETE photo by ID
router.delete('/:id', async (req, res) => {
    try {
      const photoData = await Photo.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!photoData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
  
      res.status(200).json(photoData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;