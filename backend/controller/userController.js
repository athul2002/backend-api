const User=require('../Models/userModel')
const Session=require('../Models/freeSessions')
const ErrorHandler = require('../utils/errorHandler.js');
const asyncError=require('../middleware/asyncError');
const sendToken=require('../utils/jwtToken.js');
const app = require('../app');

exports.registerUser=asyncError(async(req,res,next)=>{
    const {userId,userName,password}=req.body;

    if(!userId||!userName||!password)
    {
        return next(
            new ErrorHandler(
              "Please Enter Credentials",
              400
            )
          );
    }
    const user=await User.create({
        userId,password,userName
    })

    sendToken(user,201,res);
})
exports.availableSessions=asyncError(async(req,res)=>{
    const sessions=await Session.find({
      startTime:{$gte:Date.now()},
      status:"free"
    });
    if(!sessions || sessions.length===0)
    {
      res.status(400).json({
        message:`No sessions found with the given details`
      })
    }
    else
{ 
  let len=sessions.length;
  let msg=[]
  for(let i=0;i<len;i++)
  {
    var localStartTime = new Date(sessions[i].startTime.getTime() - sessions[i].startTime.getTimezoneOffset()*60*1000);
    var localEndTime = new Date(sessions[i].endTime.getTime() - sessions[i].endTime.getTimezoneOffset()*60*1000);
    var date1=localStartTime.toISOString();
    var date2=localEndTime.toISOString();
    var frmTime=(date1.split('T')[1]).split('.')[0]
    var toTime=(date2.split('T')[1]).split('.')[0]
    var date=(date2.split('T')[0])
    var y=(date.split('-'))[0]
    var m=(date.split('-'))[1]
    var d=(date.split('-'))[2]
    msg[i]={"Dean Id":sessions[i].deanId,"Dean Name":sessions[i].deanName,"Date":`${d}-${m}-${y}`,"Time":`${frmTime}-${toTime}`}
  }   
  res.status(200).json({success:true,
        message:msg,
      });}
})
exports.bookSession=asyncError(async(req,res,next)=>{

    if(!req.body.deanId||!req.body.startTime||!req.body.endTime)
    {

      res.status(200).json({
        message:`Please enter all session details`
      })
    }
    
    const sessions=await Session.findOne({
        deanId:req.body.deanId,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        status:"free"
    });

    if(!sessions)
    {

      res.status(400).json({
        message:"Invalid Details"
      })

    }
    else
{    
      const {deanId,startTime,endTime}=req.body;
      const {userId,userName}=req.user;
      const deanName=sessions.deanName;
    await Session.findOneAndUpdate({deanId:deanId,startTime:startTime},{userId:userId,userName:userName,status:"booked"}),
    res.status(200).json({success:true,
        message:"Your booking is successful",
      });}  
})
exports.createSession=asyncError(async(req,res,next)=>{

    const {deanId,deanName,endTime,startTime}=req.body;
    if(!deanId||!deanName||!startTime||!endTime)
    {
      res.status(200).json({
        message:`Please enter all session details`
      })
    }
    const deans=await User.find({
      userId:req.body.deanId
    })

    if(!deans || deans.length===0)
    {
      res.status(400).json({
        success:false,
        message:"Dean ID invalid"
      })
    }
    else
    {  
       const sessions=await Session.create({
        deanId,deanName,endTime,startTime
    });
    res.status(200).json({success:true,
        message:"Session Created",
      });
    }
})


exports.mySessions=asyncError(async(req,res)=>{

    if(req.user)
    {
      const sessions=await Session.find({
        userId:req.user.userId,
        startTime:{$gte:Date.now()}
      })
      if(!sessions)
      {
        res.status(200).json({
          message:"You dont have any active appointments"
        })
      }
      else{
        let appoint=[];
        for(let i=0;i<sessions.length;i++)
        {
          var localStartTime = new Date(sessions[i].startTime.getTime() - sessions[i].startTime.getTimezoneOffset()*60*1000);
          var localEndTime = new Date(sessions[i].endTime.getTime() - sessions[i].endTime.getTimezoneOffset()*60*1000);
          var date1=localStartTime.toISOString();
          var date2=localEndTime.toISOString();
          var frmTime=(date1.split('T')[1]).split('.')[0]
          var toTime=(date2.split('T')[1]).split('.')[0]
          var date=(date2.split('T')[0])
          var y=(date.split('-'))[0]
          var m=(date.split('-'))[1]
          var d=(date.split('-'))[2]
          let msg={"Dean Id":sessions[i].deanId,"Dean Name":sessions[i].deanName,"Date":`${d}-${m}-${y}`,"Time":`${frmTime}-${toTime}`}
          appoint.push(msg)
        }
        if(appoint.length==0)
        {   
        res.status(400).json({
          success:false,
          message:"You dont have any active appointments"
        })
        }
        else
{        res.status(200).json({
          appoint
        })}
      }
    }
    else if(req.dean)
    {
      // console.log(user)
      const sessions=await Session.find({
        startTime:{$gte:Date.now()},
        deanId:req.dean.userId
      })
      if(!sessions)
      {
        res.status(200).json({
          message:"You dont have any active appointments"
        })
      }
      else{
        let appoint=[];
        for(let i=0;i<sessions.length;i++)
        {
          if(sessions[i].userId)
          {
          var localStartTime = new Date(sessions[i].startTime.getTime() - sessions[i].startTime.getTimezoneOffset()*60*1000);
          var localEndTime = new Date(sessions[i].endTime.getTime() - sessions[i].endTime.getTimezoneOffset()*60*1000);
          var date1=localStartTime.toISOString();
          var date2=localEndTime.toISOString();
          var frmTime=(date1.split('T')[1]).split('.')[0]
          var toTime=(date2.split('T')[1]).split('.')[0]
          var date=(date2.split('T')[0])
          var y=(date.split('-'))[0]
          var m=(date.split('-'))[1]
          var d=(date.split('-'))[2]
          let msg={"User Id":sessions[i].userId,"User Name":sessions[i].userName,"Date":`${d}-${m}-${y}`,"Time":`${frmTime}-${toTime}`}
          appoint.push(msg)}
        }
        if(appoint.length==0)
        {   
        res.status(400).json({
          success:false,
          message:"You dont have any active appointments"
        })
        }
        else
{        res.status(200).json({
          appoint
        })}
      }
    }
})
