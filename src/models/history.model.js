const { sql, poolPromise } = require("../config/database");

const History = {
  getAll: async () => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM PromedioEstudiante");
      return result.recordset;
    } catch (error) {
      throw error;
    }
  },

};

module.exports = History;
