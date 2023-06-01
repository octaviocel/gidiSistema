import { useState } from "react";
import SecureLS from "secure-ls";
import { createContext, ReactElement, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../utils/Toats";

export const AuthContext = createContext();

const ls = new SecureLS({ encodingType: "aes" });

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (user, token) => {
    ls.set("currentUser", JSON.stringify(user));
    ls.set("_token", JSON.stringify(token));
    setCurrentUser(user);
    notifySuccess(`Bienvenido ${user.firstName}`);
  };

  const logout = async () => {
    ls.removeAll();
    setCurrentUser(null);
  };

  const checkUser = async () => {
    const current = await ls.get("currentUser");
    //console.log(current)
    if (current) setCurrentUser(JSON.parse(current));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
