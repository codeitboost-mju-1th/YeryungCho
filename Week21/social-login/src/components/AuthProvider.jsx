import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();
const GOOGLE_CLIENT_ID =
  "266787898619-gra6mtvc723pr8qsh65dkc8eb77leh7d.apps.googleusercontent.com";
const REDIRECT_URI =
  "https://social-login-glndk2xfp-yeryungchos-projects.vercel.app"; // 배포 시 수정 필요

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=openid%20profile`;
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, setUser, setIsLoggedIn, handleGoogleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}