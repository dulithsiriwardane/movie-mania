const bcrypt = require("bcrypt");
const pool = require("../config/db");

async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM user");
  return rows || null;
}

async function findUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [
    email,
  ]);

  return rows || null;
}

async function createUser(firstName, lastName, password, email) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const response = await pool.query(
    "INSERT INTO user(first_name, last_name, password, email) values (?, ?, ?, ?)",
    [firstName, lastName, hashedPassword, email],
  );
  return response;
}

module.exports = {
  findUserByEmail,
  createUser,
  getAllUsers,
};
