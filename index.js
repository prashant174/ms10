const express=require("express")
const {connection}=require("./config/db")
const {UserModel}=require("./models/user.model")
const {authenticate}=require("./authenticatio/authenticate")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const app=express()
require("dotenv").config()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("mock 10 server running")
})

app.post("/api/register",async(req,res)=>{
    const {name,email,password,dob,bio}=req.body
    const userAlreadyPresent=await UserModel.findOne({email})
    if(userAlreadyPresent){
        res.status(200).send({"msg":"user already present"})
    }
    else{
        try{
            bcrypt.hash(password,10,async function(err,hash){
                const user=new UserModel({name,email,password:hash,dob:dob,bio:bio})
                await user.save()
                res.status(201).send({"msg":"user register successfull"})
            })


        }catch(err){
            res.status(501).send({"msg":"something went wrong"})
        }
    }
   

})


app.post("/api/login",async(req,res)=>{
    const {email,password}=req.body
    try{
       const user=await UserModel.find({email})
       if(user.length>0){
        const hashedPassword=user[0].password
        bcrypt.compare(password,hashedPassword, function(err,result){
            if(result){
                const token=jwt.sign({"userId":user[0]._id},"mockserver10")
                res.status(201).send({"msg":"login successfull", "token":token})
            }else{
               res.status(200).send({"msg":"login failed"})
            }
        })

       }else{
        res.status(200).send({"msg":"Login failed"})
       }

    }catch(err){
        res.status(501).send({"msg":"something went wrong"})
    }
})


const port=process.env.PORT||5000
app.listen(port,async()=>{
    try{

        await connection
        console.log("connected to mongodb..")
    }catch(err){
        console.log(err)
    }
    console.log(`server running on port ${port}`)
})