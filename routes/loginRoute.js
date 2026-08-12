const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/",async(req,res)=>{
    try{
        const {userName , password} = req.body;
        if(!userName || !password) {
            return res.status(400).json({message : "Please Provide User_Name & Password"})
        }
        const user = await User.findOne({userName});
        if(!user){
            return res.status(400).json({message : "User Not Found"})
        }
        // comparing bycripted pass !!!!!!!
        const isMatch = await bycript.compare(password , user.password);
        if(!isMatch) return res.status(400).json({message : "Wrong Password Try Again"});

        const token = jwt.sign({
            id:user._id,
            userName : user.userName ,
        },process.env.SECRET_KEY,{expiresIn: "1d" })

        res.status(200).json({message : "Logged in successfully ",token })

    }catch(e){
        res.status(400).json({message : "SomeThing WRONG "})
    }
})
module.exports = router;