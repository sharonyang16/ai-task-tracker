import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthContext } from "@/context/auth-context";
import { signUp, login, logout } from "@/services/user-services";

const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const { setUser } = useAuthContext();

  const handleSignUp = async () => {
    setErrorMessage("");
    setInfoMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    setLoading(true);

    try {
      const {
        data: { user },
      } = await signUp(email, password);
      setUser(user);
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }

    setLoading(false);
  };

  const handleLogin = async () => {

  }

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
    handleSignUp,
    handleLogin,
    signOut,
  };
};

export default useAuth;
