console.log("This script populates images and characters to the database.");
const Image = require("./models/Image");
const Character = require("./models/Character");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoDB =
  "mongodb+srv://victoriakapelush:sakuraSun123@cluster0.qpt6ako.mongodb.net/Waldo?retryWrites=true&w=majority";
main().catch((err) => console.log(err));

// Connect to MongoDB
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createImagesAndCharacters();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function imageCreate(imageData) {
  const image = new Image({ image: imageData });
  await image.save();
  console.log("Image added");
}

async function characterCreate(characterData) {
  const { name, image, coordinates } = characterData;
  const character = new Character({ name, image, coordinates });
  await character.save();
  console.log(`${name} saved`);
}

// Function to add both images and their corresponding characters
async function createImagesAndCharacters() {
  console.log("Adding images and characters");
  const imagePathPrefix = "./images/";

  // First image and characters
  await createImageAndCharacters(`${imagePathPrefix}waldo.jpg`, [
    {
      name: "Waldo",
      image: `${imagePathPrefix}waldo-icon.png`,
      coordinates: [
        [1599, 6980],
        [1670, 7065],
      ],
    },
    {
      name: "Wilson",
      image: `${imagePathPrefix}wilson.png`,
      coordinates: [
        [1654, 8307],
        [1694, 8371],
      ],
    },
    {
      name: "Brian",
      image: `${imagePathPrefix}brian.png`,
      coordinates: [
        [265, 6014],
        [307, 6058],
      ],
    },
  ]);

  // Second image and characters
  await createImageAndCharacters(`${imagePathPrefix}waldo-2.jpg`, [
    {
      name: "Balloon",
      image: `${imagePathPrefix}it-icon.png`,
      coordinates: [
        [762, 3312],
        [809, 3451],
      ],
    },
    {
      name: "Pug",
      image: `${imagePathPrefix}pug-icon.png`,
      coordinates: [
        [689, 3465],
        [734, 3524],
      ],
    },
    {
      name: "Ghostface",
      image: `${imagePathPrefix}scream-icon.png`,
      coordinates: [
        [1803, 2049],
        [1900, 2298],
      ],
    },
  ]);
}

// Helper function to create an image and its corresponding characters
async function createImageAndCharacters(imagePath, characterDataArray) {
  console.log(`Adding image: ${imagePath}`);
  await imageCreate(imagePath);

  console.log("Adding characters for the image");
  await Promise.all(
    characterDataArray.map((characterData) => characterCreate(characterData)),
  );
}
