import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchProfile, loginUser, registerUser } from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("textalchemy_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("textalchemy_token");

      if (!token) {
        setBooting(false);
        return;
      }

      try {
        const profile = await fetchProfile();
        setUser(profile);
        localStorage.setItem("textalchemy_user", JSON.stringify(profile));
      } catch {
        localStorage.removeItem("textalchemy_token");
        localStorage.removeItem("textalchemy_user");
        setUser(null);
      } finally {
        setBooting(false);
      }
    };

    restoreSession();
  }, []);

  const persistSession = (data) => {
    localStorage.setItem("textalchemy_token", data.token);
    localStorage.setItem("textalchemy_user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (payload) => {
    const data = await loginUser(payload);
    persistSession(data);
    return data;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    persistSession(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("textalchemy_token");
    localStorage.removeItem("textalchemy_user");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, booting, isAuthenticated: Boolean(user), login, register, logout }),
    [user, booting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
