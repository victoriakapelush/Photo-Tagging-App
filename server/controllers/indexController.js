const Image = require('../models/Image');
const Character = require('../models/Character');

const getImage = (req, res) => {
  Promise.all([Image.find(), Character.find()])
    .then(([images, characters]) => res.json({ images, characters }))
    .catch(err => res.status(404).json({ error: 'No images or characters found' }));
};

module.exports = { getImage };