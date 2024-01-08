const mongoose = require("mongoose");

const userConnectionHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  connection_type: {
    type: String, //login|logout
    required: true,
  },
  // connection_type: {
  //   type: String, //login|logout
  //   required: true,
  // },
  ip_address: {
    type: String,
  },
  device_info: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "Successful Login",
  },
  date : {
    type: Date,
    default: Date.now(),    
  }
});

module.exports = mongoose.model("UserConnection", userConnectionHistorySchema);
