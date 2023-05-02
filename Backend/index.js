const express=require("express");
const {connection}=require("./db")
const {userRouter}=require("./routes/userRoutes")
const {auth}=require("./middleware/auth.middleware");
const {postRouter}=require("./routes/postRoutes")
const cors=require("cors")
const app=express();
require('dotenv').config()
app.use(cors())
app.use(express.json());
app.use("/users",userRouter)

app.use(auth)
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running on ${process.env.port}")
})