import express from "express";
import alunosRoutes from "./alunosRoutes.js";
import usuariosRoutes from "./usuariosRoutes.js";
import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");

  let token;

  if (authHeader) {
    const headerString = authHeader.split(" ");
    if (headerString.length === 2) {
      token = headerString[1];
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado, Token não fornecido." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Acesso negado. Token expirado." });
      } else if (err.name === "JsonWebTokenError") {
        return res
          .status(403)
          .json({ message: "Acesso negado. Token inválido." });
      } else {
        return res
          .status(403)
          .json({ message: "Acesso negado. Erro na verificação do token." });
      }
    }

    req.user = user;

    const issuedAtISO = new Date(user.iat * 1000).toISOString();
    const expiresAtISO = new Date(user.exp * 1000).toISOString();

    console.log(`token validado para usuário: ${user.username}
        Emitido em: ${issuedAtISO}
        Expira em ${expiresAtISO}`);

    next();
  });
};

const routes = (app) => {
  app.use(express.json());
  app.use(usuariosRoutes);

  app.use(authenticateJWT);
  app.use(alunosRoutes);
};

export default routes;
