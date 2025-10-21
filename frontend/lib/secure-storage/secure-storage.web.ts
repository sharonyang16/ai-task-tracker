import secureLocalStorage from "react-secure-storage";
import { Session } from "@supabase/supabase-js";

const useSecureStorage = () => {
  const saveSession = async (session: Session) => {
    secureLocalStorage.setItem("access", session.access_token);
    secureLocalStorage.setItem("refresh", session.refresh_token);
  };

  const getSessionTokens = async () => {
    const access = secureLocalStorage.getItem("access");
    const refresh = secureLocalStorage.getItem("refresh");

    return { access, refresh };
  };

  const deleteSession = async () => {
    secureLocalStorage.removeItem("access");
    secureLocalStorage.removeItem("refresh");
  };

  return { saveSession, getSessionTokens, deleteSession };
};

export default useSecureStorage;
