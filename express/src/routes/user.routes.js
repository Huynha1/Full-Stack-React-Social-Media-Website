module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one);

  // Select a single user with username.
  router.get("/select_username/:username", controller.username_one);

  // Select a single user with email.
  router.get("/select_email/:email", controller.email_one);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Select one user from the database if username and password are a match.
  router.get("/login_w_id", controller.login_w_id);

  // Create a new user.
  router.post("/", controller.create);

  // Update user
  router.get("/update", controller.update);

  // Update user without password
  router.get("/update_wo_password", controller.update_wo_password);

  // Delete user based on id
  router.get("/delete/:id", controller.delete);

  // Add routes to server.
  app.use("/api/users", router);
};
