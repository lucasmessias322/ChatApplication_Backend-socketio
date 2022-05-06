require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
require("./dbConnection");
const authenticationRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");


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
  res.json({ msg: "welcome to api" });
});

app.use("/auth", authenticationRoutes);
app.use(usersRoutes);

module.exports = app;
