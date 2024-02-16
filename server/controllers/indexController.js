const Image = require('../models/Image');

const getImage = (req, res) => {
  Image.find()
    .then(image => res.json(image))
    .catch(err => res.status(404).json({ noimagefound: 'No image found' }));
};

module.exports = { getImage };