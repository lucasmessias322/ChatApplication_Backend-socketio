const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  msg: {
    type: String,
    require: true,
  },
  msgColor: {
    type: String,
    require: true,
  },
  sendendTime: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    index: { expires: "3d" },
  },
});

module.exports = mongoose.model("message", Message);
