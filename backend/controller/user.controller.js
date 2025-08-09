
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import  createtoken  from '../jwt/createtoken,js';
export const signup= async(req,res)=>{
    const{name,email,password}=req.body;
    try{
        const existinguser=await User.findOne({email});
        if(existinguser)
        {
            return res.status(400).json("user already existed");

        }
        else{
            const hashedpass=await bcrypt.hash(password,10);
            const user=new User({
                name:name,
                email:email,
                password:hashedpass
            })
            await user.save();
           const token= createtoken(user.id,res);
           console.log(token);
        res.status(200).json({
  message: "user created successfully",
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
  token
});

        }
    }
    catch(err){
        res.status(500).json(err.message);
        console.log(err);
    }

}
export const login=async(req,res)=>{
    try{
    const{email,password}=req.body;
  const user=await User.findOne({email});
  if (!user){
    return res.status(400).json("user not found");
  }
  const ismatch=await bcrypt.compare(password,user.password);
  if(!ismatch){
    return res.status(400).json("invalid credentials");
  }
   const token= createtoken(user.id,res);
   
res.status(200).json({
  message: "user created successfully",
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
  token
});

}
catch(error)
{
    res.status(500).json(error.message);
    console.log(error); 
}
}
export const auth=async(req,res)=>{
  try{
   
  const token = req.header('Authorization').split(" ")[1];
  console.log("token is", token);
  if(!token)
  {
    return res.status(401).json({message:"No token provided"});
  }
   const verifieded=jwt.verify(token, process.env.JWT_SECRET_KEY);
  if(!verifieded)
  {
    return res.status(401).json({message:"Invalid token"});
  }
  return res.status(200).json({
    message: "User authenticated successfully",
});
  }
catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Token expired");
      return res.status(401).json({ message: "Token expired" });
    }
    console.error("Error in auth:", error);
    return res.status(500).json({ message: error.message });
  }}