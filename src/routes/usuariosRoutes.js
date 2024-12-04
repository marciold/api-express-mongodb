import express from "express";
import usuariosController from "../controllers/usuariosController.js";

const routes = express.Router();

routes.post("/register", usuariosController.register);

routes.post("/login", usuariosController.login);

export default routes;
