module.exports = (express, app) => {
  const controller = require("../controllers/follow.controller.js");
  const router = express.Router();

  // Select all follows
  router.get("/", controller.all);

  // Create follow relatinship
  router.post("/:followerId/:followingId", controller.follow);

  // remove follow relatinship by following id and follwer id
  router.get("/unfollow/:followerId/:followingId", controller.unfollow);

  // remove follow relatinship by follower id
  router.get("/remove_by_follower/:followerId", controller.delete_by_follower);

  // remove follow relatinship by following id
  router.get("/remove_by_following/:followingId", controller.delete_by_following);

  // Get following by follower
  router.get("/select_by_follower/:followerId", controller.all_by_follower);

  // Get following by following
  router.get("/select_by_following/:followingId", controller.all_by_following);

  // Get follower count
  router.get("/count_follower/:followerId", controller.count_follower);

  // Get following count
  router.get("/count_following/:followingId", controller.count_following);

  // Add routes to server.
  app.use("/api/follows", router);
};
