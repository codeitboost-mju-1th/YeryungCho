import { createContext, useContext, useEffect, useState } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  user: null,
  isPending: false,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
});

export function AuthProvider({ children }) {
  const [values, setValues] = useState({
    user: null,
    isPending: true,
  });

  async function getMe() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));
    let nextUser;
    try {
      const res = await axios.get("/users/me");
      nextUser = res.data;
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login({ email, password }) {
    await axios.post("/auth/login", { email, password });
    await getMe();
  }

  async function logout() {
    await axios.delete("/auth/logout");
    setValues((prevValues) => ({
      ...prevValues,
      user: null,
    }));
  }

  async function updateMe(formData) {
    const res = await axios.patch("/users/me", formData);
    const nextUser = res.data;
    setValues((prevValues) => ({
      ...prevValues,
      user: nextUser,
    }));
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        logout,
        updateMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 함");
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      navigate("/login");
    }
  }, [context.user, context.isPending, navigate, required]);

  return context;
}
