const express = require("express");
const matricula = require("../controllers/matricula.controller");
const authMiddleware = require("../middleware/auth.middleware");


const router = express.Router();



router.get("/listadoestudiantes/:cuatri", authMiddleware ,matricula.getByCuatri);


module.exports = router;
