import React, { useState } from "react";
import DashboardBackground from "../images/post_page.png";
import UserContext from "./UserContext";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { getUser, createPost, createPostWithImage } from "../data/repository";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Post(props) {
  // this alert hook will alert the users once their account has been changed or deleted
  const alert = useAlert();
  // this navigate hook will navigate the users to the sign up page once they delete their account
  const navigate = useNavigate();

  // these states will be for the post title, description and image
  const [post_desc, setPostDesc] = useState("");
  const [post_image, setPost_Image] = useState("");
  const [error_message, setError_Message] = useState("");

  // this state will  be the word count
  const [count, setCount] = useState(0);

  // This is used to check char count of the post
  const reactQuillRef = React.useRef();
  // this handler will change the post length count
  const checkCharCount = (event) => {
    const unprivilegedEditor = reactQuillRef.current.unprivilegedEditor;
    setCount(unprivilegedEditor.getLength());
    if (unprivilegedEditor.getLength() >= 600 && event.key !== "Backspace")
      event.preventDefault();
  };

  // this handler will handle the submit
  const handleSubmit = async (e) => {
    // this will prevent the page from refreshing
    e.preventDefault();
    if(post_desc.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setError_Message("Post cannot be empty");
      return;
    }

    if (post_image == "") {
      const new_post = {
        text: post_desc,
        userId: getUser().id,
      };
      await createPost(new_post);
    }
    else {
      // posting with image
      const new_post = new FormData();

      new_post.append('text', post_desc);
      new_post.append('userId', getUser().id);
      new_post.append('image', post_image);
      await createPostWithImage(new_post);
    }

    // navigate to dashboard once post as been made
    navigate("/dashboard");
    alert.success("Post has been made");
  };

  return (
    <div className="Dashboard">
      <img
        src={DashboardBackground}
        style={{ width: "100%", height: "auto" }}
      ></img>
      <div className="new-post-card">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label
              class="form-label"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Post description
            </label>
            <span
              style={{ float: "right", color: "white", fontWeight: "bold" }}
            >
              {count}/600 Characters
            </span>
            <ReactQuill
              onKeyDown={checkCharCount}
              ref={reactQuillRef}
              className="ql-toolbar ql-stroke ql-fill ql-picker"
              value={post_desc}
              onChange={setPostDesc}
              style={{
                height: "400px",
                backgroundColor: "rgb(0, 0, 0, 0.4)",
                color: "white",
                paddingBottom: "42px",
              }}
            />
            {error_message != "" && (<div><p/><div style={{ color: "red", textAlign: "center" }} >{error_message}</div></div>)}
          </div>
          <div class="mb-3">
            <label
              class="form-label"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Upload Image
            </label>
            <br />
            <input
              type="file"
              name="image"
              size="1g"
              onChange={(e) => {
                // On change the image uploaded in this input field will be set as the post image state
                setPost_Image(e.target.files[0]);
              }}
              style={{ color: "white" }}
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            style={{
              paddingLeft: "25px",
              paddingRight: "25px",
            }}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
