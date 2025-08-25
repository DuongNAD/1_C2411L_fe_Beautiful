import React, { useState } from 'react';

function ForgotPasswordForm({ onRequestReset, onBackToLogin }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRequestReset(email);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Quên Mật khẩu</h2>
      <p style={{ textAlign: 'center', marginBottom: '25px', color: '#666' }}>
        Nhập email của bạn để nhận mã OTP đặt lại mật khẩu.
      </p>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your.email@example.com"
        />
      </div>

      <button type="submit" className="submit-btn">
        Gửi mã OTP
      </button>
      
      <button type="button" onClick={onBackToLogin} className="toggle-link">
        &larr; Quay lại Đăng nhập
      </button>
    </form>
  );
}

export default ForgotPasswordForm;