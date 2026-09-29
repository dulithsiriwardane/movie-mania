const express = require("express");
const apiController = require("../controllers/apiController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/data", authenticateToken, apiController.getAPIData);

module.exports = router;
