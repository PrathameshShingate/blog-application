import axios from "axios";
import "./write.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const { user } = useContext(AuthContext);
  const titleRef = useRef();
  const descRef = useRef();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleAddPost = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title: titleRef.current.value,
      desc: descRef.current.value,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:8000/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("http://localhost:8000/posts", newPost);
      // window.location.replace("/posts/" + res.data._id);
      navigate("/posts/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="writeForm" onSubmit={handleAddPost}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            ref={titleRef}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            ref={descRef}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
