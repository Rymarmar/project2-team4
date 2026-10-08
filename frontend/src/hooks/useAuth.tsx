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

interface AuthContextValue {
  user: User | null;
  login: (username: string, password: string) => Promise<AuthResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value: AuthContextValue = {
    user,
    login: async () => {
      setUser(FAKE_USER)
      return { ok: true, error: null }
    },
    logout: () => setUser(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}