import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useSegments, useRouter, router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  setSession: (session: Session | undefined) => void;
  session: Session | undefined;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

function useProtectedRoute(user: any) {
  const segments = useSegments();

  useEffect(() => {
    console.log("protected route check ");
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/Register");
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
  const [user, setUser] = useState<User | undefined>(undefined);
  const [session, setSession] = useState<Session | undefined>(undefined);

  useProtectedRoute(user);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(undefined);
    setSession(undefined);
  };

  const authContext: AuthType = {
    user,
    setUser,
    session,
    signOut,
    setSession,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
