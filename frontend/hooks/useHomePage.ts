import { useEffect, useState } from "react";
import { DatabaseTask, Task } from "@/types/tasks";
import { useAuthContext } from "@/context/auth-context";
import { getUserTasks } from "@/services/user-services";

const useHomePage = () => {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user !== null) {
        const res = await getUserTasks(user.id);
        const processedData: Task[] = res.map((dbTask: DatabaseTask) => ({
          ...dbTask,
          createdAt: new Date(dbTask.created_at),
          subTasks: dbTask.sub_tasks.map((subtask) => ({
            ...subtask,
            createdAt: new Date(subtask.created_at),
          })),
          createdBy: dbTask.created_by,
          isComplete: dbTask.is_complete,
        }));
        
        setTasks(processedData);
      }
    };

    fetchTasks();
  }, [user]);

  return {
    tasks,
  };
};

export default useHomePage;
