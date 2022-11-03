const db = require("../database");
const argon2 = require("argon2");
const { sequelize } = require("../database");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Select one user from the database based on username.
exports.username_one = async (req, res) => {
  const user = await db.user.findOne({
    where: { username: req.params.username },
  });

  res.json(user);
};

// Select one user from the database based on email.
exports.email_one = async (req, res) => {
  const user = await db.user.findOne({ where: { email: req.params.email } });

  res.json(user);
};

// Select one user from the database if email and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findOne({ where: { email: req.query.email } });

  if (
    user === null ||
    (await argon2.verify(user.password_hash, req.query.password)) === false
  )
    // Login failed.
    res.json(null);
  else res.json(user);
};

// login with id
exports.login_w_id = async (req, res) => {
  const user = await db.user.findOne({ where: { id: req.query.id } });

  if (
    user === null ||
    (await argon2.verify(user.password_hash, req.query.password)) === false
  )
    // Login failed.
    res.json(null);
  else res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  const user = await db.user.create({
    username: req.body.username,
    email: req.body.email,
    password_hash: hash,
  });

  res.json(user);
};

// update user in the database.
exports.update = async (req, res) => {
  // const user = await db.user.findByPk(req.query.id);
  // hash the password
  const hash = await argon2.hash(req.query.password, { type: argon2.argon2id });

  // user.username = req.query.username;
  // user.email = req.query.email;
  // user.password = hash;

  // user.save;

  // Update user using queries
  await db.user.update(
    { username: req.query.username, email: req.query.email, password_hash: hash },
    { where: { id: req.query.id } }
  );

  const user = await db.user.findByPk(req.query.id);

  res.json(user);
};

// update user in the database.
exports.update_wo_password = async (req, res) => {
  // Update user using queries
  await db.user.update(
    { username: req.query.username, email: req.query.email },
    { where: { id: req.query.id } }
  );

  const user = await db.user.findByPk(req.query.id);

  res.json(user);
};

// Delete a user in a database.
exports.delete = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  await db.user.destroy({where: {id: req.params.id}});

  res.json(user);
};
