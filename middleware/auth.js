const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req , res ,next )=>{
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(400).json({message : "No Token Preovided "});
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }catch(e){
        res.status(400).json({message : "invalid token " ,e});
    }

}
module.exports = auth ;