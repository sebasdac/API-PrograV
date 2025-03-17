const express = require("express");
const bitacora = require("../models/bitacora.model");
const authMiddleware = require("../middleware/auth.middleware");


const router = express.Router();



router.post("/bitacora", bitacora.insert);


module.exports = router;
