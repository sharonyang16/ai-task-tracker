import api from "@/lib/axios-config";
import { DatabaseTask } from "@/types/tasks";

const TASKS_API_URL = `${process.env.EXPO_PUBLIC_SERVER_URL}/tasks`;

const getTaskById = async (taskId: number): Promise<DatabaseTask> => {
  const res = await api.get(`${TASKS_API_URL}/${taskId}`);

  if (res.status !== 200) {
    throw new Error("Error when fetching task");
  }

  return res.data;
};

export { getTaskById };
