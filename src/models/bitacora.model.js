const { sql, poolPromise } = require("../config/database");

const Bitacora = {
  insert: async (fecha_bitacora, id_usuarioi, descripcion) => {
    try {
      const pool = await poolPromise;

      // Obtener la fecha automáticamente si no se pasa
      const fecha = fecha_bitacora || new Date();

      const result = await pool
        .request()
        .input("fecha_bitacora", sql.Date, fecha)
        .input("id_usuarioi", sql.Int, id_usuarioi)
        .input("descripcion", sql.VarChar, descripcion)
        .query("INSERT INTO Bitacora (fecha_bitacora, id_usuarioi, descripcion) VALUES (@fecha_bitacora, @id_usuarioi, @descripcion)");

      // Verificar cuántas filas fueron afectadas
      if (result.rowsAffected[0] > 0) {
        console.log('Acción registrada en la bitácora con éxito');
        return { success: true, message: 'Registro exitoso en la bitácora' };
      } else {
        console.error('No se registró la acción en la bitácora');
        return { success: false, message: 'No se registró la acción en la bitácora' };
      }

    } catch (error) {
      console.error('Error al registrar en la bitácora:', error);
      throw error;
    }
  },
  error: async(fecha_bitacora, id_usuarioi, descripcion) => {
    try {
        const pool = await poolPromise;

      // Obtener la fecha automáticamente si no se pasa
      const fecha = fecha_bitacora || new Date();

      const result = await pool
        .request()
        .input("fecha_bitacora", sql.Date, fecha)
        .input("id_usuarioi", sql.Int, id_usuarioi)
        .input("descripcion", sql.VarChar, descripcion)
        .query("INSERT INTO Bitacora (fecha_bitacora, id_usuarioi, descripcion) VALUES (@fecha_bitacora, @id_usuarioi, @descripcion)");

      // Verificar cuántas filas fueron afectadas
      if (result.rowsAffected[0] > 0) {
        console.log('Acción registrada en la bitácora con éxito');
        return { success: true, message: 'Registro exitoso en la bitácora' };
      } else {
        console.error('No se registró la acción en la bitácora');
        return { success: false, message: 'No se registró la acción en la bitácora' };
      }

    }
    catch(error){

    }
  }
};

module.exports = Bitacora;
