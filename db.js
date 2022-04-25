const { Client } = require("pg");
const secure = require("./secure.js");

// Database connection
const client = new Client({
  user: secure["user"],
  host: secure["host"],
  database: secure["database"],
  password: secure["password"],
  port: secure["port"],
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected Successfully!");
});

module.exports = client;
