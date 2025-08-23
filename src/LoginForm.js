import React, { useState } from "react";
import { login } from "./api/function";

function LoginForm({ onLogin, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rs = await login({ email, password });
      localStorage.setItem("token", rs.data.data.token);
      onLogin();
      // console.log(rs.data.data.token);
    } catch (error) {
      alert(error.response.data.errors);
    }
    console.log(11111111);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Đăng nhập</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mật khẩu:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Đăng nhập
      </button>

      {/* Nút "Quên mật khẩu?" đã được di chuyển xuống đây */}
      <button type="button" onClick={onForgotPassword} className="toggle-link">
        Quên mật khẩu?
      </button>
    </form>
  );
}

export default LoginForm;
