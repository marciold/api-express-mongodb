import alunos from "../models/alunos.js";

class AlunosController {
  static async listarAlunos(req, res) {
    try {
      const listaDosAlunos = await alunos.find({});
      res.status(200).json(listaDosAlunos);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Falha na requisição.` });
    }
  }

  static async cadastrarAluno(req, res) {
    try {
      const novoAluno = await alunos.create(req.body);
      res
        .status(201)
        .json({ message: "Aluno cadastrado com sucesso!", aluno: novoAluno });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Falha ao cadastrar aluno.` });
    }
  }

  static async findAlunoById(req, res) {
    try {
      const id = req.params.id;
      const aluno = await alunos.findById(id);
      res.status(200).json(aluno);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Aluno não encontrado.` });
    }
  }

  static async updateAlunoById(req, res) {
    try {
      const id = req.params.id;
      const alunoAtualizado = await alunos.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "Aluno Atualizado com sucesso!",
        aluno: alunoAtualizado,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Falha na atualização.` });
    }
  }

  static async deleteAlunoById(req, res) {
    try {
      const id = req.params.id;
      const alunoDeletado = await alunos.findByIdAndDelete(id);
      res.status(200).json({
        message: "Aluno deletado com sucesso!",
        aluno: alunoDeletado,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Falha na exclusão.` });
    }
  }

  static async listarMedias(req, res) {
    try {
      const listaAlunos = await alunos.find({});

      const mediasReport = AlunosController.mediaAlunosReport(listaAlunos);
      res.status(200).json(mediasReport);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Falha na requisição.` });
    }
  }

  static mediaAlunosReport(listaAlunos) {
    return listaAlunos.map((aluno) => {
      const media =
        aluno.nota1 && aluno.nota2
          ? ((aluno.nota1 + aluno.nota2) / 2).toFixed(2)
          : 0;
      return {
        nome: aluno.nome,
        media: parseFloat(media),
      };
    });
  }

  static async listarAprovados(req, res) {
    try {
      const listaAlunos = await alunos.find({});

      const statusReport = AlunosController.alunoStatusReport(listaAlunos);

      res.status(200).json(statusReport);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Falha na requisição.` });
    }
  }

  static alunoStatusReport(listaAlunos) {
    return listaAlunos.map((aluno) => {
      const status =
        ((aluno.nota1 + aluno.nota2) / 2).toFixed(2) >= 6
          ? "aprovado"
          : "reprovado";

      return {
        nome: aluno.nome,
        status: status,
      };
    });
  }
}

export default AlunosController;
