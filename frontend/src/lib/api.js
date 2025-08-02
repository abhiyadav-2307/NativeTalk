import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  try {
    const res = await axiosInstance.post("/auth/signup", signupData);
    return res.data;
  } catch (error) {
    console.error("Error in signup:", error);
    throw error;
  }
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  try {
    const res = await axiosInstance.post("/auth/onboarding", userData);
    return res.data;
  } catch (error) {
    console.error("Error completing onboarding:", error);
    throw error;
  }
};

export const login = async (loginData) => {
  try {
    const res = await axiosInstance.post("/auth/login", loginData);
    return res.data;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.error("Error in logout:", error);
    throw error;
  }
};
