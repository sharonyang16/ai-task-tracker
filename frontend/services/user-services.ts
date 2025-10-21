import api from "@/lib/axios-config";

const USERS_API_URL = `${process.env.EXPO_PUBLIC_SERVER_URL}/users`;

const signUp = async (username: string, password: string) => {
  const res = await api.post(`${USERS_API_URL}/signup`, {
    username,
    password,
  });

  return res;
};

const login = async (username: string, password: string) => {
  const res = await api.post(`${USERS_API_URL}/login`, {
    username: username,
    password: password,
  });

  return res;
};

const logout = async (bearerToken: string) => {
  const res = await api.post(
    `${USERS_API_URL}/logout`,
    {},
    {
      headers: {
        Authorization: bearerToken,
      },
    }
  );

  return res;
};

const checkSession = async (bearerToken: string) => {
  const res = await api.get(`${USERS_API_URL}/check-session`, {
    headers: {
      Authorization: bearerToken,
    },
  });

  return res;
};

export { signUp, login, logout, checkSession };
