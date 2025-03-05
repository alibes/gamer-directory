import express from "express";
import gameController from "./game.controller.js";

const router = express.Router();

/**
 * @swagger
 * /games/addGame:
 *   post:
 *     summary: Add a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game added successfully
 */
router.post("/addGame", gameController.addGame);

/**
 * @swagger
 * /games/getAllGames:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: List of all games
 */
router.get("/getAllGames", gameController.getAllGames);

export default router;
