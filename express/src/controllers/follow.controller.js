const db = require("../database");
const argon2 = require("argon2");
const { sequelize } = require("../database");
const { Sequelize } = require("sequelize");

// Select all follows from the database.
exports.all = async (req, res) => {
  const follow_list = await db.follow.findAll();

  res.json(follow_list);
};

// Select all following based on follower.
exports.all_by_follower = async (req, res) => {
  const follow_list = await db.follow.findAll({
    where: { follower_id: req.params.followerId },
  });

  res.json(follow_list);
};

// Select all following based on following.
exports.all_by_following = async (req, res) => {
  const follow_list = await db.follow.findAll({
    where: { following_id: req.params.followingId },
  });

  res.json(follow_list);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const users = await db.follow.findByPk(req.params.followerId);

  res.json(users);
};

// Create a user in the database.
exports.follow = async (req, res) => {
  const relationship = await db.follow.create({
    follower_id: req.params.followerId,
    following_id: req.params.followingId,
  });

  res.json(relationship);
};

exports.unfollow = async (req, res) => {
  // Find the list of users the user is following
  const follow_list = await db.follow.findAll({
    where: { follower_id: req.params.followerId },
  });

  // Delete the user that the user is following
  for (let i = 0; i < follow_list.length; ++i) {
    if (follow_list[i].following_id == req.params.followingId) {
      await db.follow.destroy({ where: { id: follow_list[i].id } });
      break;
    }
  }

  res.json("unfollowed");
};

exports.delete_by_follower = async (req, res) => {
  
  await db.follow.destroy({ where: { follower_id: req.params.followerId } });

  res.json("deleted");
};

exports.delete_by_following = async (req, res) => {
  
  await db.follow.destroy({ where: { following_id: req.params.followingId } });

  res.json("deleted");
};

// Select and count based on follower id
exports.count_follower = async (req, res) => {
  const follow = await db.follow.count({ where: { follower_id: req.params.followerId } });
  
  res.json(follow);
};

// Select and count based on following id
exports.count_following = async (req, res) => {
  const follow = await db.follow.count({ where: { following_id: req.params.followingId } });
  
  res.json(follow);
};