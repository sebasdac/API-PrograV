const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const historyRoutes = require("./routes/history.routes");
const matriculaRoutes = require("./routes/matricula.routes");
const authRoutes = require("./routes/auth.routes")
const bitacoraRoutes = require("./routes/bitacora.routes")

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Rutas
app.use("/api", historyRoutes);
app.use("/api", matriculaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", bitacoraRoutes);

module.exports = app;
