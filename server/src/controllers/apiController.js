const dotenv = require("dotenv");

dotenv.config();

function getAPIData(req, res) {
  res.json({
    message: "API Data",
    API_KEY: process.env.API_KEY,
  });
}

module.exports = {getAPIData};
