const app = require("./app.js");

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log("Servidor iniciado na porta: " + port);
});
