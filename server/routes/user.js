const router=require('express').Router()
const User=require("../models/user.js")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {authenticateToken}=require('./userAuth.js')

// sign up

router.post("/sign-up",async(req,res)=>{

    try{
       const {username,email,password,address}=req.body

       // checking username length is more than 4
       if(username.length<4){
       
       return res.status(400).json({message:"username length be more than 4"})

       }
    
       // checking usernme already exist or not

       const existingUsername=await User.findOne({username:username})
         if(existingUsername){
            return res.status(400).json({message:"username already exists"})

         }
         // checking email already exist or not

         const existingEmail=await User.findOne({email:email})
         if(existingEmail){
            return res.status(400).json({message:"Email already exists"})

         }  

         // checking password length

         if(password.length<=5){
            return res.status(400).json({message:"Password length be greater than 5 "})

         }

     const hassedPassword= await bcrypt.hash(password,10)



  const newUser=new User({
    username:username,
    email:email,
    password:hassedPassword,
    address:address,
  })
       await newUser.save()
      return res.status(200).json({message:"Signup successfully"})
    }
    catch(err){
        res.status(404).json({message:"Internal Server Error ujik"})
    }

})

// router.post("/sign-up", async (req, res) => {
//     try {
//       const { username, email, password, address, role } = req.body;
  
//       // checking username length is more than 4
//       if (username.length < 4) {
//         return res.status(400).json({ message: "Username length must be more than 4" });
//       }
  
//       // checking if username already exists
//       const existingUsername = await User.findOne({ username });
//       if (existingUsername) {
//         return res.status(400).json({ message: "Username already exists" });
//       }
  
//       // checking if email already exists
//       const existingEmail = await User.findOne({ email });
//       if (existingEmail) {
//         return res.status(400).json({ message: "Email already exists" });
//       }
  
//       // checking password length
//       if (password.length <= 5) {
//         return res.status(400).json({ message: "Password length must be greater than 5" });
//       }
  
//       // Validate role (only 'user' or 'admin' allowed)
//       const validRoles = ["user", "admin"];
//       if (!validRoles.includes(role)) {
//         return res.status(400).json({ message: "Invalid role selected" });
//       }
  
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       const newUser = new User({
//         username,
//         email,
//         password: hashedPassword,
//         address,
//         role, // Save role selected by user
//       });
  
//       await newUser.save();
//       return res.status(200).json({ message: "Signup successful" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
  





// sign  in

router.post("/sign-in",async(req,res)=>{

   try{
const {username,password}=req.body
     const existingUser= await User.findOne({username})
   
     if(!existingUser){
        res.status(400).json({message:"Invalid Credentials"})
     }
        await bcrypt.compare(password,existingUser.password,(err,data)=>{

            if(data){
                const authClaims=[{name:existingUser.username},{role:existingUser.role}]
            const token=jwt.sign({authClaims},"bookStore123",{expiresIn:"1d"})

        res.status(200).json({id:existingUser._id,role:existingUser.role,token:token})

            }
            else{
        res.status(400).json({message:"Invalid Credentials"})

            }
        })
   }
    catch(err){
        res.status(404).json({message:"Internal Server Error"})
    }

})

// get user information
router.get("/get-user-information",authenticateToken, async(req,res)=>{
    try{
       const {id}=req.headers
       const data=await User.findById(id).select('-password')
       return res.status(200).json(data)
    }
    catch(err){
        res.status(404).json({message:"Internal Server Error"})

    }
})

// update address
router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers
        const {address}=req.body
        await User.findByIdAndUpdate(id,{address:address})
        return res.status(200).json({message:"Address updated successfully"})
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
})



module.exports=router

