const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // Використовується для Azure або Windows
        trustServerCertificate: true, // Використовується для локального SQL Server
    },
};

(async function testConnection() {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to the database!');
        await pool.close();
    } catch (err) {
        console.error('Connection failed:', err.message);
    }
})();
