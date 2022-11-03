import React, { useEffect, useState } from "react";
import { getPosts, findUser, countComments, deletePost} from "../data/repository";
import { Link } from "react-router-dom";
import Background from "../images/LANABackground.png";

function Dashboard(props) {
  // this user state will contain the user posts
  const [user_post, setUser_Post] = useState([]);

  async function loadPosts() {
    const postlist = await getPosts();

    // Loop through posts and add new object for displaying user's name
    for (let i = 0; i < postlist.length; ++i) {
      // get the users name
      const user = await findUser(parseInt(postlist[i].userId));
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

      // Count the number of comments to display on the posts
      const comment_count = await countComments(postlist[i].post_id);

      postlist[i].comment_count = comment_count;
    }

    setUser_Post(postlist.reverse());
  }

  // this use effect hook will reverse the user post object array so that the newests post will be displayed on top
  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (event) => {
    const confirmBox = window.confirm(
      "Do you want to delete this post?"
    )
    if (confirmBox === true) {
      await deletePost(parseInt(event.target.value));
    } 
    loadPosts();
  };

  return (
    <div className="Dashboard">
      <img src={Background} style={{ width: "100%", height: "auto" }}></img>
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
            There are currently no posts
          </div>
        ) : (
          user_post.map((post) => (
            <div className="post-card">
              <div>
                <div className="post-name">{post.username}</div>
                <button
                  type="button"
                  value={post.post_id}
                  onClick={handleDelete}
                  className="btn btn-danger"
                  style={{ float: "right" }}
                >
                  Delete Post
                </button>
                <h1 className="post-date">{post.date_string}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.text }} />
                {post.image && (
                  <img
                    src={"http://localhost:4000/" + post.image.substring(25)}
                    className="post-image"
                  />
                )}

                <div style={{ paddingBottom: "25px", paddingTop: "15px" }}>
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

                  <div
                    className="reaction-card"
                    style={{
                      marginTop: "-7.5px",
                      color: "white",
                      float: "left",
                    }}
                  >
                    {post.comment_count == 1 && <div> {1} Comment 💬</div>}
                    {/* {post.comment_count} Comments 💬 */}
                    {(post.comment_count == 0 || post.comment_count > 1) && (
                      <div>{post.comment_count} Comments 💬</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
