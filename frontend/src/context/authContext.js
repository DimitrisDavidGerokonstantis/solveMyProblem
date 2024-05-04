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

  const googleLogin = async (googleToken) => {
    const res = await axios.post(
      "http://localhost:8080/googleAuth/loginByGoogleToken",
      {
        googleToken: googleToken,
      }
    );
    let user = res.data;
    let myuser = {};
    myuser.id = user._id;
    myuser.role = user.role;
    myuser.username = user.username;
    setCurrentUser(myuser);
    console.log("GOOGLE USER", res.data);
    return res.data;
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
    <AuthContext.Provider value={{ currentUser, googleLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
