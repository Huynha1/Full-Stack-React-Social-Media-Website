module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Select all post with id.
  router.get("/select_by_user/:userId", controller.all_by_user);

  // Create a new post.
  router.post("/", controller.create);

  // Select a single post with id.
  router.get("/select/:id", controller.one);

  // Count posts based on userId
  router.get("/count/:userId", controller.count);

  // Create a new post with image.
  router.post("/with_image", controller.upload, controller.create_with_image);

  // Delete post based on user id.
  router.get("/delete_by_user_id/:userId", controller.delete_by_userid);

  // upvote post based on post id
  router.get("/upvote/:postId", controller.upvote);

  // downvote post based on post id
  router.get("/downvote/:postId", controller.downvote);

  // Add routes to server.
  app.use("/api/posts", router);
};
