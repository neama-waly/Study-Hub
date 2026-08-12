const material = require("../models/material");
exports.updateProgress = async(req , res )=>{
    const {id} = req.params;
    const {progress} = req.body;
    const validated = Math.min(100,Math.max(0,progress));
    try{
        const updateMaterial = await material.findByIdAndUpdate(id,
            {progress : validated},{ returnDocument: 'after' }
        )
        
        if(!updateMaterial) return res.status(404).json({message : "Material Not Found"});
        res.status(200).json({message : "Progress Updated ", material : updateMaterial})

    }catch(err){
        console.log("Failed to update progress ",err)
        res.status(500).json({ message: "Server error", error: err.message });
    }
}