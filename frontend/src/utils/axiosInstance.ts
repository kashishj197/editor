import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5135/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (optional)
axiosInstance.interceptors.request.use((config) => {
  // e.g., attach auth token if needed
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
