import express from'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from'cors';
import userouter from'./routes/user.routes.js';
dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.URL).then(()=>
    console.log("mongodb connected")

).catch((err)=>
console.log(err));
app.use('/user',userouter);
app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(process.env.PORT,()=>{
    console.log(`server started at port ${process.env.PORT}`);
})