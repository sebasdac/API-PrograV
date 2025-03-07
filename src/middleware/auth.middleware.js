const axios = require("axios");
require("dotenv").config();

const SERVER = process.env.AUTH_SERVER; // Usa una variable de entorno para la URL del servidor

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const refreshToken = req.header("x-refresh-token");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. No hay token." });
  }

  try {
    // Validar el token con una petición GET
    const validateResponse = await axios.get(`${SERVER}/validate`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (validateResponse.data === true) {
      console.log("hola pase por aca")
      return next(); // Token válido, continuar
    }

    // Si el token es inválido, intentar refrescarlo
    if (!refreshToken) {
      return res.status(401).json({ message: "Token expirado y no hay refresh token." });
    }

    const refreshResponse = await axios.post(`${SERVER}/refresh`, { refresh_token: refreshToken });

    if (refreshResponse.data?.access_token) {
      req.headers.authorization = `Bearer ${refreshResponse.data.access_token}`; // Actualizar token
      return next();
    }

   
    return res.status(401).json({ message: "No se pudo refrescar el token." });

  } catch (error) {
    return res.status(401).json({ message: "No autorizado." });
  }
};
