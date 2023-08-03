const mongoose=require('mongoose')

const connectDatabase=()=>{
    const uri=process.env.ATLAS_URI;
    mongoose.connect(uri);
    const connection=mongoose.connection;
    connection.once("open",()=>{
        console.log("Mongoose Connection Successful")
    })
}

module.exports=connectDatabase