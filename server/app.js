const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')
require("./connections/connection.js")
const user=require('./routes/user.js')
const Books=require("./routes/book.js")
const Favourite=require('./routes/favourite.js')
const Cart=require('./routes/cart.js')
const Order=require('./routes/order.js')

app.use(cors())
//routes
app.use(express.json())
app.use("/Api/v1",user);
app.use("/Api/v1",Books);
app.use("/Api/v1",Favourite);
app.use("/Api/v1",Cart);
app.use("/Api/v1",Order);




// creating server and Port
let Port=process.env.PORT
app.listen(Port,()=>{
    console.log('server is Successfully',Port)
})