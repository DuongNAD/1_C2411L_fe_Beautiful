import React, { useState } from "react";
import { verifyAccout } from "./api/function";

function OtpForm({ onVerify }) {
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rs = await verifyAccout({ otp });
      onVerify(otp);
    } catch (error) {
      alert(error.response.data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Vui lòng nhập mã OTP của bạn</h2>
      <p style={{ textAlign: "center", marginBottom: "25px", color: "#666" }}>
        Mã OTP gồm 6 kí tự được gửi đến Gmail của bạn
      </p>

      <div className="form-group">
        <label htmlFor="otp">OTP Code</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit code"
          maxLength="6"
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Verify
      </button>
    </form>
  );
}

export default OtpForm;
