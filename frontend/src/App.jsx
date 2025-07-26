import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import OnboardingPage from "./Pages/OnboardingPage";
import CallPage from "./Pages/CallPage.jsx";
import NotificationPage from "./Pages/NotificationsPage.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "./lib/axios.js";

const App = () => {

  // Fetch the authenticated user
  const { data:authData, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance("/auth/me");
      return res.data;
    },
    retry: false,
  });
  const authUser = authData?.user;


  return (
    <div data-theme="dim">
      <Routes>
        <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/onboarding" element={authUser ? <OnboardingPage /> : <Navigate to="/login"/>} />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login"/>} />
        <Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to="/login"/>} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login"/>} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
