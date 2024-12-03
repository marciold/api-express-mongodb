import dbConnect from "./config/dbConnect.js";
import express from "express";
import routes from "./routes/index.js";

const conexao = await dbConnect();

conexao.on("error", (erro) => {
  console.error("erro de conexão!", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o banco bem sucedida!");
});

const app = express();
routes(app);

export default app;
