import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SubTask, Task } from "@/types/tasks";
import {
  deleteTaskById,
  getSubTaskRecommendations,
  getTaskById,
  updateTaskById,
} from "@/services/task-services";

type UnAddedSubtask = {
  title: string;
  description: string;
};
const useEditPage = (taskId: number) => {
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [size, setSize] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean | null>(null);
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [newSubTasks, setNewSubTasks] = useState<UnAddedSubtask[]>([]);
  const [recommendedSubTasks, setRecommendedSubTasks] = useState<
    UnAddedSubtask[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      const res = await getTaskById(taskId);

      const processedData: Task = {
        ...res,
        createdAt: new Date(res.created_at),
        subTasks: res.sub_tasks.map((subtask) => ({
          ...subtask,
          createdAt: new Date(subtask.created_at),
          parentTaskId: subtask.parent_task_id,
          isComplete: subtask.is_complete,
        })),
        createdBy: res.created_by,
        isComplete: res.is_complete,
      };

      setTask(processedData);
      setTitle(processedData.title);
      setDescription(processedData.description || "");
      setSize(processedData.size);
      setIsComplete(processedData.isComplete);
      setSubTasks(processedData.subTasks);

      setLoading(false);
    };

    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (task) {
        try {
          setLoading(true);
          const res: UnAddedSubtask[] = await getSubTaskRecommendations(
            task.id
          );
          setRecommendedSubTasks(res);
          setLoading(false);
        } catch {
          setRecommendedSubTasks([]);
          setLoading(false);
        }
      }
    };

    if (task && task.size !== "SMALL") {
      fetchRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  const handleSave = async () => {
    if (task) {
      if (
        title !== task.title ||
        description !== task.description ||
        size !== task.size ||
        isComplete !== task.isComplete
      ) {
        await updateTaskById(task.id, {
          title,
          description,
          size,
          is_complete: isComplete,
        });
        router.push("/tasks");
      }
    }
  };

  const handleAddSubTask = async (subtask: UnAddedSubtask) => {
    setNewSubTasks((prev) => [subtask, ...prev]);
    setRecommendedSubTasks((prev) => prev.filter((s) => s !== subtask));
  };

  const handleDelete = async () => {
    if (task) {
      try {
        setLoading(true);
        setShowDeleteConfirmation(false);
        await deleteTaskById(task.id);
        setLoading(false);
        router.push("/tasks");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    size,
    setSize,
    isComplete,
    setIsComplete,
    subTasks,
    recommendedSubTasks,
    loading,
    handleSave,
    handleDelete,
    handleAddSubTask,
    newSubTasks,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  };
};

export default useEditPage;
