import pool from "../config/db.js";

class PlayDal {
  async insertPlay(gamerId, gameName, level) {
    try {
      const [result] = await pool.query(
        "INSERT INTO play (gamer_id, game_name, level) VALUES (?, ?, ?)",
        [gamerId, gameName, level]
      );
      console.log("Play Inserted:", result);
      return { message: "Game linked to gamer", gameName, level };
    } catch (err) {
      console.error("DB Error in insertPlay:", err);
      throw new Error(err.message);
    }
  }

  async searchGamersByFilters(level, game, geography) {
    try {
      const [results] = await pool.query(
        "SELECT g.username, g.geography FROM gamer g JOIN play p ON g.id = p.gamer_id WHERE p.game_name = ? AND p.level = ? AND g.geography = ?",
        [game, level, geography]
      );
      return results;
    } catch (err) {
      console.error("DB Error in searchGamersByFilters:", err);
      throw new Error(err.message);
    }
  }

  async getGamersByGameLevel(level, gameName) {
    try {
      const [results] = await pool.query(
        "SELECT g.username FROM gamer g JOIN play p ON g.id = p.gamer_id WHERE p.game_name = ? AND p.level = ?",
        [gameName, level]
      );
      return results;
    } catch (err) {
      console.error("DB Error in getGamersByGameLevel:", err);
      throw new Error(err.message);
    }
  }
}

export default new PlayDal();
