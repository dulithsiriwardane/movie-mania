const pool = require("../config/db");

async function getWatchList(id) {
  const [rows] = await pool.query("SELECT * FROM watchlist WHERE user_id = ?", [
    id,
  ]);
  return rows || null;
}

module.exports = {
  getWatchList,
};
