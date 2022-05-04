const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    UserImage: {
      type: String,
      default: "",
    },
    IP: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", User);

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     min: 3,
//     max: 20,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     max: 50,
//   },
//   password: {
//     type: String,
//     required: true,
//     min: 8,
//   },
//   isAvatarImageSet: {
//     type: Boolean,
//     default: false,
//   },
//   avatarImage: {
//     type: String,
//     default: "",
//   },
// });
