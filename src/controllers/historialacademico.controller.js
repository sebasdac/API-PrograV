const history = require("../models/history.model");

exports.getAll = async (req, res) => {
  try {
    const History = await history.getAll();
    res.json(History);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

