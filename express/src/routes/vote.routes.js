module.exports = (express, app) => {
  const controller = require("../controllers/vote.controller.js");
  const router = express.Router();

  // Select all votes
  router.get("/select_all/", controller.all);

  router.post("/vote/:userId/:postId/:vote", controller.create_vote);

  // Add routes to server.
  app.use("/api/votes", router);
};
