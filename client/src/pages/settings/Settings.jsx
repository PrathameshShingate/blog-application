import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./settings.css";


const Settings = () => {
  const PF = "http://localhost:8000/images/";
  
  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const userRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const updatedUser = {
      _id: user._id,
      username: userRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("http://localhost:8000/upload", data); 
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(`http://localhost:8000/users/${user._id}`, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8000/users/${user._id}`, {
        data: {
          _id: user._id,
        },
      });
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDeleteUser}>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleUpdateUser}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {file ? (
              <img src={URL.createObjectURL(file)} alt="" />
            ) : (
              <img src={PF + user.profilePic} alt="" />
            )}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder="name" name="name" ref={userRef}/>
          <label>Email</label>
          <input type="email" placeholder="email" name="email" ref={emailRef}/>
          <label>Password</label>
          <input type="password" placeholder="password" name="password" ref={passRef}/>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
