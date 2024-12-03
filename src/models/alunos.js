import mongoose from "mongoose";

const alunosSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    ra: { type: String, required: true },
    nota1: { type: Number },
    nota2: { type: Number },
  },
  { versionKey: false }
);

const alunos = mongoose.model("alunos", alunosSchema);

export default alunos;
