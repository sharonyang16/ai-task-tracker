import {
  deleteTaskById,
  getSubTaskRecommendations,
  updateTaskById,
} from "@/services/task-services";
import { useEffect, useState } from "react";
import { Task } from "@/types/tasks";
import { useRouter } from "expo-router";
import { useTaskDetailContext } from "@/context/task-detail-context";

type UnAddedSubtask = {
  title: string;
  description: string;
};
const useTasksDetailsEditPage = (task: Task) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [size, setSize] = useState(task.size);
  const [isComplete, setIsComplete] = useState(task.isComplete);
  const [newSubTasks, setNewSubTasks] = useState<UnAddedSubtask[]>([]);
  const [recommendedSubTasks, setRecommendedSubTasks] = useState<
    UnAddedSubtask[]
  >([]);
  const router = useRouter();
  const { setIsLoading } = useTaskDetailContext();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        const res: UnAddedSubtask[] = await getSubTaskRecommendations(task.id);
        setRecommendedSubTasks(res);
        setIsLoading(false);
      } catch {
        setRecommendedSubTasks([]);
      }
    };
    if (task.size !== "SMALL") {
      fetchRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
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
    }
  };

  const handleAddSubTask = async (subtask: UnAddedSubtask) => {
    setNewSubTasks((prev) => [subtask, ...prev]);
  };

  const handleDelete = async () => {
    try {
      await deleteTaskById(task.id);
      router.push("/tasks");
    } catch (error) {
      console.error(error);
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
    recommendedSubTasks,
    handleSave,
    handleDelete,
    handleAddSubTask,
    newSubTasks,
  };
};

export default useTasksDetailsEditPage;
