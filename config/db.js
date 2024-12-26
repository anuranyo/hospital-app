const { Connection, Request, TYPES } = require("tedious");
require("dotenv").config();

const config = {
  server: process.env.DB_SERVER,
  options: {
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    encrypt: false,
    trustServerCertificate: true,
    database: process.env.DB_DATABASE,
  },
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
};

const executeQuery = (query, parameters = []) => {
  return new Promise((resolve, reject) => {
    const connection = new Connection(config);

    connection.on("connect", (err) => {
      if (err) return reject(err);

      const results = [];
      const request = new Request(query, (err) => {
        if (err) return reject(err);
      });

      // Add query parameters
      parameters.forEach((param) => {
        request.addParameter(param.name, param.type, param.value);
      });

      // Process rows
      request.on("row", (columns) => {
        const row = {};
        columns.forEach((column) => {
          row[column.metadata.colName] = column.value;
        });
        results.push(row);
      });

      request.on("requestCompleted", () => {
        resolve(results);
        connection.close();
      });

      connection.execSql(request);
    });

    connection.connect();
  });
};

module.exports = { executeQuery, TYPES };
