import api from "./api";

export const login = (data) => api.post("login-account", data);
export const changeRegister = (data) => api.post("account/change-otp" , data);
export const verifyAccout = (data) => api.post("account/verify-account", data);
