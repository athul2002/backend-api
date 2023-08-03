const sendToken=(user,statusCode,res)=>{
    const token=user.getJWTToken();
    res.status(statusCode).setHeader('Authorization','Bearer'+token).json({
        success:true,
        message:`Login Successful.Please Save The Token below for further Verifications`,
        token,
    })
};

module.exports=sendToken;