const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
    image: { type: String }
});

module.exports = mongoose.model("Image", ImageSchema);

