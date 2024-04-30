import { createContext, useEffect, useState } from "react";
import axios from "axios";

// This context will store info about the user
export const AuthContext = createContext();

// children will be wrapped into this provider
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    const res = await axios.post(`http://localhost:8080/auth/login`, inputs);
    setCurrentUser(res.data);
    console.log(res.data);
    return res.data.role;
  };

  const logout = async (inputs) => {
    const res = await axios.post(`http://localhost:8080/auth/logout`);
    setCurrentUser(null);
  };

  // whenever currentUser is changed, local storage has to be updated
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
