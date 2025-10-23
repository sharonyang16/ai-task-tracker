import { useEffect, useState } from "react";
import { DatabaseTask } from "@/types/tasks";
import { useAuthContext } from "@/context/auth-context";
import { getUserTasks } from "@/services/user-services";

const useHomePage = () => {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState<DatabaseTask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user !== null) {
        const res = await getUserTasks(user.id);

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
