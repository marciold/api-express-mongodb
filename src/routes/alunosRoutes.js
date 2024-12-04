import express from "express";
import alunosController from "../controllers/alunosController.js";

const routes = express.Router();

routes.get("/alunos", alunosController.listarAlunos);

routes.get("/alunos/medias", alunosController.listarMedias);

routes.get("/alunos/aprovados", alunosController.listarAprovados);

routes.get("/alunos/:id", alunosController.findAlunoById);

routes.post("/alunos", alunosController.cadastrarAluno);

routes.put("/alunos/:id", alunosController.updateAlunoById);

routes.delete("/alunos/:id", alunosController.deleteAlunoById);

export default routes;
