import { useContext, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./login.css";

const Login = () => {
  const { dispatch, isFetching } = useContext(AuthContext);
  const navigate = useNavigate();

  const userRef = useRef();
  const passwordRef = useRef();

  // dispatch({ type: "LOGIN_START" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      // dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleLogin}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
          autoComplete="off"
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
          autoComplete="off"
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      <Link to="/register">
        <button className="loginRegisterButton">Register</button>
      </Link>
    </div>
  );
};

export default Login;
