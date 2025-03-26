const { sql, poolPromise } = require("../config/database");


const Matricula = {
  getByCuatri: async (cuatri, periodo) => {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("cuatri", sql.Int, cuatri)
        .input("periodo", sql.VarChar, periodo)
        .query("select identificacion, TipoIdentificacion, NombreCompleto, Carrera, Curso, Grupo from Matricula where Cuatrimestre = @cuatri and periodo = @periodo");

      const matriculaData = result.recordset || null;

      

      return matriculaData;
    } catch (error) {
      console.error('Error al obtener los datos de matrícula o registrar en la bitácora:', error);
      throw error;
    }
  },
};

module.exports = Matricula;

