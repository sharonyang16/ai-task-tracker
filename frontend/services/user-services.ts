import api from "@/lib/axios-config";
import { DatabaseTask } from "@/types/tasks";

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

const getUserTasks = async (uuid: string): Promise<DatabaseTask[]> => {
  const res = await api.get(`${USERS_API_URL}/${uuid}/tasks`);

  if (res.status !== 200) {
    throw new Error("Error when fetching tasks");
  }

  return res.data;
};

export { signUp, login, logout, checkSession, getUserTasks };
