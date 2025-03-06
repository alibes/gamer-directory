import pool from "../config/db.js";

class GameDal {
  async insertGame(name) {
    try {
      const [result] = await pool.query(
        "INSERT INTO game (name) VALUES (?)",
        [name]
      );
      console.log("Insert Game Success:", result);
      return { id: result.insertId, name };
    } catch (err) {
      console.error("DB Error in insertGame:", err);
      throw new Error(err.message);
    }
  }

  async fetchAllGames() {
    try {
      const [rows] = await pool.query("SELECT * FROM game");
      return rows;
    } catch (err) {
      console.error("DB Fetch Error in fetchAllGames:", err);
      throw new Error(err.message);
    }
  }
}

export default new GameDal();
