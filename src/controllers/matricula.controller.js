const Matricula = require("../models/matricula.model");


exports.getByCuatri = async (req, res) => {
    try {
      const cuatri = await Matricula.getByCuatri(req.params.cuatri);
      if (!cuatri) return res.status(404).json({ message: "No se encontro" });
      res.json(cuatri);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  