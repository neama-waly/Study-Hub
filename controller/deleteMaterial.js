const material = require("../models/material");

exports.deleteMaterial = async(req , res)=>{
    try{
        const material1 = await material.findById(req.params.id);
        if (!material1) return res.status(404).json({ message: "Material not found" });
        const userId = req.user._id  || req.user.id
        if(material1.uploadedBy.toString() !== userId){
            return res.status(403).json({ message: "Unauthorized to delete this material" });
        }
        await material1.deleteOne();
        res.json({message : "Deleted Successfully"})
    }catch(error) {
    res.status(500).json({ message: "Server Error To delete : ", error: error.message });
  }
}