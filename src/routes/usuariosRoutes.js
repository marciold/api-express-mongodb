import express from "express";
import usuariosController from "../controllers/usuariosController.js";

// Vamos atender as rotas usando o código escrito lá no controler:

const routes = express.Router();

routes.post("/register", usuariosController.register);

routes.get("/login", usuariosController.login);


export default routes;