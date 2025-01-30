const router=require('express').Router()
const User=require("../models/user.js")
const {authenticateToken}=require('./userAuth.js')



//put book to cart
router.put("/add-to-cart",authenticateToken,async (req,res)=>{
    try{
      const {bookid,id}=req.headers
      const userData=await User.findById(id)
      const isBookinCart=userData.cart.includes(bookid)
      if(isBookinCart){
        return res.status(200).json({message:"Book is Already in Cart"})
      }
      await User.findByIdAndUpdate(id,{$push:{cart:bookid}})
      return res.status(200).json({message:"Book is Added to Cart"})

    }
    catch(err){
        res.status(500).json({
            message:" An Error Occured"
        })
    }
})

// remove book from cart

router.put("/remove-from-cart/:bookid",authenticateToken,async (req,res)=>{
    try{
        const {bookid}=req.params
      const {id}=req.headers
      await User.findByIdAndUpdate(id,{$pull:{cart:bookid}})
      return res.status(200).json({message:"Book removed from Cart"})

    }
    catch(err){
        res.status(500).json({
            message:" An Error Occured"
        })
    }
})



// getting cart  from particular user
router.get("/get-user-cart",authenticateToken,async (req,res)=>{
    try{
      const {id}=req.headers
      const userData=await User.findById(id).populate("cart")   // with the help whole obj is come ,without this populate onli obj id will com
      const cart=userData.cart.reverse()
      return res.status(200).json({
        status:"Success",
        data:cart
      })

    }
    catch(err){
        res.status(500).json({
            message:"An error occured"
        })
    }
})

module.exports =router
