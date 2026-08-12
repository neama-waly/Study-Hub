const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : [true ,"Please enter your user_name"],
        unique : true,
        trim : true
    },
    password : {
        type :String ,
        required : [true , "Please Enter Your Password"]
    },
    profileImage : {
        type : String,
        default : "default-avatar.png"
    },
},{timestamps : true })
module.exports = mongoose.model("User",userSchema);