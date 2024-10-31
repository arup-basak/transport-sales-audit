import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
  baseURL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
