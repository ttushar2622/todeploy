const express=require("express");
const postRouter=express.Router();
const {PostModel}=require("../model/Posts.model")

postRouter.post("/create",async(req,res)=>{
    try {
        const post=new PostModel(req.body)
        await post.save();
        res.status(200).send({"msg":"New post added"})
    } catch (error) {
        res.status(400).send({"err":"Something went wrong"})
    }
})

postRouter.get("/",async(req,res)=>{
    try {
        const posts=await PostModel.find({postID:req.body.postID})
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({"err":"Something went wrong"})
    }
})

postRouter.patch("/update/:postID",async(req,res)=>{
    const {postID}=req.params;
    const post=await PostModel.findOne({_id:postID})
    try {
        if(req.body.postID!==post.postID){
            res.status(200).send({"msg":"Not authorised"})
        }else{
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.status(200).send({"msg":`Post with id:${postID} is updated`})
        }
    } catch (error) {
        res.status(400).send({"err":"Something went wrong"})
    }
})

postRouter.delete("/delete/:postID",async(req,res)=>{
    const {postID}=req.params;
    const post=await PostModel.findOne({_id:postID})
    try {
        if(req.body.postID!==post.postID){
            res.status(200).send({"msg":"Not authorised"})
        }else{
            await PostModel.findByIdAndDelete({_id:postID})
            res.status(200).send({"msg":`Post with id:${postID} is deleted`})
        }
    } catch (error) {
        res.status(400).send({"err":"Something went wrong"})
    }
})