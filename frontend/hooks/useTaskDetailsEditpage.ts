import {
  deleteTaskById,
  getSubTaskRecommendations,
  updateTaskById,
} from "@/services/task-services";
import { useEffect, useState } from "react";
import { Task } from "@/types/tasks";
import { useRouter } from "expo-router";

type SubtaskRecommendation = {
  title: string;
  description: string;
};
const useTasksDetailsEditPage = (task: Task) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [size, setSize] = useState(task.size);
  const [isComplete, setIsComplete] = useState(task.isComplete);
  const [recommendedSubTasks, setRecommendedSubTasks] = useState<
    SubtaskRecommendation[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res: SubtaskRecommendation[] = await getSubTaskRecommendations(
          task.id
        );

        setRecommendedSubTasks(res);
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
  };
};

export default useTasksDetailsEditPage;
