const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

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


// the static images folder so it can display properly
// app.use('../react/src/post_images', express.static('./react/src/post_images'));
// the image will be accessed via url of the image
app.use(express.static('../react/src/post_images')); 

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
