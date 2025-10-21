import { Session } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";

const useSecureStorage = () => {
  const saveSession = async (session: Session) => {
    await SecureStore.setItemAsync("access", session.access_token);
    await SecureStore.setItemAsync("refresh", session.refresh_token);
  };

  const getSessionTokens = async () => {
    const access = await SecureStore.getItemAsync("access");
    const refresh = await SecureStore.getItemAsync("refresh");

    return { access, refresh };
  };

  const deleteSession = async () => {
    await SecureStore.deleteItemAsync("access");
    await SecureStore.deleteItemAsync("refresh");
  };

  return { saveSession, getSessionTokens, deleteSession };
};

export default useSecureStorage;
