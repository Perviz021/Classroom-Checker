import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "113355",
  database: "classroom_checker",
});

export default db;
