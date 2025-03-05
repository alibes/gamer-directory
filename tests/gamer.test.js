import request from "supertest";
import app from "../server.js";
import db from "../config/db.js";

describe("Gamer API Tests", () => {

  beforeAll(async () => {
    await new Promise((resolve, reject) => {
      db.query("DELETE FROM gamer", (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  });

  afterAll(async () => {
    db.end();
  });

  it("Should add a new gamer", async () => {
    const res = await request(app)
      .post("/gamers/addGamer")
      .send({ username: "testUser", geography: "Japan" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.username).toBe("testUser");
  });

  it("Should get all gamers", async () => {
    const res = await request(app).get("/gamers/getAllGamers");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Should prevent SQL Injection in addGamer", async () => {
    const res = await request(app)
      .post("/gamers/addGamer")
      .send({ 
        username: "'; DROP TABLE gamer; --", 
        geography: "HackerLand" 
      });

    expect(res.statusCode).toBe(400); 
    expect(res.body.error).toBeDefined();
  });

  it("Should prevent SQL Injection in getAllGamers", async () => {
    const res = await request(app)
      .get("/gamers/getAllGamers?username=' OR '1'='1' --");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
