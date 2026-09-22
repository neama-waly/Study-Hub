const material = require("../models/material");

exports.createMaterial = async(req , res)=>{
    try{
        const {title , subject ,fileType } = req.body ;
        if(!title || !subject  ){
            return res.status(400).json({message : "Please Fill all Requires"});
        }
        if(!req.file){
            return res.status(400).json({message : "Please upload a file"})
        }
        const fileUrl = `https://study-hub-brown-mu.vercel.app/uploads/${req.file.filename}`;
        const newMaterial = new material({
            title,
            subject,
            fileUrl,
            fileType,
            uploadedBy : req.user.id || req.user._id 
        });
        await newMaterial.save();
        res.status(201).json({ message: "Material uploaded successfully", material: newMaterial });

    }catch(error){
        res.status(500).json({message : "Error ",error : error.message })
    }
}