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

export async function getUserFriends() {
  try {
    const res = await axiosInstance.get("/users/friends");
    return res.data;
  } catch (error) {
    console.error("Error fetching user friends:", error);
    throw error;
  }
}

export async function getRecommendedUsers() {
  try {
    const res = await axiosInstance.get("/users");
    return res.data;
  } catch (error) {
    console.error("Error fetching recommended users:", error);
    throw error;
  }
}

export async function getOutgoingFriendReqs() {
  try {
    const res = await axiosInstance.get("/users/outgoing-friend-requests");
    return res.data;
  } catch (error) {
    console.error("Error fetching outgoing friend requests:", error);
    throw error;
  }
}

export async function sendFriendRequest(userId) {
  try {
    const res = await axiosInstance.post(`/users/friend-request/${userId}`);
    //console.log("userId", userId);
    return res.data;
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
}
