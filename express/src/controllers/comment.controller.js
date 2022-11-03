const db = require("../database");
const argon2 = require("argon2");
const { sequelize } = require("../database");

// Select all comment from the database.
exports.all = async (req, res) => {
  const comments = await db.comment.findAll();

  res.json(comments);
};

// Select all comment from the database based on post id.
exports.by_post_id = async (req, res) => {
  const comments = await db.comment.findAll({ where: { postId: req.params.id } });

  res.json(comments);
};

// Select all comment from the database based on post id.
exports.count = async (req, res) => {
  const comments = await db.comment.count({ where: { postId: req.params.id } });
  
  res.json(comments);
};

// Create a comment in the database.
exports.create = async (req, res) => {

  const comment = await db.comment.create({
    text: req.body.text,
    postId: req.body.postId,
    userId: req.body.userId,

  });

  res.json(comment);
};

exports.delete_by_userid = async (req, res) => {

  await db.comment.destroy({where: {userId: req.params.userId}});

  res.json("Comment deleted");
};

