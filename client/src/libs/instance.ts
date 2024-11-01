import axios from "axios";
import Cookies from "js-cookie";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export const nonSecuredInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
