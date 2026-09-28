const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const apiRoute = require("./routes/apiRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/", apiRoute);

module.exports = app;
