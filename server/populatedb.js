console.log('This script populates image to the database.');
const userArgs = process.argv.slice(2);
const Image = require("./models/Image");
const Character = require("./models/Character");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];
main().catch((err) => console.log(err));

// Connect to mongoDB
async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createImage();
    await createCharacter();
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
  console.log(`${name} saved`)
}

// Add background image
async function createImage() {
    console.log("Adding image");
    const imagePathPrefix = "./images/";
    await Promise.all([
      imageCreate(
        `${imagePathPrefix}waldo.jpg`
        )
    ]);
  }

async function createCharacter() {
  console.log("Adding characters");
  const imagePathPrefix = "./images/";
  await Promise.all([
    characterCreate({
      name: "Waldo",
      image: `${imagePathPrefix}waldo-icon.jpg`,
      coordinates: [[1605, 6986], [1664, 7067]]
  }),
    characterCreate({
      name: "Wilson",
      image: `${imagePathPrefix}wilson.png`,
      coordinates: [[1656, 8294], [1708, 8368]]
  }),
  characterCreate({
      name: "Brian",
      image: `${imagePathPrefix}brian.png`,
      coordinates: [[1194, 2881], [1244, 2983]]
  })
  ])
}




