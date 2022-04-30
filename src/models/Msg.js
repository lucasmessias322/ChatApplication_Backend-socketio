const mongoose = require("mongoose");

const Message = mongoose.model("message", {
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
    msgColor:{
        type: String,
        require: true,
    }
});

module.exports = Message;
