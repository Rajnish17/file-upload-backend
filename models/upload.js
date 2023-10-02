// imageModel.js

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String, // URL of the image on Cloudinary
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
