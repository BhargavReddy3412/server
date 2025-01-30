const router=require('express').Router()
const User=require("../models/user.js")
const jwt=require('jsonwebtoken')
const Book=require('../models/book.js')
const {authenticateToken}=require('./userAuth.js')



//add book -- admin

router.post("/add-book",authenticateToken,async (req,res)=>{
    try{
const {id}=req.headers
   const user= await User.findById(id)
       if(user.role!=="admin"){
        res.status(400).json({message:"Not Having Access to perform Admin Work"})
       }

       const book=new Book({
        url:req.body.url,
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        desc:req.body.desc,
        language:req.body.language
       })
  
       await book.save()
       return res.status(200).json({message:"Book added successfully"})
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
})

// update book
router.put("/update-book",authenticateToken,async (req,res)=>{
    try{
const {bookid}=req.headers
   await Book.findByIdAndUpdate(bookid,{
    url:req.body.url,
    title:req.body.title,
    author:req.body.author,
    price:req.body.price,
    desc:req.body.desc,
    language:req.body.language
   })
   return res.status(200).json({message:"Book Updated Successfully"})
       
    }
    catch(err){
        res.status(500).json({
            message:"An Error Occured"
        })
    }
})


// delete book

router.delete("/delete-book",authenticateToken,async (req,res)=>{
    try{
const {bookid}=req.headers
   await Book.findByIdAndDelete(bookid)
   return res.status(200).json({message:"Book deleted Successfully"})
       
    }
    catch(err){
        res.status(500).json({
            message:"An Error Occured"
        })
    }
})

// getting all books
router.get("/get-all-books",async (req,res)=>{
    try{
   const books=await Book.find().sort({createdAt:-1}) // the created at is timestarp in mongo books database check
       return res.json({
        status:"success",
        data: books
       })
    }
    catch(err){
        res.status(500).json({
            message:"An Error Occured"
        })
    }
})


// getting recent books limit 4
router.get("/get-recent-books",async (req,res)=>{
    try{
   const books=await Book.find().sort({createdAt:-1}).limit(4) // the created at is timestarp in mongo books database check
       return res.json({
        status:"success",
        data: books
       })
    }
    catch(err){
        res.status(500).json({
            message:"An Error Occured"
        })
    }
})


// getting book by id 
router.get("/get-book-by-id/:id",async (req,res)=>{
    try{
    const {id}=req.params;
    const book=await Book.findById(id)
       return res.json({
        status:"success",
        data: book
       })
    }
    catch(err){
        res.status(500).json({
            message:"An Error Occured"
        })
    }
})


module.exports=router