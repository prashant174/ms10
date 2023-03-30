const jwt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1]
    if(token){
        const decodePassword=jwt.verify(token,"mockserver10")
        if(decodePassword){
            const userId=decodePassword.userId
            req.body.userId=userId
            next()
        }else{
            res.status(200).send({"msg":"Please login first"})
        }
    }else{
        res.status(200).send({"msg":"Please login first"})
    }
}

module.exports={authenticate}