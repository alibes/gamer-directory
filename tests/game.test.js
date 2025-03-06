import request from "supertest"; //for testing without front
import app from "../server.js";
import pool from "../config/db.js"; 

describe("Game API Tests", () => {

  beforeAll(async () => {
    try {
      await pool.execute("DELETE FROM game");
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

  it("Should prevent SQL Injection in addGame", async () => {
    const res = await request(app)
      .post("/games/addGame")
      .send({ name: "'; DROP TABLE game; --" });

    expect(res.statusCode).toBe(400); 
    expect(res.body.error).toBeDefined();
  });

  it("Should prevent SQL Injection in getAllGames", async () => {
    const res = await request(app).get("/games/getAllGames?name=' OR '1'='1' --");

    expect(res.statusCode).toBe(200); //ignore invalid query and no crash
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Should add a new game", async () => {
    const res = await request(app)
      .post("/games/addGame")
      .send({ name: "Call of Duty" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("call of duty");
  });

  it("Should get all games", async () => {
    const res = await request(app).get("/games/getAllGames");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
