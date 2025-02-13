const { sql, poolPromise } = require("../config/database");

const User = {
  getByUsername: async (username) => {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("username", sql.VarChar, username)
        .query("SELECT username, passwords FROM Login WHERE username = @username"); // Cambié password por passwords

      return result.recordset[0] || null;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = User;
