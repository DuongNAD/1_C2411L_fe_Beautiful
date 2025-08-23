import React, { useState } from "react";
import { changeRegister } from "./api/function";

function RegisterForm({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    full_name: "",
    birthday: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      full_name,
      birthday,
      gender,
      password,
      confirmPassword,
      email,
      phone,
    } = formData;

    if (!full_name) {
      alert("Vui lòng nhập Họ và Tên.");
      return;
    }
    if (!birthday) {
      alert("Vui lòng nhập Ngày sinh.");
      return;
    }
    if (!gender) {
      alert("Vui lòng chọn Giới tính.");
      return;
    }
    if (!email) {
      alert("Vui lòng nhập Email.");
      return;
    }
    if (!phone) {
      alert("Vui lòng nhập Số điện thoại.");
      return;
    }
    if (!password) {
      alert("Vui lòng nhập Mật khẩu.");
      return;
    }
    if (!confirmPassword) {
      alert("Vui lòng xác nhận Mật khẩu.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }
    try {
      const rs = await changeRegister({
        full_name,
        username: email,
        gender,
        phone,
        email,
        password,
        birthday,
      });
      onRegisterSuccess();
    } catch (error) {
        console.log(error);
      //   alert(error.response.data.errors);
      alert("loi");
    }

    // console.log("Dữ liệu form hợp lệ:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Regiser</h2>
      <div className="form-group">
        <label htmlFor="fullname">Họ và tên:</label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="birthday">Ngày sinh:</label>
        <input
          id="birthday"
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="gender">Giới tính:</label>
        <select
          id="gender"
          name="gender"
          type="text"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value={""}>Chọn giới tính</option>
          <option value="0">Nam</option>
          <option value="1">Nữ</option>
          <option value="2">Khác</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Số điện thoại:</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mật khẩu:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Đăng ký
      </button>
    </form>
  );
}

export default RegisterForm;
