const express = require("express");
const historialacademico = require("../controllers/historialacademico.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/historialacademico", authMiddleware, historialacademico.getAll);


module.exports = router;
