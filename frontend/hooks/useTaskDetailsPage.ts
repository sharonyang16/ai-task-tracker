import { getTaskById } from "@/services/task-services";
import { useEffect } from "react";
import { Task } from "@/types/tasks";
import { useTaskDetailContext } from "@/context/task-detail-context";

const useTasksDetailsPage = (taskId: number) => {
  const { setTask, isEditing, setIsLoading } = useTaskDetailContext();

  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);
};

export default useTasksDetailsPage;
