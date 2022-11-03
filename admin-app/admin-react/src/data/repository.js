import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4000/graphql";

// --- Users -------------------------------------------------------------------------------------

async function getUsers() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_users {
        id, 
        username,
        email,
        date_joined,
        follower_count,
        block
        
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_users;
}

async function blockUser(user) {
  const query = gql`
    mutation ($id: Int, $blockvalue: Boolean) {
      block_user(input: {
        id: $id,
        blockvalue: $blockvalue
      }) {
        username,
      }
    }
  `;

  const variables = user;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.block_user;
}

async function findUser(id) {
  const query = gql`
  query ($id: Int) {
      one_user(id: $id) {
        id, 
        username,
        email,
        date_joined,
        follower_count,
        block
        
      }
    }
  `;

  const variables = { id };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.one_user;
}

async function countAllUsers() {
  const query = gql`
    {
      count_all_users
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.count_all_users;
}

// --- Posts ---------------------------------------------------------------------------------------

async function getPosts() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_posts {
        post_id,
        text,
        votes, 
        image,
        date,
        userId
        
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_posts;
}

async function deletePost(id) {
  const query = gql`
    mutation ($id: Int) {
      delete_post(id: $id) 
    }
  `;

  const variables = {id};

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.delete_post;
}

async function countAllPosts() {
  const query = gql`
    {
      count_all_posts
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.count_all_posts;
}

// --- Comment -------------

async function countComments(id) {
  const query = gql`
  query ($id: Int) {
      count_comment(id: $id)
    }
  `;

  const variables = { id };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.count_comment;
}

async function countAllComments() {
  const query = gql`
    {
      count_all_comments
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.count_all_comments;
}


export {
  getUsers, findUser, blockUser, getPosts, countComments, deletePost, countAllUsers, countAllPosts, countAllComments
}
