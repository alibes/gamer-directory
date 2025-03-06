import playDal from "./play.dal.js";
import { z } from "zod";

class PlayController {
  linkGamerToGame = async (req, res) => {
    const schema = z.object({
      gamerId: z.number().int().positive(),
      gameName: z.string().min(3).max(255).regex(/^[a-zA-Z0-9_ ]+$/),
      level: z.enum(["INVINCIBLE", "PRO", "N00B"])
    });

    const validation = schema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ error: validation.error.errors[0].message });
    try {
      const result = await playDal.insertPlay(req.body.gamerId, req.body.gameName, req.body.level);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  searchGamers = async (req, res) => {
    try {
      const gamers = await playDal.searchGamersByFilters(req.query.level, req.query.game, req.query.geography);
      res.status(200).json(gamers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getGamersByLevel = async (req, res) => {
    try {
      const gamers = await playDal.getGamersByGameLevel(req.params.level, req.params.gameName);
      res.status(200).json(gamers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new PlayController();
