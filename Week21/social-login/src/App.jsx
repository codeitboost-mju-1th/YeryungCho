import React from "react";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./components/UserProfile";

function App() {
  const { isLoggedIn } = useAuth();

  return <div>{isLoggedIn ? <UserProfile /> : <LoginPage />}</div>;
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
