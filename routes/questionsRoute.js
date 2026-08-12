const express = require("express");
const router = express.Router();
const questions = require("../models/questions");
const Questions = require("../models/questions");
const auth = require("../middleware/auth")
router.get("/",auth,async(req , res)=>{
    try{
        const {search} = req.query;
        let queryobj = {user:req.user.id}  ;

        if(search && search.trim() !== ""){
            const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            queryobj = {
                user : req.user.id ,
                $or : [
                    {subject : {$regex: safeSearch , $options: "i"}},
                    { content : {$regex: safeSearch , $options: "i"}}
                ]
            }
        }
        const questions = await Questions.find(queryobj).sort({createdAt : -1});
        res.status(200).json(questions);
    }catch(e){
        res.status(400).json({message : "Error getting Questions :( "});
    }
})
router.post("/",auth,async(req,res)=>{
    try{

    const {subject , content} = req.body ;
    const newQuestion = new Questions({subject , content , user: req.user.id});
    const savedQuestion = newQuestion.save();
    res.status(200).json(savedQuestion);

    }catch(e){
        res.status(400).json({message : "Error Setting Questions :( "});
    }
})
router.delete("/",async(req,res)=>{
    try{
        await Questions.deleteMany({});
        res.status(200).json({message : "Deleted Successfully"})
    }catch(e){
        res.status(400).json({message : "error deleting all"})
    }
})
router.delete("/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        await Questions.findByIdAndDelete(id);
        res.status(200).json({message : "Deleted Question Successfully"})
    }catch(e){
        res.status(400).json({message : "error deleting Question"})
    }
})

module.exports = router ;