import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Successfully connected to MySQL database!");
    connection.release();
  } catch (error) {
    console.error("Error connecting to MySQL:", error.message);
  }
})();

export async function createUser(name, email, password) {
  const sqlQuery = "INSERT INTO users (name, email) values (?, ?)";
  const result = await pool.query("SELECT id FROM users WHERE email = ?", [
    email,
  ]);

  // console.log(result[0][0].id);

  // if (result[0][0].id) {
  //   console.log("User with email alreadt exists");
  // } else {
  const result2 = await pool.query(sqlQuery, [name, email]);
  console.log(result2);
  return result2;
  // }
}

export default pool;
