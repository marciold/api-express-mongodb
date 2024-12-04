import usuarios from "../models/usuarios.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class UsuariosController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      await usuarios.create({ username: username, password: hashedPassword });

      res.status(201).json({ message: "User registered." });
    } catch (error) {
      res.status(401).json({ message: "Erro ao cadastrar!" });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;

    const listaDosUsuarios = await usuarios.find({});

    const user = listaDosUsuarios.find((user) => user.username === username);
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!user || !passwordIsValid) {
      return res.status(401).json({ message: "Login Incorreto." });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
        algorithm: "HS256",
      }
    );

    res.json({ message: token });
  }
}

export default UsuariosController;
