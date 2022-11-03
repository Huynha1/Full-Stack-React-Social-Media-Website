import axios from "axios";

// This repository is built from the week 8 lab

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(email, password) {
  const response = await axios.get(API_HOST + "/api/users/login", {
    params: { email, password },
  });
  const user = response.data;

  //Set user in local storage
  if (user !== null) setUser(user);

  return user;
}

// verify user with id
async function verifyUserByID(id, password) {
  const response = await axios.get(API_HOST + "/api/users/login_w_id", {
    params: { id, password },
  });
  const user = response.data;

  //Set user in local storage
  if (user !== null) setUser(user);

  return user;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function getAllUsers() {
  const response = await axios.get(API_HOST + "/api/users/");

  return response.data;
}

async function findUserByUsername(username) {
  const response = await axios.get(
    API_HOST + `/api/users/select_username/${username}`
  );

  return response.data;
}

async function findUserByEmail(email) {
  const response = await axios.get(
    API_HOST + `/api/users/select_email/${email}`
  );

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function updateUser(id, username, email, password) {
  const response = await axios.get(API_HOST + "/api/users/update", {
    params: { id, username, email, password },
  });

  const user = response.data;

  //Set user in local storage
  if (user !== null) setUser(user);

  return user;
}

async function updateUserWOPassword(id, username, email) {
  const response = await axios.get(API_HOST + "/api/users/update_wo_password", {
    params: { id, username, email},
  });

  const user = response.data;

  //Set user in local storage
  if (user !== null) setUser(user);

  return user;
}

async function deleteUser(id) {
  const response = await axios.get(API_HOST + `/api/users/delete/${id}`);
  // removeUser();

  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function getPost(id) {
  const response = await axios.get(API_HOST + `/api/posts/select/${id}`);

  return response.data;
}

async function getPostsByUser(id) {
  const response = await axios.get(API_HOST + `/api/posts/select_by_user/${id}`);

  return response.data;
}

async function countPosts(userId) {
  const response = await axios.get(API_HOST + `/api/posts/count/${userId}`);

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

async function createPostWithImage(post) {
  const response = await axios.post(API_HOST + "/api/posts/with_image", post);

  return response.data;
}

async function deletePostByUserId(userId) {
  const response = await axios.get(API_HOST + `/api/posts/delete_by_user_id/${userId}`);

  return response.data;
}

async function upvote(postId) {
  const response = await axios.get(API_HOST + `/api/posts/upvote/${postId}`);

  return response.data;
}

async function downvote(postId) {
  const response = await axios.get(API_HOST + `/api/posts/downvote/${postId}`);

  return response.data;
}

// --- Comment ---------------------------------------------------------------------------------------
async function createComment(comment) {
  const response = await axios.post(API_HOST + "/api/comments", comment);

  return response.data;
}

async function deleteCommentByUserId(id) {
  const response = await axios.get(API_HOST + `/api/comments/delete_by_user_id/${id}`);

  return response.data;
}

async function getComments(id) {
  const response = await axios.get(API_HOST + `/api/comments/select_by_post_id/${id}`);

  return response.data;
}

async function countComments(id) {
  const response = await axios.get(API_HOST + `/api/comments/count/${id}`);

  return response.data;
}

// --- Follow ---------------------------------------------------------------------------------------
async function follow(followerId, followingId) {
  const response = await axios.post(API_HOST + `/api/follows/${followerId}/${followingId}`);

  return response.data;
}

async function unfollow(followerId, followingId) {
  const response = await axios.get(API_HOST + `/api/follows/unfollow/${followerId}/${followingId}`);

  return response.data;
}

async function deleteFollower(followerId) {
  const response = await axios.get(API_HOST + `/api/follows/remove_by_follower/${followerId}`);

  return response.data;
}

async function deleteFollowing(followingId) {
  const response = await axios.get(API_HOST + `/api/follows/remove_by_following/${followingId}`);

  return response.data;
}

async function getFollowing(followingId) {
  const response = await axios.get(API_HOST + `/api/follows/select_by_follower/${followingId}`);

  return response.data;
}

async function getFollowers(followingId) {
  const response = await axios.get(API_HOST + `/api/follows/select_by_following/${followingId}`);

  return response.data;
}

async function countFollower(followerId) {
  const response = await axios.get(API_HOST + `/api/follows/count_follower/${followerId}`);

  return response.data;
}

async function countFollowing(followingId) {
  const response = await axios.get(API_HOST + `/api/follows/count_following/${followingId}`);

  return response.data;
}

// --- Vote ---------------------------------------------------------------------------------------

async function vote(userId, postId, vote) {
  const response = await axios.post(API_HOST + `/api/votes/vote/${userId}/${postId}/${vote}`);

  return response.data;
}

async function getAllVotes() {
  const response = await axios.get(API_HOST + "/api/votes/select_all");

  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser,
  verifyUserByID,
  findUser,
  findUserByUsername,
  findUserByEmail,
  createUser,
  getPosts,
  getPostsByUser,
  getPost,
  createPost,
  countPosts,
  upvote,
  downvote,
  createComment,
  deleteCommentByUserId,
  getComments,
  countComments,
  createPostWithImage,
  deletePostByUserId,
  updateUser,
  updateUserWOPassword,
  deleteUser,
  setUser,
  getUser,
  getAllUsers,
  removeUser,
  follow, 
  unfollow,
  deleteFollower,
  deleteFollowing,
  getFollowing,
  getFollowers,
  countFollower,
  countFollowing,
  vote,
  getAllVotes
};
