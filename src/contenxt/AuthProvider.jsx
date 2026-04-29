import { useState } from "react";
import AuthContext from "./AuthContext";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("authUser");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (username, password) => {
    if (username === "admin" && password === "admin123") {
      const userData = { username, role: "admin" };
      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));
      return { success: true };
    }

    if (username === "staff" && password === "staff123") {
      const userData = { username, role: "staff" };
      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};