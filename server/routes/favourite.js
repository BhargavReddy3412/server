const router=require('express').Router()
const User=require("../models/user.js")
const {authenticateToken}=require('./userAuth.js')


// add book to favourite

router.put("/add-book-to-favourite",authenticateToken,async (req,res)=>{
    try{
      const {bookid,id}=req.headers
      const userData=await User.findById(id)
      const isBookFavourite=userData.favourites.includes(bookid)
      if(isBookFavourite){
        return res.status(200).json({message:"Book is Already in favourites"})
      }
      await User.findByIdAndUpdate(id,{$push:{favourites:bookid}})
      return res.status(200).json({message:"Book is Added to favourites"})

    }
    catch(err){
        res.status(500).json({
            message:"An Error Occured"
        })
    }
})


// delete book from favourite

router.put("/delete-book-from-favourite",authenticateToken,async (req,res)=>{
    try{
      const {bookid,id}=req.headers
      const userData=await User.findById(id)
      const isBookFavourite=userData.favourites.includes(bookid)
      if(isBookFavourite){
        await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}})
      }
    
      return res.status(200).json({message:"Book is Removed from favourites"})

    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
})


// getting favourite books from particular user
router.get("/get-favourite-books",authenticateToken,async (req,res)=>{
    try{
      const {id}=req.headers
      const userData=await User.findById(id).populate("favourites")   // with the help whole obj is come ,without this populate onli obj id will com
      const favouriteBooks=userData.favourites
      return res.status(200).json({
        status:"Success",
        data:favouriteBooks
      })

    }
    catch(err){
        res.status(500).json({
            message:"An error occured"
        })
    }
})

module.exports =router