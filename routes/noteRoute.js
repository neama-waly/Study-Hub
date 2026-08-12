const express = require("express");
const router = express.Router();
const Note = require("../models/note");
const auth = require("../middleware/auth")

router.get("/",auth, async(req , res)=>{
    try{
        const {search} = req.query;
        let queryobj = {user:req.user.id} ;

        if(search && search.trim() !== ""){
            const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            queryobj = {
                user : req.user.id ,
                $or : [
                    {title : {$regex: safeSearch , $options: "i"}},
                    { content : {$regex: safeSearch , $options: "i"}}
                ]
            }
        }

        const notes = await Note.find(queryobj).sort({createdAt : -1});
        res.status(200).json(notes);

    }catch(error){
        res.status(500).json({message : "Error getting notes :( "})
    }
})
router.post("/",auth ,async (req , res)=>{
    try{
        const {title , content } =req.body;

        const newNote = new Note({title , content, user: req.user.id})
        const savedNote = await newNote.save();

        res.status(201).json(savedNote);
    }catch(error){
        res.status(500).json({message : "Error Saving Notes "})
    }
});
router.delete('/',async(req ,res)=>{
    try{
        await Note.deleteMany({});
        res.status(200).json({message : "deleted successfully"})
    }catch(error){
        res.status(500).json({message : "error "})
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        await Note.findByIdAndDelete(id);
        res.status(200).json({message : "deleted successfully"})

    }catch(error){
        res.status(500).json({message : "error "})
    }
})


module.exports = router ;