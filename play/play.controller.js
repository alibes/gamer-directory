import playDal from "./play.dal.js";
import { z } from "zod";

class PlayController {
  linkGamerToGame = async (req, res) => {
    const schema = z.object({
      gamerId: z.number().int().positive(),
      gameName: z.string().min(3).max(255).regex(/^[a-zA-Z0-9_ ]+$/),
      level: z.enum(["INVINCIBLE", "PRO", "N00B"])
    });

    if (req.body.gameName) {
      req.body.gameName = req.body.gameName.toLowerCase();
    }

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
    const schema = z.object({
      level: z.enum(["INVINCIBLE", "PRO", "N00B"]).optional(),
      game: z.string().min(3).max(255).optional(),
      geography: z.string().min(2).max(255).optional(),
    });

    const validation = schema.safeParse(req.query);
    if (!validation.success) {
      return res.status(400).json({ error: `Validation failed: ${validation.error.errors[0].message}` });
    }

    try {
      const gamers = await playDal.searchGamersByFilters(
        req.query.level,
        req.query.game?.toLowerCase(),
        req.query.geography
      );
      res.status(200).json(gamers);
    } catch (error) {
      res.status(500).json({ error: `Error searching gamers: ${error.message}` });
    }
  };

  getGamersByLevel = async (req, res) => {
    const schema = z.object({
      level: z.enum(["INVINCIBLE", "PRO", "N00B"]),
      gameName: z.string().min(3).max(255),
    });

    const validation = schema.safeParse(req.params);
    if (!validation.success) {
      return res.status(400).json({ error: `Validation failed: ${validation.error.errors[0].message}` });
    }

    try {
      const gamers = await playDal.getGamersByGameLevel(
        req.params.level,
        req.params.gameName.toLowerCase()
      );
      res.status(200).json(gamers);
    } catch (error) {
      res.status(500).json({ error: `Error fetching gamers by level: ${error.message}` });
    }
  };
}

export default new PlayController();
