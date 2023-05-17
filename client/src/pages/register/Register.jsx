import { useRef, useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post("http://localhost:8000/auth/register", {
        username: userRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      res.data && navigate("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          ref={emailRef}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
        {error && (
          <span
            style={{ color: "red", marginTop: "10px", textAlign: "center" }}
          >
            Something went wrong
          </span>
        )}
      </form>
      <button className="registerLoginButton">Login</button>
    </div>
  );
};

export default Register;
