import React, { useEffect } from "react";
import { useAuth } from "../components/AuthProvider";

const GOOGLE_CLIENT_ID =
  "266787898619-gra6mtvc723pr8qsh65dkc8eb77leh7d.apps.googleusercontent.com";
const KAKAO_CLIENT_ID = "4e29302e7f2966d4ed94fd1fc34ad78b";
const REDIRECT_URI = "https://social-login-yeryungchos-projects.vercel.app/"; // 배포 시 수정 필요

const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=openid%20profile`;
const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function handleGoogleLogin() {
  window.location.href = googleAuthUrl;
}

function handleKakaoLogin() {
  window.location.href = kakaoAuthUrl;
}

export default function LoginPage() {
  const { setUser, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1)); // 해시 파라미터 사용
    const urlParams = new URLSearchParams(window.location.search); // URL 파라미터 사용

    // 구글 액세스 토큰 추출
    const googleAccessToken = hashParams.get("access_token");

    // 카카오 액세스 토큰 추출
    const kakaoAuthCode = urlParams.get("code");

    if (googleAccessToken) {
      fetchUserProfile(googleAccessToken, "google");
    } else if (kakaoAuthCode) {
      fetchKakaoAccessToken(kakaoAuthCode)
        .then((token) => {
          fetchUserProfile(token, "kakao");
        })
        .catch((error) => {
          console.error("카카오 액세스 토큰 가져오기 실패:", error);
        });
    } else {
      console.error("Access Token이나 code가 누락되었습니다.");
    }
  }, []);

  // 카카오로 액세스 토큰 요청하는 함수
  async function fetchKakaoAccessToken(code) {
    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: KAKAO_CLIENT_ID, // 카카오에서 발급받은 클라이언트 ID
        redirect_uri: REDIRECT_URI, // 리다이렉트 URI
        code: code, // URL 파라미터로 받은 code
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      return data.access_token;
    } else {
      throw new Error("Access Token을 가져오지 못했습니다.");
    }
  }

  async function fetchUserProfile(token, provider) {
    try {
      let response;
      if (provider === "google") {
        // Google 사용자 정보 API 호출
        response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`
        );
      } else {
        // Kakao 사용자 정보 API 호출
        response = await fetch(`https://kapi.kakao.com/v2/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      const userData = await response.json();
      console.log("유저 데이터:", userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("사용자 정보 요청 실패:", error);
    }
  }

  return (
    <div>
      <h1>소셜 로그인</h1>
      <button onClick={handleGoogleLogin}>구글로 로그인</button>
      <button onClick={handleKakaoLogin}>카카오로 로그인</button>
    </div>
  );
}
