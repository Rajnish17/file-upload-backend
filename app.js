const express = require("express");
const app = express();
const cors =require("cors");
const imageUploadRoute = require("./routes/upload.routes");
app.use(express.json());
app.use(cors());



app.use('/images', imageUploadRoute);



app.get("/", (req, res) => {
    res.send("hello")
});






module.exports = app;