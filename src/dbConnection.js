const mongoose = require("mongoose");

const dbConnetction = () => {
  return mongoose
    .connect(`mongodb://localhost:27017/chat`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conexão com MongoDB realizada com sucesso!");
    })
    .catch((erro) => {
      console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
    });
};

module.export = dbConnetction();
