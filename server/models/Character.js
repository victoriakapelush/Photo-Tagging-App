const mongoose = require("mongoose");
const { Schema } = mongoose;

const CharacterSchema = new Schema({
  name: { type: String },
  image: { type: String },
  coordinates: [[Number]],
});

module.exports = mongoose.model("Character", CharacterSchema);
