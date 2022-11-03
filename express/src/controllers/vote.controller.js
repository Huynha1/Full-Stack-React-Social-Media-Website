const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const votes = await db.vote.findAll();
  
  res.json(votes);
};

// Create vote relationship
exports.create_vote = async (req, res) => {
  const votes = await db.vote.findAll({ where: { userId: req.params.userId } });

  // boolean value for if found user and post
  let found = false;

  for (let i = 0; i < votes.length; ++i) {
    
    if (votes[i].postId == req.params.postId) {
      found = true;
      await db.vote.update(
        { vote: req.params.vote },
        { where: { id: votes[i].id } }
      );
    }
  }

  if (!found) {
    await db.vote.create({
      userId: req.params.userId,
      postId: req.params.postId,
      vote: req.params.vote,
    });
  }

  res.json("voted");
};
