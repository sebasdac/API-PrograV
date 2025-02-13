const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username y contraseña son requeridos" });
    }

    // Buscar usuario en la base de datos
    const user = await User.getByUsername(username);

    console.log("Usuario recuperado:", user);

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    console.log("Contraseña en la DB:", user.passwords);
    console.log("Contraseña ingresada:", password);

    // Comparación directa porque la contraseña en la DB no está encriptada
    if (user.passwords !== password) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
