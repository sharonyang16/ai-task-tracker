import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SubTask, Task, UnaddedSubtask } from "@/types/tasks";
import {
  deleteTaskById,
  getSubTaskRecommendations,
  getTaskById,
  updateTaskById,
} from "@/services/task-services";

const useEditPage = (taskId: number) => {
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [size, setSize] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean | null>(null);
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [newSubTasks, setNewSubTasks] = useState<UnaddedSubtask[]>([]);
  const [recommendedSubTasks, setRecommendedSubTasks] = useState<
    UnaddedSubtask[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const router = useRouter();

  const fetchTask = async () => {
    setLoading(true);
    console.log(taskId);
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

  useEffect(() => {
    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (task) {
        try {
          setLoading(true);
          const res: UnaddedSubtask[] = await getSubTaskRecommendations(
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

  const handleAddSubTask = async (subtask: UnaddedSubtask) => {
    setNewSubTasks((prev) => [subtask, ...prev]);
    setRecommendedSubTasks((prev) => prev.filter((s) => s !== subtask));
  };

  const handleSubtaskChange = (
    index: number,
    field: string,
    value: string,
    isNew: boolean
  ) => {
    if (isNew) {
      setNewSubTasks((prev) =>
        prev.map((subtask, i) => {
          if (i === index) {
            return { ...subtask, [field]: value };
          }
          return subtask;
        })
      );
    } else {
      setSubTasks((prev) =>
        prev.map((subtask, i) => {
          if (i === index) {
            return { ...subtask, [field]: value };
          }
          return subtask;
        })
      );
    }
  };

  const handleSubtaskDelete = (index: number, isNew: boolean) => {
    if (isNew) {
      setNewSubTasks((prev) => prev.filter((_, i) => i !== index));
    } else {
      setSubTasks((prev) => prev.filter((_, i) => i !== index));
    }
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
    handleSubtaskChange,
    handleSubtaskDelete,
    handleAddSubTask,
    newSubTasks,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  };
};

export default useEditPage;
