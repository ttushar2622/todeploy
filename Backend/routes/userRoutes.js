const express=require("express");
const {UserModel}=require("../model/User.model")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body;

    try {
        bcrypt.hash(password, 5,async(err, hash)=> {
            // Store hash in your password DB.
            const user=new UserModel({email,name,gender,password:hash})
            await user.save();
            res.status(200).send({"msg":"New user registered"})
        });
    } catch (error) {
        res.status(400).send({"err":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password,(err, result)=> {
                // result == false
                if(result){
                    const token=jwt.sign({postID:user._id},'masai')
                    res.status(200).send({"msg":"Login Successful","token":token})
                }else{
                    res.status(200).send({"msg":"Wrong Credentials"})
                }
            });
        }else{
            res.status(200).send({"msg":"Wrong Credentials"})
        }
    } catch (error) {
        res.status(400).send({"err":err.message})
    }
})

module.exports={
    userRouter
}