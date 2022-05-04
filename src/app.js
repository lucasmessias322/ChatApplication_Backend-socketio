require("dotenv").config();
const express = require("express");
const moongose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");

const app = express();
require("./dbConnection");
const authenticationRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const Msg = require("./models/Msg");

app.use(express.json());
app.use(morgan("dev"));

// cors config
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.5:3000"],
    methods: ["GET", "POST"],
  })
);
app.get("/", (req, res) => {
  let ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  res.json({ msg: "welcome to api" });
});
app.use("/auth", authenticationRoutes);
app.use(usersRoutes);

const port = process.env.PORT || 8082;

const server = app.listen(port, "192.168.0.5", () => {
  console.log("Servidor iniciado na porta: " + port);
});

const io = socketio(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  const secret = process.env.SECRET;
  const auth = socket.handshake.auth;

  if (auth && token) {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) return next(new Error("Authentication error"));
      socket.decoded = decoded;
      console.log(token);
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log("novo usuario conectado");
  Msg.find().then((result) => {
    socket.emit("output-message", result);
  });

  socket.on("chatmessage", (data) => {
    console.log("[SOCKET] ChatMessage", data);
    // let { userId, userName, msg, msgColor } = data;
    const message = new Msg({ ...data });

    message.save().then(() => {
      console.log("message Save on Db");
    });
    io.emit("chatmessage", data);
  });

  socket.on("disconnect", () => {
    console.log("[SOCKET] Disconnect => A connection was disconected");
  });
});
