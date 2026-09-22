const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bycript = require("bcrypt");

router.post("/",async(req ,res)=>{
    console.log("RECEIVED BODY:", req.body);
    try{
        const {userName , password } =req.body;
        const existing = await User.findOne({userName});
        if(existing) return res.status(400).json({message : "User Already has account "}) ;
         
        const hashedPassword = await bycript.hash(password,10);
        const newUser = new User({userName ,password:hashedPassword});
        await newUser.save();
        res.status(200).json({message : "Signed Up successfully "})

    }catch(e){
        console.log(e)
        res.status(400).json({message : "Please provide correct name & password  "})
    }
})


module.exports = router;