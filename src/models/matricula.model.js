const { sql, poolPromise } = require("../config/database");
const Bitacora = require('./bitacora.model');  // Asegúrate de importar la API de la bitácora

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

      if (matriculaData) {
        // Aquí definimos el ID del usuario como un valor fijo (ejemplo: 1)
        const id_usuarioi = 1;  // El ID del usuario está "quemado" en el código

        // Llamar a la función de Bitacora para registrar la acción
        const descripcion = `Se ha consultado la matrícula para el cuatrimestre ${cuatri}`;
        const fecha_bitacora = new Date();  // Obtener la fecha actual

        await Bitacora.insert(fecha_bitacora, id_usuarioi, descripcion);  // Registrar en la bitácora

        console.log('Datos de matrícula obtenidos y acción registrada en la bitácora');
      }

      return matriculaData;
    } catch (error) {
      console.error('Error al obtener los datos de matrícula o registrar en la bitácora:', error);
      throw error;
    }
  },
};

module.exports = Matricula;

