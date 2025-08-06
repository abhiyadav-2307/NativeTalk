import axios from "axios";

const Base_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

export const axiosInstance = axios.create({
  baseURL: Base_URL,
  withCredentials: true, // This allows cookies to be sent with requests
});