const mongoose=require('mongoose')

const connection=async()=>{

    try{
           await mongoose.connect(`${process.env.MONGO_URI}`);
           console.log("Database is Connected")

    }
    catch(err){
        console.log(err)
    }

}
connection()