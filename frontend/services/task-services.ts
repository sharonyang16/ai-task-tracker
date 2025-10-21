import api from "@/lib/axios-config";
import { DatabaseTask } from "@/types/tasks";

const TASKS_API_URL = `${process.env.EXPO_PUBLIC_SERVER_URL}/tasks`;

const getTasksByUUID = async (uuid: string): Promise<DatabaseTask[]> => {
  const res = await api.get(`${TASKS_API_URL}/tasks/${uuid}`);

  if (res.status !== 200) {
    throw new Error("Error when fetching tasks");
  }

  return res.data;
};

export { getTasksByUUID };
