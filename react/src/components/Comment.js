import React, { useState, useEffect } from "react";
import DashboardBackground from "../images/post_page.png";
import { useAlert } from "react-alert";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  createComment,
  getComments,
  getUser,
  getPost,
  findUser,
} from "../data/repository";

function Comment(props) {
  // this alert hook will alert the users once their account has been changed or deleted
  const alert = useAlert();
  // this navigate hook will navigate the users to the sign up page once they delete their account
  const navigate = useNavigate();

  // these states will be for the post title, description and image
  const [comment_desc, setCommentDesc] = useState("");

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  // this state will  be the word count
  const [count, setCount] = useState(0);

  // URL parameter which will be the post id
  let params = useParams();

  // this use effect hook will reverse the user post object array so that the newests post will be displayed on top
  useEffect(() => {
    // this function will load the post that the user is commenting
    async function loadPost() {
      const post = await getPost(params.postId);

      // get the users name
      const user = await findUser(post.userId);
      post.username = user.username;

      // the code below will format the date
      let date_string = "";
      let curr_date = post.date;

      date_string +=
        curr_date.substring(8, 10) +
        "/" +
        curr_date.substring(5, 7) +
        "/" +
        curr_date.substring(0, 4) +
        "  - " +
        curr_date.substring(11, 16);

      // set an object in the object array for the string format of the date
      post.date_string = date_string;
      setPost(post);

      const commentlist = await getComments(params.postId);

      // Loop through posts and add new object for displaying user's name
      for (let i = 0; i < commentlist.length; ++i) {
        // get the users name
        const user = await findUser(commentlist[i].userId);
        commentlist[i].username = user.username;

        // the code below will format the date
        date_string = "";
        let curr_date = commentlist[i].date;

        date_string +=
          curr_date.substring(8, 10) +
          "/" +
          curr_date.substring(5, 7) +
          "/" +
          curr_date.substring(0, 4) +
          "  - " +
          curr_date.substring(11, 16);

        // set an object in the object array for the string format of the date
        commentlist[i].date_string = date_string;
      }

      setComments(commentlist.reverse());
    }

    loadPost();
  }, []);

  // this handler will display the number of characters the user has input and set the post desc state
  const comment_input = (e) => {
    setCommentDesc(e.target.value);
    setCount(e.target.value.length);
  };

  // this handler will handle the submit for the comment
  const handleSubmit = async (e) => {
    // this will prevent the page from refreshing
    e.preventDefault();

    const new_comment = {
      text: comment_desc,
      userId: getUser().id,
      postId: params.postId,
    };

    await createComment(new_comment);

    setCommentDesc("");

    // navigate to dashboard once post as been made
    alert.success("Comment posted");
    setComments([]);

    async function loadComment() {
      const commentlist = await getComments(params.postId);

      // Loop through posts and add new object for displaying user's name
      for (let i = 0; i < commentlist.length; ++i) {
        // get the users name
        const user = await findUser(commentlist[i].userId);
        commentlist[i].username = user.username;

        // the code below will format the date
        let date_string = "";
        let curr_date = commentlist[i].date;

        date_string +=
          curr_date.substring(8, 10) +
          "/" +
          curr_date.substring(5, 7) +
          "/" +
          curr_date.substring(0, 4) +
          "  - " +
          curr_date.substring(11, 16);

        // set an object in the object array for the string format of the date
        commentlist[i].date_string = date_string;
      }

      setComments(commentlist.reverse());
    }

    loadComment();
  };

  return (
    <div className="Dashboard">
      <img
        src={DashboardBackground}
        style={{ width: "100%", height: "auto" }}
      ></img>
      <Link to="/dashboard">
      <div className="text-shadow-hover" style={{ color: "white", fontWeight: "bold", position: "absolute", zIndex: "10", marginTop: "-855px", marginLeft: "105px"}}>
        ⏎ Back
      </div>
      </Link>
      <div className="comment-card">
        <form onSubmit={handleSubmit}>
          <div className="comment-post-card">
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
            </div>
          </div>
          <div className="mb-3" style={{ width: "90%", marginLeft: "5%" }}>
            <label
              class="form-label"
              style={{ color: "white", fontWeight: "bold" }}
            >
              New Comment
            </label>
            <span
              style={{ float: "right", color: "white", fontWeight: "bold" }}
            >
              {count}/300 Characters
            </span>
            <textarea
              class="form-control"
              id="CommentTextarea"
              rows="3"
              placeholder="Enter comment here"
              style={{ backgroundColor: "rgb(0,0,0,0)", color: "white" }}
              maxLength="300"
              value={comment_desc}
              onChange={comment_input}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            style={{
              marginLeft: "5%",
              paddingLeft: "25px",
              paddingRight: "25px",
            }}
          >
            Post Comment
          </button>
        </form>
        {comments.length > 0 &&
          comments.map((comment) => (
            <div className="post-card">
              <div>
                <div className="post-name">{comment.username}</div>
                <h1 className="post-date">{comment.date_string}</h1>
                <div>{comment.text}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Comment;
