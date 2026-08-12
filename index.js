const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const noteRouter = require("./routes/noteRoute")
const questionRouter = require("./routes/questionsRoute")
const Login = require("./routes/loginRoute");
const SignUp =require("./routes/signUp");
const profile = require("./routes/profile");
const materialRoute = require("./routes/materialRoute");
const path = require("path");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/notes',noteRouter)
app.use('/api/questions',questionRouter)
app.use("/api/signup",SignUp)
app.use("/api/login",Login)
app.use("/api/profile",profile)
app.use("/api/materials",materialRoute)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/",(req,res)=>{
    res.send("Running successfully")
})
mongoose.connect(process.env.MONGOURL)
.then(console.log("connected to mongo"))
.catch((err)=>{
    console.log(err);
})
app.listen(process.env.PORT,()=>{
    console.log("connected on port")
})


