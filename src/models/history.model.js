const { sql, poolPromise } = require("../config/database");

const History = {
    getByIdentificacion: async (tipo, identificacion) => {
      try {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("tipo", sql.VarChar, tipo)  // Cambiado a VarChar porque es un string
          .input("identificacion", sql.VarChar, identificacion)
          .query("SELECT CodigoCurso, NombreCurso, PromedioObtenido  FROM PromedioEstudiante WHERE TipoIdentificacion = @tipo AND IdentificacionEstudiante = @identificacion");
        return result.recordset || null;
      } catch (error) {
        throw error;
      }
  },

};

module.exports = History;
