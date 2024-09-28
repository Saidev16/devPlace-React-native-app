import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useSegments, useRouter, router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  name: string;
};

type AuthType = {
  user: User | null;
  setUser: (user: User | null) => void;
  session: Session | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

function useProtectedRoute(user: any) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/Login");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/(tabs)");
    }
  }, [user, segments]);
}

export function AuthProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useProtectedRoute(user);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const authContext: AuthType = {
    user,
    setUser,
    session,
    signOut,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
