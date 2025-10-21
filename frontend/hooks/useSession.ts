import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useAuth } from "@/context/auth-context";

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { setUser } = useAuth();
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    setUser(session?.user ?? null);
  }, []);

  return { session };
};

export default useSession;
