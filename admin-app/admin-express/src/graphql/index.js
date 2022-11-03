const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = { };

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  # The GraphQL types are declared first.

  # NOTE: The owner and pet are pseudo-joined; whilst they are related, how they are related is an implementation detail
  # that is NOT exposed in the GraphQL schema. This can be seen with the Pet type which has no field linking it to
  # an owner. That said an owner has many pets and this is exposed within the GraphQL schema by association.
  # Behind the scenes the database pet table has an additional field called email which is a FK to owner.

  scalar Date
  scalar Text

  type Comment {
    comment_id: Int,
    text: Text,
    date: Date,
    postId: Int,
    userId: Int
  }

  type Post {
    post_id: Int,
    text: Text,
    votes: Int, 
    image: String,
    date: Date,
    userId: Int
  }

  type User {
    id: Int,
    username: String,
    email: String, 
    password_hash: String,
    date_joined: Date,
    follower_count: Int,
    block: Boolean
  }

  # The input type can be used for incoming data.
  input BlockInput {
    id: Int,
    blockvalue: Boolean
  }

  # Queries (read-only operations).
  type Query {
    all_users: [User],
    one_user(id: Int): User,
    all_posts: [Post],
    count_comment(id: Int): Int,
    count_all_users: Int,
    count_all_posts: Int,
    count_all_comments: Int
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
    block_user(input:BlockInput): User,
    delete_post(id: Int): Boolean
  }

`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  all_users: async () => {
    return await db.user.findAll();
  },
  one_user: async (args) => {
    return await db.user.findByPk(args.id);
  },
  all_posts: async () => {
    return await db.post.findAll();
  },
  count_comment: async (args) => {
    return await db.comment.count({ where: { postId: args.id} });
  },
  count_all_users: async () => {
    return await db.user.count();
  },
  count_all_posts: async () => {
    return await db.post.count();
  },
  count_all_comments: async () => {
    return await db.comment.count();
  },
  
  
  // Mutations:
  block_user: async (args) => {
    const user = await db.user.findByPk(args.input.id);

    user.block = args.input.blockvalue;

    await user.save();

    return user;
  },
  delete_post: async (args) => {
    // await db.post.destroy({where: {post_id: args.id}});
    // await db.comment.destroy({where: {postId: args.id}});
    // await db.vote.destroy({where: {postId: args.id}});

    await Promise.all([
      db.post.destroy({where: {post_id: args.id}}),
      db.comment.destroy({where: {postId: args.id}}),
      db.vote.destroy({where: {postId: args.id}})
    ]);

    return true;
  },

};

module.exports = graphql;

// Below are some sample queries that can be used to test GraphQL in GraphiQL.
// Access the GraphiQL web-interface when the server is running here: http://localhost:4000/graphql
/*

{
  all_owners {
    email,
    first_name,
    last_name,
    pets {
      pet_id,
    	name
    }
  }
}

{
  owner(email: "matthew@rmit.edu.au") {
    email,
    first_name,
    last_name
  }
}

{
  owner_exists(email: "matthew@rmit.edu.au")
}

mutation {
  create_owner(input: {
    email: "newuser@rmit.edu.au",
    first_name: "New",
    last_name: "User"
  }) {
    email,
    first_name,
    last_name
  }
}

mutation {
  update_owner(input: {
    email: "matthew@rmit.edu.au",
    first_name: "Matthew",
    last_name: "Bolger"
  }) {
    email,
    first_name,
    last_name
  }
}

mutation {
  delete_owner(email: "newuser@rmit.edu.au")
}

*/
