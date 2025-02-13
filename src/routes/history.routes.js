const express = require("express");
const historialacademico = require("../controllers/historialacademico.controller");

const router = express.Router();

router.get("/historialacademico", historialacademico.getAll);


module.exports = router;
