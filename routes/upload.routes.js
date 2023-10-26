
require("dotenv").config();
const Image = require("../models/upload");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// Image upload route
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create a new image document in MongoDB
    const newImage = new Image({
      imageUrl: result.secure_url,
    });

    // Save the image document
    await newImage.save();
    
    //Delete image from uploads folder
    fs.unlinkSync(req.file.path);

    // Respond with a success message
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error uploading image" });
  }
});

router.get("/find", async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({
      data: images,
      message: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
