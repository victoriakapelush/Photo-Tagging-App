console.log('This script populates image to the database.');
const userArgs = process.argv.slice(2);
const Image = require("./models/Image");
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
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
 }

async function imageCreate(imageData) {
    const image = new Image({ image: imageData });
    await image.save();
    console.log("Image added");
}
  
async function createImage() {
    console.log("Adding image");
    const imagePathPrefix = "./images/";
    await Promise.all([
      imageCreate(
        `${imagePathPrefix}waldo.jpg`
        )
    ]);
  }