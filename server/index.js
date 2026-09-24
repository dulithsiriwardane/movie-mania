import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/data", async (req, res) => {
  res.json({
    message: "API Data",
    API_KEY: process.env.API_KEY,
  });
});

app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.post("/api/signup", async (req, res) => {
  const {firstName, lastName, password, email} = req.body;
  const [rows] = await pool.query("SELECT user_id FROM user WHERE email = ?", [
    email,
  ]);
  if (rows.length) {
    return res.json({message: "User with the email already exists"});
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await pool.query(
      "INSERT INTO user(first_name, last_name, password, email) values (?, ?, ?, ?)",
      [firstName, lastName, hashedPassword, email],
    );
    console.log(response);
    return res.json({message: "User registered successfully"});
  }
});

app.post("/api/signin", async (req, res) => {
  const {email, password} = req.body;
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
