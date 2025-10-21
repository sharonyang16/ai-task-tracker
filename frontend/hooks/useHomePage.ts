import { getTasksByUUID } from "@/services/task-services";
import { DatabaseTask } from "@/types/tasks";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth-context";

const useHomePage = () => {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState<DatabaseTask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user !== null) {
        const res = await getTasksByUUID(user.id);

        setTasks(res);
      }
    };

    fetchTasks();
  }, [user]);

  return {
    tasks,
  };
};

export default useHomePage;
