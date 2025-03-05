import express from "express";
import gamerController from "./gamer.controller.js";

const router = express.Router();

/**
 * @swagger
 * /gamers/addGamer:
 *   post:
 *     summary: Add a new gamer
 *     tags: [Gamers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               geography:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gamer added successfully
 */
router.post("/addGamer", gamerController.addGamer);

/**
 * @swagger
 * /gamers/getAllGamers:
 *   get:
 *     summary: Get all gamers
 *     tags: [Gamers]
 *     responses:
 *       200:
 *         description: List of all gamers
 */
router.get("/getAllGamers", gamerController.getAllGamers);

export default router;
