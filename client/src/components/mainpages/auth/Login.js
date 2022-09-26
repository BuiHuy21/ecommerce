import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = " /";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          type="text"
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
          <button type="submit"> Login</button>
          <span>
            Bạn chưa có tài khoản?<Link to="/register"> Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
