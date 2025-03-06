import { z } from "zod";
import gameDal from "./game.dal.js";

class GameController {
  addGame = async (req, res) => {
    const schema = z.object({
      name: z.string().min(3).max(255).regex(/^[a-z0-9_ ]+$/i)
    });

    if (req.body.name) {
      req.body.name = req.body.name.toLowerCase();
    }
    
    const validation = schema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ error: validation.error.errors[0].message });
    try {
      const game = await gameDal.insertGame(req.body.name);
      res.status(201).json(game);
    } catch (error) {
      res.status(500).json({ error: `Error adding game: ${error.message}` });
    }
  };

  getAllGames = async (req, res) => {
    try {
      const games = await gameDal.fetchAllGames();
      res.status(200).json(games);
    } catch (error) {
      res.status(500).json({ error: `Error fetching games: ${error.message}` });
    }
  };
}

export default new GameController();
