import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { router } from "expo-router";
import { User } from "../types";
import { loginUser } from "./api";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<void> => {
    const loggedInUser = await loginUser(username, password);
    setUser(loggedInUser);
  };

  const logout = () => {
    setUser(null);
    router.replace("/(auth)/login");
    // router.replace("/(auth)");
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      setUser,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
