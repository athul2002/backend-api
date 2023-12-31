const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema(
  {
    deanName: {
      type: String,
      required: true,
    },
    deanId: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    userId:{
      type:String,
    },
    userName:{
      type:String,
    },
    status:{
      type:String,
      default:"free"
    }
  },
  {
    timestamps: true,
  }
);
 
module.exports = mongoose.model("Session", sessionSchema);