require("dotenv").config();
const router = require("express").Router();
const res = require("express/lib/response");
const mongoose = require("mongoose");
const checkToken = require("../middlewares/checkToken");
require("../models/User");
const User = mongoose.model("user");

router.get("/users", checkToken, async (req, res) => {
  await User.find({}, { email: 0, password: 0 })
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
