import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model.js";
export const verifyToken = async(req, res, next) => {
const token=req.headers.Authorization.split(" ")[1];
if(!token)
{
    return res.status(401).json({message:"No token provided"});
}
const verified=jwt.verify(token, process.env.JWT_SECRET_KEY);
if(!verified)
{
    return res.status(403).json({message:"Invalid token"});
}
const user=await User.findById(verified.id);
if(!user)
{
    return res.status(404).json({message:"User not found"});        

}
req.user=user;
next();
}