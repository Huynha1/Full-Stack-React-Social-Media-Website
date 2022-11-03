const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
// db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Add user routes.
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/post.routes.js")(express, app);
require("./src/routes/comment.routes.js")(express, app);
require("./src/routes/follow.routes.js")(express, app);
require("./src/routes/vote.routes.js")(express, app);

const request = require("supertest");
const axios = require("axios");

// This test case will test the backend for the register function 
describe("Register Test", () => {
  test("register reponse has username", async () => {
    const reponse = await request(app).post("/api/users/").send({
      username: "username",
      email: "test@gmail.com",
      password: "Password123!",
    });
    expect(reponse.body.username).toBe("username");
    expect(reponse.body.id).toBeDefined();

    await request(app).get(`/api/users/delete/${reponse.body.id}`);
  });
});

// This test case will test the backend for the login function 
describe("Login test", () => {
  test("login reponse has username", async () => {
    const user = await request(app).post("/api/users/").send({
      username: "username",
      email: "test@gmail.com",
      password: "Password123!",
    });

    const reponse = await request(app).get("/api/users/login").send({ params: { id: user.body.id ,password: user.body.password}, });

    expect(reponse.body.username).toBeDefined();
    expect(reponse.body.id).toBeDefined();

    await request(app).get(`/api/users/delete/${reponse.body.id}`);
  });
});