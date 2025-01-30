const jwt=require('jsonwebtoken')

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1]   // bearear token is form 

if(token == null){
    return res.status(404).json({message:"Authendication token is required"})
}
jwt.verify(token,"bookStore123",(err,user)=>{
    if(err){
        return res.status(403).json({message:"Token Expired. Please sign in again"})
    }
    req.user=user
    next()
})
}

module.exports={authenticateToken}