import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample Route
app.get("/api/health", (req, res) => {
  res.json({status: "Server running smoothly"});
});

app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));