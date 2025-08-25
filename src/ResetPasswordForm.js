import React, { useState } from "react";

function ResetPasswordForm({onResetPassword}) {
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [error,setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError('Mật khẩu xác nhận không khớp.');
      return;
        }
        if(password.length <6){
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
        }

        setError('');
        onResetPassword(password);
    }

    return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Tạo mật khẩu mới</h2>
      <p style={{ textAlign: 'center', marginBottom: '25px', color: '#666' }}>
        Vui lòng nhập mật khẩu mới cho tài khoản của bạn.
      </p>

      <div className="form-group">
        <label htmlFor="password">Mật khẩu mới:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Nhập mật khẩu mới"
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Nhập lại mật khẩu mới"
        />
      </div>
      
      {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <button type="submit" className="submit-btn">
        Đặt lại mật khẩu
      </button>
    </form>
  );
}

export default ResetPasswordForm;
