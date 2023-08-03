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
  },
  {
    timestamps: true,
  }
);
 
module.exports = mongoose.model("Session", sessionSchema);