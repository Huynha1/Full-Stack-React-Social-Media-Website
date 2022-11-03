import React, { useState, useEffect } from "react";
import DashboardBackground from "../images/post_page.png";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getUser,
  getPosts,
  getPostsByUser,
  countComments,
  findUser,
  getAllVotes,
  vote,
  downvote,
  upvote,
} from "../data/repository";

function ViewPosts(props) {
  // this user context will contain the user posts
  const [user_post, setUser_Post] = useState([]);

  async function loadPosts() {
    const postlist = await getPostsByUser(params.userId);
    const votelist = await getAllVotes();

    // Loop through posts and add new object for displaying user's name
    for (let i = 0; i < postlist.length; ++i) {
      // get the users name
      const user = await findUser(postlist[i].userId);
      postlist[i].username = user.username;

      // the code below will format the date
      let date_string = "";
      let curr_date = postlist[i].date;

      date_string +=
        curr_date.substring(8, 10) +
        "/" +
        curr_date.substring(5, 7) +
        "/" +
        curr_date.substring(0, 4) +
        "  - " +
        curr_date.substring(11, 16);

      // set an object in the object array for the string format of the date
      postlist[i].date_string = date_string;

      const comment_count = await countComments(postlist[i].post_id);

      postlist[i].comment_count = comment_count;

      for (let j = 0; j < votelist.length; ++j) {
        if (
          postlist[i].post_id == votelist[j].postId &&
          getUser().id == votelist[j].userId
        ) {
          postlist[i].vote_val = votelist[j].vote;
        }
      }
    }

    setUser_Post(postlist.reverse());
  }

  // URL parameter which will be the post id
  let params = useParams();

  // this use effect hook will reverse the user post object array so that the newests post will be displayed on top
  useEffect(() => {
    loadPosts();
  }, []);

  const handleUpvote = async (event) => {
    await upvote(event.target.value);
    await vote(getUser().id, event.target.value, 1);
    loadPosts();
  };

  const handleDoubleUpvote = async (event) => {
    await upvote(event.target.value);
    await upvote(event.target.value);
    await vote(getUser().id, event.target.value, 1);
    loadPosts();
  };

  const handleDownvote = async (event) => {
    await downvote(event.target.value);
    await vote(getUser().id, event.target.value, -1);
    loadPosts();
  };

  const handleDoubleDownvote = async (event) => {
    await downvote(event.target.value);
    await downvote(event.target.value);
    await vote(getUser().id, event.target.value, -1);
    loadPosts();
  };

  const handleUnupvote = async (event) => {
    await downvote(event.target.value);
    await vote(getUser().id, event.target.value, 0);
    loadPosts();
  };

  const handleUndownvote = async (event) => {
    await upvote(event.target.value);
    await vote(getUser().id, event.target.value, 0);
    loadPosts();
  };

  return (
    <div className="Dashboard">
      <img
        src={DashboardBackground}
        style={{ width: "100%", height: "auto" }}
      ></img>
      <Link to="/dashboard">
        <div
          className="text-shadow-hover"
          style={{
            color: "white",
            fontWeight: "bold",
            position: "absolute",
            zIndex: "10",
            marginTop: "-855px",
            marginLeft: "105px",
          }}
        >
          ⏎ Back
        </div>
      </Link>
      <div className="dashboard-card">
        {user_post.length == 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "white",
              marginTop: "35%",
              fontSize: "30px",
            }}
          >
            User has no posts
          </div>
        ) : (
          user_post.map((post) => (
            <div className="post-card">
              <div>
                <div className="post-name">{post.username}</div>
                <h1 className="post-date">{post.date_string}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.text }} />
                {post.image && (
                  <img
                    src={"http://localhost:4000/" + post.image.substring(25)}
                    className="post-image"
                  />
                )}

                <div style={{ paddingBottom: "25px", paddingTop: "15px" }}>
                  {(post.vote_val == 0 || !post.vote_val) && (
                    <div>
                      <button
                        type="button"
                        className="btn btn-dark"
                        value={post.post_id}
                        onClick={handleUpvote}
                        style={{
                          float: "left",
                          transform: "rotate(180deg)",
                          marginRight: "5px",
                          marginTop: "-7.5px",
                        }}
                      >
                        ⇩
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark"
                        value={post.post_id}
                        onClick={handleDownvote}
                        style={{
                          float: "left",
                          marginRight: "5px",
                          marginTop: "-7.5px",
                        }}
                      >
                        ⇩
                      </button>
                    </div>
                  )}

                  {post.vote_val == 1 && (
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        value={post.post_id}
                        onClick={handleUnupvote}
                        style={{
                          float: "left",
                          transform: "rotate(180deg)",
                          marginRight: "5px",
                          marginTop: "-7.5px",
                        }}
                      >
                        ⇩
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark"
                        value={post.post_id}
                        onClick={handleDoubleDownvote}
                        style={{
                          float: "left",
                          marginRight: "5px",
                          marginTop: "-7.5px",
                        }}
                      >
                        ⇩
                      </button>
                    </div>
                  )}

                  {post.vote_val == -1 && (
                    <div>
                      <button
                        type="button"
                        className="btn btn-dark"
                        value={post.post_id}
                        onClick={handleDoubleUpvote}
                        style={{
                          float: "left",
                          transform: "rotate(180deg)",
                          marginRight: "5px",
                          marginTop: "-7.5px",
                        }}
                      >
                        ⇩
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        value={post.post_id}
                        onClick={handleUndownvote}
                        style={{
                          float: "left",
                          marginRight: "5px",
                          marginTop: "-7.5px",
                        }}
                      >
                        ⇩
                      </button>
                    </div>
                  )}

                  <div
                    className="reaction-card"
                    style={{
                      float: "left",
                      marginRight: "10px",
                      marginTop: "-7.5px",
                    }}
                  >
                    {post.votes} Votes
                  </div>

                  <Link
                    to={"/comment/" + post.post_id}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      type="button"
                      className="btn btn-dark"
                      style={{
                        marginTop: "-7.5px",
                        color: "white",
                        float: "left",
                      }}
                    >
                      {" "}
                      {post.comment_count == 1 && <div> {1} Comment 💬</div>}
                      {/* {post.comment_count} Comments 💬 */}
                      {(post.comment_count == 0 || post.comment_count > 1) && (
                        <div>{post.comment_count} Comments 💬</div>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewPosts;
