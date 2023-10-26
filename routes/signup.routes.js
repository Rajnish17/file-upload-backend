const express =require("express");
const router = express.Router();
const {Signup} =require("../controllers/signu.controller");




router.post("/signup",Signup);





module.exports =router;




