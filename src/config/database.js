const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // Puede ser "localhost" o una IP
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Requerido si usas Azure SQL
    trustServerCertificate: true, // Evita errores de certificado
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("✅ Conectado a SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("❌ Error conectando a SQL Server:", err);
  });

module.exports = {
  sql,
  poolPromise,
};
