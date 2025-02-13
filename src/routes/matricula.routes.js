const express = require("express");
const matricula = require("../controllers/matricula.controller");

const router = express.Router();

router.get("/listadoestudiantes/:cuatri", matricula.getByCuatri);


module.exports = router;
