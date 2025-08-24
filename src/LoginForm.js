import React, { useState } from "react";
import { login } from "./api/function"; 

function LoginForm({ onLogin, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 

    try {
      const rs = await login({ email, password });
      localStorage.setItem("token", rs.data.data.token);
      onLogin();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const apiErrors = err.response.data.errors;
        
        if (typeof apiErrors === 'object') {
          setErrors(apiErrors);
        } else {
          setErrors({ api: apiErrors });
        }
      } else {
        setErrors({ api: "Đã có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng." });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Đăng nhập</h2>

      {errors.api && <p className="error-message">{errors.api}</p>}

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="field-error-message">{errors.email[0]}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Mật khẩu:</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="field-error-message">{errors.password[0]}</p>}
      </div>

      <button type="submit" className="submit-btn">
        Đăng nhập
      </button>

      <button type="button" onClick={onForgotPassword} className="toggle-link">
        Quên mật khẩu?
      </button>
    </form>
  );
}

export default LoginForm;