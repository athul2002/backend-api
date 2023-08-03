const express=require('express')
const app=express();
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

const user=require('./routes/userRoutes');
app.use('/api/v2',user);
module.exports=app