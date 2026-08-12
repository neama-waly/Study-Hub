const upload = require("../middleware/upload");
const Material = require("../models/material");

exports.getAllMaterials = async (req , res)=>{
    try{
        const {search} = req.query;
        let queryobj = {uploadedBy : req.user.id } ;

        if(search && search.trim() !== ""){
            const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            queryobj.$or = [
                    {title : {$regex: safeSearch , $options: "i"}},
                    { subject : {$regex: safeSearch , $options: "i"}}
            ]
        }
        const materials = await Material.find(queryobj)
        .populate("uploadedBy","userName")
        .sort({createdAt : -1});

        res.json(materials);
    }catch(error){
        res.status(500).json({message : "Error ",error : error.message })
    }
}