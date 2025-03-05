import request from "supertest";
import app from "../server.js";
import db from "../config/db.js";

describe("Game API Tests", () => {

  beforeAll(async () => {
    await new Promise((resolve, reject) => {
      db.query("DELETE FROM game", (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  });

  afterAll(async () => {
    db.end();
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

    expect(res.statusCode).toBe(200); 
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Should add a new game", async () => {
    const res = await request(app)
      .post("/games/addGame")
      .send({ name: "Call of Duty" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Call of Duty");
  });

  it("Should get all games", async () => {
    const res = await request(app).get("/games/getAllGames");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
