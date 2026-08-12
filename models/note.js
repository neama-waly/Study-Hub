const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , "Please enter note`s name "],
        trim : true
    },
    content : {
        type :String,
        required : [true , "Please write the note"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true 
    },
    createdAt : {
        type :Date ,
        default :Date.now 
    }

})
module.exports = mongoose.model("Note",noteSchema);