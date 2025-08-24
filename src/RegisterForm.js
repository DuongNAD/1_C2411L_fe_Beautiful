import React, { use, useState } from "react";
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if(errors[name]){
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { full_name, birthday, gender, email, phone, password, confirmPassword } = formData;

    if (!full_name) newErrors.full_name = "Vui lòng nhập Họ và Tên.";
    if (!birthday) newErrors.birthday = "Vui lòng nhập Ngày sinh.";
    if (!gender) newErrors.gender = "Vui lòng chọn Giới tính.";
    if (!email) {
      newErrors.email = "Vui lòng nhập Email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!phone) newErrors.phone = "Vui lòng nhập Số điện thoại.";
    if (!password) newErrors.password = "Vui lòng nhập Mật khẩu.";
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (validateForm()) {
        return;
      }

      try {
      await changeRegister({
        full_name: formData.full_name,
        username: formData.email,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        birthday: formData.birthday,
      });
      onRegisterSuccess();
    } catch (error) {
      const serverError = error.response?.data?.errors || "Đăng ký không thành công. Vui lòng thử lại.";
      setErrors({ api: serverError });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Đăng Ký</h2>
      
      <div className="form-group">
        <label htmlFor="full_name">Họ và tên:</label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          value={formData.full_name}
          onChange={handleChange}
        />
        {errors.full_name && <p className="error-message">{errors.full_name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="birthday">Ngày sinh:</label>
        <input
          id="birthday"
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={handleChange}
        />
        {errors.birthday && <p className="error-message">{errors.birthday}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="gender">Giới tính:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Chọn giới tính</option>
          <option value="0">Nam</option>
          <option value="1">Nữ</option>
          <option value="2">Khác</option>
        </select>
        {errors.gender && <p className="error-message">{errors.gender}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Số điện thoại:</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Mật khẩu:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
      </div>
      
      {errors.api && <p className="error-message" style={{textAlign: 'center'}}>{errors.api}</p>}

      <button type="submit" className="submit-btn">
        Đăng ký
      </button>
    </form>
  );
}

export default RegisterForm;
