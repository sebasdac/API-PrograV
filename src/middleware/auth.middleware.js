const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. No hay token." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // Agregamos la info del usuario a la request
    next(); // Pasamos al siguiente middleware o controlador
  } catch (err) {
    res.status(401).json({ message: "Token inválido." });
  }
};
