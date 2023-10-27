const express = require("express");
const app = express();
const cors =require("cors");
const imageUploadRoute = require("./routes/upload.routes");
const authroutes =require("./routes/auth.routes");
app.use(express.json());
app.use(cors());



app.use('/images', imageUploadRoute);
app.use(authroutes);



app.get("/", (req, res) => {
    res.send("hello")
});






module.exports = app;