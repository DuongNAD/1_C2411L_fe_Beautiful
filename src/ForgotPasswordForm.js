import React, { useState } from 'react';

function ForgotPasswordForm({ onResetPassword, onBackToLogin }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onResetPassword(email);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Reset Password</h2>
      <p style={{ textAlign: 'center', marginBottom: '25px', color: '#666' }}>
        Enter your email to receive instructions on how to reset your password.
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
        Send Reset Link
      </button>
      
      <button type="button" onClick={onBackToLogin} className="toggle-link">
        &larr; Back to Login
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
