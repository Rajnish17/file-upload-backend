// imageUploadRoute.js
require("dotenv").config();
const image =require("../models/upload")
const express = require('express');
const multer = require('multer');

// Configure Multer for image uploads
const upload = multer({ dest: 'uploads/' });


// cloudinary details
const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name:process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret:process.env.api_secret 
});



// Image upload route
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Create a new image document in MongoDB
        const newImage = new Image({
            title: req.body.title,
            description: req.body.description,
            imageUrl: result.secure_url,
        });

        // Save the image document
        await newImage.save();

        // Respond with a success message
        res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error uploading image' });
    }
});

module.exports = router;
