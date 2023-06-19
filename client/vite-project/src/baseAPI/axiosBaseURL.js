import axios from "axios";

const BASE_URL = "http://localhost:5000/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

export default axiosInstance;
