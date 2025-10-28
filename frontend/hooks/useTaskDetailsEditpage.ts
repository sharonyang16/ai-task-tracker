import { updateTaskById } from "@/services/task-services";
import { useState } from "react";
import { Task } from "@/types/tasks";

const useTasksDetailsEditPage = (task: Task) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [size, setSize] = useState(task.size);
  const [isComplete, setIsComplete] = useState(task.isComplete);

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
        isComplete,
      });
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
    handleSave,
  };
};

export default useTasksDetailsEditPage;
