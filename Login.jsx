import axios from "axios";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert(res.data.message);

      navigate("/dashboard");

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (

    <div className="container">

      <div className="box">

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p
          className="link"
          onClick={() => navigate("/register")}
        >
          Create New Account
        </p>

      </div>

    </div>
  );
}

export default Login;