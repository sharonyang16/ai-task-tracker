import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useAuthContext } from "@/context/auth-context";
import { signUp, login, logout, checkSession } from "@/services/user-services";
import useSecureStorage from "@/lib/secure-storage/secure-storage";

const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(true);

  const { saveSession, getSessionTokens, deleteSession } = useSecureStorage();

  const { setUser, session, setSession } = useAuthContext();

  useEffect(() => {
    const attemptSignIn = async () => {
      const { access } = await getSessionTokens();
      if (typeof access === "string") {
        try {
          const {
            data: { user },
          } = await checkSession(access);
          setUser(user);
        } catch (e) {
          if (e instanceof AxiosError) {
            deleteSession();
          }
        }
      }
    };

    attemptSignIn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      if (staySignedIn) saveSession(session);
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

      if (staySignedIn) saveSession(session);
    } catch (e) {
      if (e instanceof AxiosError) setErrorMessage(e.response?.data.message);
    }

    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { access: local_token } = await getSessionTokens();
      const token = session?.access_token ?? local_token;
      await logout(token || "");
    } catch {
      // do nothing
    }
    await deleteSession();
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
    staySignedIn,
    setStaySignedIn,
  };
};

export default useAuth;
