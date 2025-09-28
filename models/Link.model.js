const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

let LinkSchema = `CREATE TABLE IF NOT EXISTS links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ending VARCHAR(255) NOT NULL,
  redirect VARCHAR(2048) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  clicks INT DEFAULT 0
);`;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

module.exports = { pool, LinkSchema };

