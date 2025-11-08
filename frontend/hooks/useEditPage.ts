import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { SubTask, Task, UnaddedSubtask } from "@/types/tasks";
import {
  deleteSubtaskById,
  deleteTaskById,
  getSubTaskRecommendations,
  getTaskById,
  updateSubTaskById,
  updateTaskById,
  createSubTaskForTask,
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

  const setDefaultValues = () => {
    setTask(null);
    setTitle("");
    setDescription("");
    setSize("");
    setIsComplete(null);
    setSubTasks([]);
    setNewSubTasks([]);
    setRecommendedSubTasks([]);
  };

  const fetchRecommendations = async () => {
    if (task) {
      try {
        setLoading(true);
        const res: UnaddedSubtask[] = await getSubTaskRecommendations(task.id);
        setRecommendedSubTasks(res);
        setLoading(false);
      } catch {
        setRecommendedSubTasks([]);
        setLoading(false);
      }
    }
  };

  const fetchTask = async () => {
    setDefaultValues();
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

    if (processedData.size !== "SMALL") {
      fetchRecommendations();
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  useFocusEffect(
    useCallback(() => {
      fetchTask();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskId])
  );

  const handleSave = async () => {
    if (task) {
      // update parent task
      await updateTaskById(task.id, {
        title,
        description,
        size,
        is_complete: isComplete,
      });

      // update existing subtasks
      await Promise.all(
        subTasks.map((subtask) =>
          updateSubTaskById(subtask.id, {
            title: subtask.title,
            description: subtask.description,
            is_complete: subtask.isComplete,
          })
        )
      );

      // delete existing deleted subtasks
      await Promise.all(
        task.subTasks
          .filter((originalSubtask) =>
            subTasks.every((newSubtask) => originalSubtask.id !== newSubtask.id)
          )
          .map((subtask) => deleteSubtaskById(subtask.id))
      );

      // create new subtasks
      await Promise.all(
        newSubTasks
          .filter((subtask) => subtask.title)
          .map((subtask) =>
            createSubTaskForTask(task.id, {
              title: subtask.title,
              description: subtask.description,
            })
          )
      );

      router.push("/tasks");
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
