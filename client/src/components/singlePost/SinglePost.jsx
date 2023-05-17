import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./singlePost.css";

const SinglePost = ({ id }) => {
  const PF = "http://localhost:8000/images/";

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const getSinglePost = async () => {
      const res = await axios.get(`http://localhost:8000/posts/${id}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getSinglePost();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/posts/${post._id}`, {
        data: {
          username: user.username,
        },
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {edit ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="singlePostTitleInput"
            autoFocus
          ></input>
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={()=>setEdit(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {edit ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {edit && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
