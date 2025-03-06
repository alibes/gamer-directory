import request from "supertest";
import app from "../server.js";
import pool from "../config/db.js"; 

describe("Play API Tests", () => {

  beforeAll(async () => {
    try {
      await pool.execute("DELETE FROM play"); 
    } catch (err) {
      console.error("Error clearing test database:", err);
    }
  });

  afterAll(async () => {
    try {
      await pool.end(); 
      console.log("DB Connection Pool Closed.");
    } catch (err) {
      console.error("Error closing database connection:", err);
    }
  });

  it("Should prevent SQL Injection in linkGamerToGame", async () => {
    const res = await request(app)
      .post("/play/linkGamerToGame")
      .send({ 
        gamerId: 1, 
        gameName: "'; DROP TABLE play; --", 
        level: "PRO"
      });

    expect(res.statusCode).toBe(400); 
    expect(res.body.error).toBeDefined();
  });

  it("Should prevent SQL Injection in searchGamers", async () => {
    const res = await request(app).get("/play/searchGamers?game=' OR '1'='1' --");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Should link a gamer to a game", async () => {
    const res = await request(app)
      .post("/play/linkGamerToGame")
      .send({ gamerId: 1, gameName: "Call of Duty", level: "PRO" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Game linked to gamer");
  });

  it("Should search for gamers by level, game, and geography", async () => {
    const res = await request(app).get("/play/searchGamers?level=PRO&game=Call of Duty&geography=Japan");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Should get gamers by level for a specific game", async () => {
    const res = await request(app).get("/play/getGamersByLevel/PRO/game/Call of Duty");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
