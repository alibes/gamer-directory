import pool from "../config/db.js";

class GamerDal {
  async insertGamer(username, geography) {
    try {
      const [result] = await pool.query(
        "INSERT INTO gamer (username, geography) VALUES (?, ?)",
        [username, geography]
      );
      console.log("Insert Gamer Success:", result);
      return { id: result.insertId, username, geography };
    } catch (err) {
      console.error("DB Error in insertGamer:", err);
      throw new Error(err.message);
    }
  }

  async fetchAllGamers() {
    try {
      const [rows] = await pool.query("SELECT * FROM gamer");
      return rows;
    } catch (err) {
      console.error("DB Fetch Error in fetchAllGamers:", err);
      throw new Error(err.message);
    }
  }
}

export default new GamerDal();
