import { useContext } from "react";
import { AuthContext, type AuthContextValue } from "./authProvider.tsx";

// A thin accessor: all state and logic live in <AuthProvider>, so every
// component that calls useAuth() sees the same user.
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return context;
}
