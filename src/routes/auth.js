require("dotenv").config();
const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("../models/User");
const User = mongoose.model("user");

// login

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // validations
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  // check if user exists
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    const currentUser = await User.findById(user._id, "-password");

    res
      .status(200)
      .json({ currentUser, msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

//Register
router.post("/register", async (req, res) => {
  const { name, userName, email, password, confirmpassword, UserImage } =
    req.body;

  // validations;
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  } else if (!userName) {
    return res.status(422).json({ msg: "O Nome de usuario é obrigatório!" });
  } else if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  } else if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  } else if (password != confirmpassword) {
    return res
      .status(422)
      .json({ msg: "A senha e a confirmação precisam ser iguais!" });
  }

  // check if user exists
  const userEmailExists = await User.findOne({ email: email });
  const userNameExists = await User.findOne({ userName: userName });

  if (userEmailExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
  } else if (userNameExists) {
    return res
      .status(422)
      .json({ msg: "Por favor, utilize outro Nome de usuario!" });
  }

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  let UserIp = req.header("x-forwarded-for") || req.connection.remoteAddress;
  // create user
  const user = new User({
    name,
    userName,
    email,
    password: passwordHash,
    IP: UserIp,
  });

  try {
    await user.save();

    res
      .status(201)
      .json({ msg: "Usuário criado com sucesso!", userCriado: true });
  } catch (error) {
    res.status(500).json({ erro: true, msg: "Erro ao criar novo usuario" });
  }
});

module.exports = router;
