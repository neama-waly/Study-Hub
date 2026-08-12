const mongoose = require("mongoose");
const materialSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , "Please Write the Title"]
    },
    subject : {
        type : String,
        required : true ,
    },
    fileUrl : {
        type : String,
        required : true,
    },
    fileType : {
        type : String,
        enum : ["PDF" , "Summary" ,"Quiz","Lecture","Other"],
        default : "PDF",
    },
    progress : {
        type : Number,
        default : 0 ,
        min : 0,
        max : 100
    },
    uploadedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},{timestamps : true });
module.exports = mongoose.model("Material",materialSchema);
