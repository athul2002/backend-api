const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:[true,"Please Enter Your ID Number"],
        maxLength:[8,"ID should not be greater than 7 characters"],
        minLength:[8,"ID should not be less than 7 characters"],
    },
    userName:{
        type:String,
        required:[true,"Please Enter Your ID Number"],
    }, 
    password:{
        type:String,
        required:[true,"Please Enter Password"],
        minLength:[8,"Password Should contain minimum 8 characters"],
        select:false
    },
    role:{
        type:String,
        default:"user",
    },
    Sessions: [{Id:{type:String},startTime:{type:Date},endTime:{type:Date},Name:{type:String}}], 
}, 
 
{
    timestamps: true,
  }
);
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }

    this.password=await bcrypt.hash(this.password,10);
});
userSchema.methods.getJWTToken=function(){
    return jwt.sign(
        {id:this._id},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRE,
    });
};

module.exports=mongoose.model("User",userSchema)