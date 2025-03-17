const { sql, poolPromise } = require("../config/database");
const Bitacora = require('./bitacora.model');  // Asegúrate de importar la API de la bitácora


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

      if (historialData) {
        // Aquí definimos el ID del usuario como un valor fijo (ejemplo: 1)
        const id_usuarioi = 1;  // El ID del usuario está "quemado" en el código

        // Llamar a la función de Bitacora para registrar la acción
        const descripcion = `Se ha consultado el historial academico`;
        const fecha_bitacora = new Date();  // Obtener la fecha actual

        await Bitacora.insert(fecha_bitacora, id_usuarioi, descripcion);  // Registrar en la bitácora

        console.log('Datos de historial obtenidos y acción registrada en la bitácora');
      }

      return historialData;
    } catch (error) {
      
      console.error('Error al obtener los datos del historial o registrar en la bitácora:', error);
      throw error;
    }

};

module.exports = History;
