import express from "express";
import playController from "./play.controller.js";

const router = express.Router();

/**
 * @swagger
 * /play/linkGamerToGame:
 *   post:
 *     summary: Link a gamer to a game
 *     tags: [Play]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gamerId:
 *                 type: integer
 *               gameName:
 *                 type: string
 *               level:
 *                 type: string
 *                 enum: [INVINCIBLE, PRO, N00B]
 *     responses:
 *       201:
 *         description: Gamer linked to the game successfully
 */
router.post("/linkGamerToGame", playController.linkGamerToGame);

/**
 * @swagger
 * /play/searchGamers:
 *   get:
 *     summary: Search gamers based on level, game, and geography
 *     tags: [Play]
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [INVINCIBLE, PRO, N00B]
 *       - in: query
 *         name: game
 *         schema:
 *           type: string
 *       - in: query
 *         name: geography
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching gamers
 */
router.get("/searchGamers", playController.searchGamers);

/**
 * @swagger
 * /play/getGamersByLevel/{level}/game/{gameName}:
 *   get:
 *     summary: Get all gamers at a specific level in a game
 *     tags: [Play]
 *     parameters:
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: string
 *           enum: [INVINCIBLE, PRO, N00B]
 *       - in: path
 *         name: gameName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of gamers at the specified level
 */
router.get("/getGamersByLevel/:level/game/:gameName", playController.getGamersByLevel);

export default router;
