import { useState } from "react";
import { AxiosError } from "axios";
import { useAuthContext } from "@/context/auth-context";
import { signUp, login, logout } from "@/services/user-services";

const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const { setUser, session, setSession } = useAuthContext();

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
        data: { user, session },
      } = await signUp(email, password);
      setUser(user);
      setSession(session);
    } catch (e) {
      if (e instanceof AxiosError) setErrorMessage(e.response?.data.message);
    }

    setLoading(false);
  };

  const handleLogin = async () => {
    setErrorMessage("");
    setInfoMessage("");

    setLoading(true);

    try {
      const {
        data: { user, session },
      } = await login(email, password);
      setUser(user);
      setSession(session);
    } catch (e) {
      if (e instanceof AxiosError) setErrorMessage(e.response?.data.message);
    }

    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await logout(session?.access_token || "");
    } catch {
      // do nothing
    }

    setUser(null);
    setSession(null);
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
