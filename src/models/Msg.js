const mongoose = require("mongoose");

const Message = new mongoose.Schema(
  {
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
      require: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("message", Message);
