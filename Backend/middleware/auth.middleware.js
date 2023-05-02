const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token=req.headers.authorization

    if(token){
        try {
            const decoded=jwt.verify(token.split(" ")[1],'masai');
            if(decoded){
                req.body.postID=decoded.postID
                next()
            }else{
                res.send({"msg":"Please Login"})
            }
        } catch (error) {
            res.send({"err":err.message})
        }
    }else{
        res.send({"msg":"Please Login"})
    }
}

module.exports={
    auth
}