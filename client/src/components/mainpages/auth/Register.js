import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstLogin", true);

      window.location.href = " /";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={user.name}
          onChange={onChangeInput}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          autoComplete="on"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={onChangeInput}
        />

        <div className="row">
          <button type="submit"> Register</button>
          <span>
            Bạn đã có tài khoản?<Link to="/login"> Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
