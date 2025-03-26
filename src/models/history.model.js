const { sql, poolPromise } = require("../config/database");


const History = {
  getByIdentificacion: async (tipo, identificacion) => {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("tipo", sql.VarChar, tipo)
        .input("identificacion", sql.VarChar, identificacion)
        .query("SELECT CodigoCurso, NombreCurso, PromedioObtenido FROM PromedioEstudiante WHERE TipoIdentificacion = @tipo AND IdentificacionEstudiante = @identificacion");

      const historialData = result.recordset || null;

      
      return historialData;
    } catch (error) {
      
      console.error('Error al obtener los datos del historial o registrar en la bitácora:', error);
      throw error;
    }
  }

};

module.exports = History;
