import db from "../config/db.js";

class GamerDal {
  insertGamer = (username, geography) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO gamer (username, geography) VALUES (?, ?)",
        [username, geography],
        (err, result) => {
          if (err) {
            console.error("MySQL Error in insertGamer:", err);
            return reject(err);
          }
          console.log("Insert Gamer Success:", result); 
          resolve({ id: result.insertId, username, geography });
        }
      );
    });
  };

  fetchAllGamers = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM gamer", (err, results) => {
        if (err) {
          console.error("MySQL Fetch Error in fetchAllGamers:", err); 
          return reject(err);
        }
        resolve(results);
      });
    });
  };
}

export default new GamerDal();
