import { useEffect, useState } from "react";
import { DatabaseTask, Task } from "@/types/tasks";
import { useAuthContext } from "@/context/auth-context";
import { getUserTasks } from "@/services/user-services";
import { updateTaskById, updateSubTaskById } from "@/services/task-services";

const useHomePage = () => {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user !== null) {
        setIsLoading(true);
        const res = await getUserTasks(user.id);
        const processedData: Task[] = res.map((dbTask: DatabaseTask) => ({
          ...dbTask,
          createdAt: new Date(dbTask.created_at),
          subTasks: dbTask.sub_tasks.map((subtask) => ({
            ...subtask,
            createdAt: new Date(subtask.created_at),
            parentTaskId: subtask.parent_task_id,
            isComplete: subtask.is_complete,
          })),
          createdBy: dbTask.created_by,
          isComplete: dbTask.is_complete,
        }));

        setTasks(processedData);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const handleTaskCheckboxPress = async (taskId: number, value: boolean) => {
    try {
      await updateTaskById(taskId, {
        is_complete: value,
      });

      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === taskId) {
            return { ...task, isComplete: value };
          }
          return task;
        })
      );
    } catch {
      // do nothing
    }
  };

  const handleSubTaskCheckboxPress = async (
    parentTaskId: number,
    taskId: number,
    value: boolean
  ) => {
    try {
      await updateSubTaskById(taskId, {
        is_complete: value,
      });

      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === parentTaskId) {
            return {
              ...task,
              subTasks: task.subTasks.map((subtask) => {
                if (subtask.id === taskId) {
                  return { ...subtask, isComplete: value };
                }
                return subtask;
              }),
            };
          }
          return task;
        })
      );
    } catch {
      // do nothing
    }
  };

  return {
    tasks,
    isLoading,
    handleTaskCheckboxPress,
    handleSubTaskCheckboxPress,
  };
};

export default useHomePage;
