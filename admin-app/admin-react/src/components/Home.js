import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { countAllUsers, countAllPosts, countAllComments} from "../data/repository";
import Background from "../images/LANABackground.png";

// This is the home/landing page
function Home(props) {
  const [user_count, setUser_Count] = useState(0);
  const [post_count, setPost_Count] = useState(0);
  const [comment_count, setComment_Count] = useState(0);

  useEffect(() => {
    loadCounts();
  }, []);

  async function loadCounts() {
    const user_val = await countAllUsers();

    setUser_Count(user_val);

    const post_val = await countAllPosts();

    setPost_Count(post_val);

    const comment_val = await countAllComments();

    setComment_Count(comment_val);
  }

  return (
    <div className="Home">
      <img src={Background} style={{ width: "100%", height: "auto" }}></img>
      <div className="home-container">
        <div className="column3">
          <div className="home-stat-card">
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "white",
                marginTop: "110px",
                textAlign: "center",
                textShadow: "2px 2px rgb(0,0,0, 0.25)",
              }}
            >
              Number of users
            </p>
            <p
              style={{
                fontSize: "75px",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                textShadow: "2px 2px rgb(0,0,0, 0.25)",
              }}
            >
              {user_count}
            </p>
          </div>
        </div>
        <div className="column3">
          <div className="home-stat-card">
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "white",
                marginTop: "110px",
                textAlign: "center",
                textShadow: "2px 2px rgb(0,0,0, 0.25)",
              }}
            >
              Number of posts
            </p>
            <p
              style={{
                fontSize: "75px",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                textShadow: "2px 2px rgb(0,0,0, 0.25)",
              }}
            >
              {post_count}
            </p>
          </div>
        </div>
        <div className="column3">
          <div className="home-stat-card">
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "white",
                marginTop: "110px",
                textAlign: "center",
                textShadow: "2px 2px rgb(0,0,0, 0.25)",
              }}
            >
              Number of comments
            </p>
            <p
              style={{
                fontSize: "75px",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                textShadow: "2px 2px rgb(0,0,0, 0.25)",
              }}
            >
              {comment_count}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
