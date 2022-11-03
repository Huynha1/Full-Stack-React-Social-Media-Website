module.exports = (express, app) => {
  const controller = require("../controllers/comment.controller.js");
  const router = express.Router();

  // Select all comments.
  router.get("/", controller.all);

  // Count number of comments of post
  router.get("/count/:id", controller.count);

  // Create a new comment.
  router.post("/", controller.create);

  // Select all comment by post id.
  router.get("/select_by_post_id/:id", controller.by_post_id);

  // Delete all comment by user id.
  router.get("/delete_by_user_id/:userId", controller.delete_by_userid);

  // Add routes to server.
  app.use("/api/comments", router);
};
