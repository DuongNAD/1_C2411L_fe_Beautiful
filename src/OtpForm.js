import React, { useEffect, useState } from "react";
import { verifyAccout } from "./api/function";

function OtpForm({ onVerify }) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (timer <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rs = await verifyAccout({ otp });
      onVerify(otp);
    } catch (err) {
      setError(err.response?.data?.errors || "Mã OTP không hợp lệ.");
    }
  };


  const handleResendOtp = async () => {
    setError("");
    setIsResendDisabled(true);
    setTimer(300);

    try {
      await handleResendOtp();
      console.log("Đang gửi lại mã OTP...");
    }
    catch (err) {
      setError("Không thể gửi lại mã OTP. Vui lòng thử lại sau.");
      setIsResendDisabled(false);
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
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
          placeholder="Vui lòng nhập mã OTP gồn 6 số"
          maxLength="6"
          required
        />
      </div>

      {error && (
        <p className="error-message" style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>
          {error}
        </p>
      )}

      <button type="submit" className="submit-btn">
        Xác nhận
      </button>

      <div className="resend-container" style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
        {timer > 0 ? (
          <p>Gửi lại mã sau: {formatTime(timer)}</p>
        ) : (
          <p>Bạn không nhận được mã?</p>
        )}
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={isResendDisabled}
          className="toggle-link"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            textDecoration: "underline",
            color: isResendDisabled ? "#999" : "#007bff",
          }}
        >
          Gửi lại mã
        </button>
      </div>
    </form>
  );
}

export default OtpForm;

