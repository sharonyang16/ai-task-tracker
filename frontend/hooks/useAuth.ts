import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthContext } from "@/context/auth-context";

const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const { setUser } = useAuthContext();

  useEffect(() => {
    console.log("happeneing")
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, [setUser]);

  const signInWithEmail = async () => {
    setErrorMessage("");
    setInfoMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) setErrorMessage(error.message);

    setLoading(false);
  };

  const signUpWithEmail = async () => {
    setErrorMessage("");
    setInfoMessage("");
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({ email: email, password: password });

    if (error) setErrorMessage(error.message);

    if (!session) setInfoMessage("Check your inbox for email verification");

    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) setErrorMessage(error.message);
    setLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    errorMessage,
    infoMessage,
    signUpWithEmail,
    signInWithEmail,
    signOut,
  };
};

export default useAuth;
