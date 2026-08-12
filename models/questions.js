const mongoose = require("mongoose");
const questionsSchema = new mongoose.Schema({
    subject :{
        type : String,
        required : [true,"Please Enter The Subject "]
    },
    content : {
        type : String,
        required : [true,"Please write your Question "]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true 
    },
    createdAt : {
        type :Date ,
        default : Date.now
    }
})
module.exports = mongoose.model("questions",questionsSchema);