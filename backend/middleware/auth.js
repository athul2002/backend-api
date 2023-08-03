const jwt=require('jsonwebtoken')
const User=require('../Models/userModel')
const ErrorHandler = require('../utils/errorHandler.js');

exports.isAuthenticatedUser=async(req,res,next)=>{
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        const token = req.headers.authorization.split(" ")[1];
        if(!token)
        {
            return next(new ErrorHandler("Please Provide Token to access this resource",401));
        }
    
        const decodedData=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decodedData.id);

        if(!req.user)
        {
            res.status(400).json({
                message:"Please provide token to Authorize"
            })
        }
        next()
    }
    else
    {
        res.status(400).json({
            success:false,
            message:"Please provide valid token to Authorize"
        })
    }
}
exports.isAuthenticatedDean=async(req,res,next)=>{
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        const token = req.headers.authorization.split(" ")[1];
        if(!token)
        {
            return next(new ErrorHandler("Please Provide Token to access this resource",401));
        }
    
        const decodedData=jwt.verify(token,process.env.JWT_SECRET);
        req.dean=await User.findById(decodedData.id);
        // console.log(req.dean)
        next()
    } 
    else
    {
        res.status(400).json({
            success:false,
            message:"Provide Authourize Token to proceed further"
        })
    }
}

exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(req.user)
 {       if(!roles.includes(req.user.role))
        {
           return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`,403))
        };
        next()}
        else{
            res.status(400).json({
                success:false,
                message:"You are not allowed to access this resource"
            })
        };
    };
};
exports.authorizeRolesDean=(...roles)=>{
    return (req,res,next)=>{
        if(req.dean)
{        if(!roles.includes(req.dean.role))
        {
           return next(new ErrorHandler(`Role:${req.dean.role} is not allowed to access this resource`,403))
        };
        next();
    }else
    {
        res.status(400).json({
            success:false,
            message:"You are not allowed to access this resource"
        })
    };}
};