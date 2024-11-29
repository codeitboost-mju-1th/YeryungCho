import React from "react";
import { useAuth } from "./AuthProvider";

export default function UserProfile() {
  const { user, isLoggedIn, handleGoogleLogin } = useAuth();

  return (
    <div>
      <h2>유저 프로필</h2>
      {isLoggedIn ? (
        <p>이름: {user.name || user.properties.nickname}</p>
      ) : (
        <button onClick={handleGoogleLogin}>구글로 로그인</button>
      )}
    </div>
  );
}
