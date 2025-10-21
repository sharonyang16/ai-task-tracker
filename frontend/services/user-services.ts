import api from "@/lib/axios-config";

const USERS_API_URL = `${process.env.EXPO_PUBLIC_SERVER_URL}/users`;

const signUp = async (username: string, password: string) => {
  const res = await api.post(`${USERS_API_URL}/signup`, {
    username: username,
    password: password,
  });

  return res.data;
};

const login = async (username: string, password: string) => {
  const res = await api.post(`${USERS_API_URL}/login`, {
    username: username,
    password: password,
  });

  return res.data;
};

const logout = async (bearerToken: string) => {
  const res = await api.post(`${USERS_API_URL}/logout`, {
    headers: {
      Authorization: bearerToken,
    },
  });

  return res.data;
};

export { signUp, login, logout };
