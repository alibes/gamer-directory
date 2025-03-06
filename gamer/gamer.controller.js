import gamerDal from "./gamer.dal.js";
import { z } from "zod";

class gamerController{

  addGamer = async (req, res) => {
    const schema = z.object({
      username: z.string().min(3).max(255).regex(/^[a-zA-Z0-9_]+$/),
      geography: z.string().min(2).max(255)
    });

    const validation = schema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ error: validation.error.errors[0].message });
  
    try {
      const gamer = await gamerDal.insertGamer(req.body.username, req.body.geography);
      res.status(201).json(gamer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  getAllGamers = async (req, res) => {
    try {
      const gamers = await gamerDal.fetchAllGamers();
      res.status(200).json(gamers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new gamerController();