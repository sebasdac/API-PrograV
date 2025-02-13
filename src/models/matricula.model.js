const { sql, poolPromise } = require("../config/database");

const Matricula = {
    getByCuatri: async (cuatri) => {
        try {
          const pool = await poolPromise;
          const result = await pool
            .request()
            .input("cuatri", sql.Int, cuatri)
            .query("select * from Matricula where Cuatrimestre = @cuatri");
          return result.recordset[0] || null;
        } catch (error) {
          throw error;
        }
    },
};

module.exports = Matricula;
