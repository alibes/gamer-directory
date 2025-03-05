import db from "../config/db.js";

class GameDal {
  insertGame = (name) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO game (name) VALUES (?)", [name], (err, result) => {
        if (err) reject(err);
        resolve({ id: result.insertId, name });
      });
    });
  };

  fetchAllGames = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM game", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  };
}

export default new GameDal();
