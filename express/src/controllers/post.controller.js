const db = require("../database");

// image uploading
const multer = require('multer');
const path = require('path');

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.post.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(posts);
};

// Select all posts from the database based on user
exports.all_by_user = async (req, res) => {
  const posts = await db.post.findAll({ where: { userId: req.params.userId } });

  res.json(posts);
};

// Select one post from the database.
exports.one = async (req, res) => {
  const post = await db.post.findByPk(req.params.id);
  // const post = await db.post.findOne({where: {post_id: req.params.id}});

  res.json(post);
};

// Select and count all post from the database based on user id.
exports.count = async (req, res) => {
  const posts = await db.post.count({ where: { userId: req.params.userId } });
  
  res.json(posts);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const post = await db.post.create({
    text: req.body.text,
    userId: req.body.userId,

  });

  res.json(post);
};

// upvote post in database
exports.upvote = async (req, res) => {

  await db.post.increment({votes: 1}, { where: { post_id: req.params.postId } })

  res.json("Post upvoted");
};

// downvote post in database
exports.downvote = async (req, res) => {

  await db.post.decrement({votes: 1}, { where: { post_id: req.params.postId } })

  res.json("Post downvoted");
};

// Create a post in the database with an image.
exports.create_with_image = async (req, res) => {
  const post = await db.post.create({
    text: req.body.text,
    userId: req.body.userId,
    image: req.file.path

  });

  res.json(post);
};

// delete a post based on user id in the database.
exports.delete_by_userid = async (req, res) => {
  
  await db.post.destroy({where: {userId: req.params.userId}});

  res.json("Posts deleted");
};

// Upload Image Controller

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, '../react/src/post_images')

  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

exports.upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('image')
