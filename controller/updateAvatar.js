const User = require("../models/User");

exports.update = async(req , res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message : "No Photo Provided "});
        }
        const imagePath = req.file.path.replace(/\\/g, "/");
        const fullImageUrl = `${req.protocol}://${req.get("host")}/${imagePath}`;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {profileImage : fullImageUrl},
            {new : true}
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            message : "Updated Successfully",
            user : updatedUser
        });

    }catch(err){
        console.log(err);
        res.status(500).json({message : "Server Error "})
    }
}