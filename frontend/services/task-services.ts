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

const updateTaskById = async (taskId: number, data: any) => {
  const res = await api.patch(`${TASKS_API_URL}/${taskId}`, data);
  if (res.status !== 200) {
    throw new Error("Error when updating task");
  }

  return res.data;
};

const deleteTaskById = async (taskId: number) => {
  const res = await api.delete(`${TASKS_API_URL}/${taskId}`);
  if (res.status !== 200) {
    throw new Error("Error when deleting task");
  }

  return res.data;
};

const getSubTaskRecommendations = async (taskId: number) => {
  const res = await api.get(`${TASKS_API_URL}/${taskId}/recommendations`);

  if (res.status !== 200) {
    throw new Error("Error when fetching subtask recommendations");
  }

  return res.data;
};

export {
  getTaskById,
  updateTaskById,
  deleteTaskById,
  getSubTaskRecommendations,
};
