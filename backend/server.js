const app=require("./app")
const dotenv=require('dotenv')
dotenv.config({path:"backend/config/config.env"})
const connectDatabase=require('./config/Database.js')


connectDatabase();

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server Started in port ${process.env.PORT}`)
})