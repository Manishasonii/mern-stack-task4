import axios from "axios";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/register",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.message);

      navigate("/");

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (

    <div className="container">

      <div className="box">

        <h1>Register</h1>

        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={handleRegister}>
          Register
        </button>

      </div>

    </div>
  );
}

export default Register;