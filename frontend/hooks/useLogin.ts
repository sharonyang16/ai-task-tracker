import { useState } from "react";
import { supabase } from "@/lib/supabase";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) setErrorMessage(error.message);

    setLoading(false);
  };
  const signUpWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({ email: email, password: password });

    if (error) setErrorMessage(error.message);

    if (!session) setInfoMessage("Check your inbox for email verification");

    setLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errorMessage,
    infoMessage,
    signUpWithEmail,
    signInWithEmail,
  };
};

export default useLogin;
