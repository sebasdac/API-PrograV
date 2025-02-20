const express = require("express");
const historialacademico = require("../controllers/historialacademico.controller");
const authMiddleware = require("../middleware/auth.middleware");
const History = require("../models/history.model");



const router = express.Router();

router.get("/historialacademico/:tipo/:identificacion", async (req, res) => {
    try {
        const { tipo, identificacion } = req.params;
        const historial = await History.getByIdentificacion(tipo, identificacion);

        if (historial && historial.length > 0) {
            res.json(historial);
        } else {
            res.status(404).json({ message: "No se encontró el historial académico" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
});



module.exports = router;
