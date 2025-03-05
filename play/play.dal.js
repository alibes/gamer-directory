import db from "../config/db.js";

class PlayDal {
  insertPlay = (gamerId, gameName, level) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO play (gamer_id, game_name, level) VALUES (?, ?, ?)",
        [gamerId, gameName, level],
        (err, result) => {
          if (err) reject(err);
          resolve({ message: "Game linked to gamer", gameName, level });
        }
      );
    });
  };

  searchGamersByFilters = (level, game, geography) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT g.username, g.geography FROM gamer g JOIN play p ON g.id = p.gamer_id WHERE p.game_name = ? AND p.level = ? AND g.geography = ?",
        [game, level, geography],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  };

  getGamersByGameLevel = (level, gameName) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT g.username FROM gamer g JOIN play p ON g.id = p.gamer_id WHERE p.game_name = ? AND p.level = ?",
        [gameName, level],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  };
}

export default new PlayDal();
