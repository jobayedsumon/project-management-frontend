import axios from "axios";
import { logout } from "../features/auth/authSlice";

const defaultOptions = {
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      logout();
    }
    return Promise.reject(error.response.data);
  }
);

export default instance;
