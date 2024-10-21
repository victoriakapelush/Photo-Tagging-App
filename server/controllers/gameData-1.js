const Image = require("../models/Image");
const Character = require("../models/Character");

const getGameData = async (req, res) => {
  try {
    // Fetch the second image from the database
    const images = await Image.find(); // Get all images
    if (images.length < 2) {
      return res
        .status(404)
        .json({ message: "Not enough images in the database" });
    }
    const secondImage = images[0]; // Get the second image

    // Fetch the last three characters from the database
    const characters = await Character.find().sort({ _id: 1 }).limit(3); // Get the first three characters

    res.json({
      image: secondImage,
      characters: characters.reverse(), // Reverse to maintain original order
    });
  } catch (error) {
    console.error("Error fetching game data:", error);
    res.status(500).json({ message: "Failed to fetch game data" });
  }
};

module.exports = { getGameData };
