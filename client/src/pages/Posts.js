//frontend posts.js

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Posts() {
  let { id } = useParams();
  const [postlist, setpostlist] = useState({});
  const [comments, setcommentslist] = useState([]);
  const [newcomments, setnewcommentslist] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setpostlist(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setcommentslist(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newcomments,
          PostId: id,
        },

        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newcomments,
            username: response.data.username,
          };
          setcommentslist([...comments, commentToAdd]);
          setnewcommentslist("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setcommentslist(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postlist.title}</div>
          <div className="body">{postlist.postText}</div>
          <div className="footer">{postlist.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Add a Comment..."
            value={newcomments}
            autoComplete="off"
            onChange={(event) => {
              setnewcommentslist(event.target.value);
            }}
          />
          <button onClick={addComment}>Create Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comments, key) => {
            return (
              <div key={key} className="comment">
                {comments.commentBody}
                <label>Username: {comments.username}</label>
                {authState.username === comments.username && (
                  <button
                    onClick={() => {
                      deleteComment(comments.id);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
