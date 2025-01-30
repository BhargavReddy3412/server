const mongoose=require('mongoose')


const order=new mongoose.Schema({
    user:{
          type:mongoose.Types.ObjectId,
          ref:"user",
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"books",
  },
  status:{
    type:String,
    ref:"Order placed",
    enum:["Order Palced","Out for delivery","Delivered","Canceled"]
}
},{timestamps:true})

module.exports=mongoose.model("order",order)
