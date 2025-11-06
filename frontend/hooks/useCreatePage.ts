import { useState } from "react";
import { useRouter } from "expo-router";
import { createTask } from "@/services/task-services";
import { useAuthContext } from "@/context/auth-context";
import { UnaddedSubtask } from "@/types/tasks";

const useCreatePage = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string | null>(null);
  const [size, setSize] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [subtasks, setSubTasks] = useState<UnaddedSubtask[]>([]);

  const router = useRouter();
  const { user } = useAuthContext();

  const handleCreate = async () => {
    setErrorMessage("");
    if (!title || !size) {
      setErrorMessage("Title and size are required!");
      return;
    }

    setLoading(true);

    try {
      await createTask({
        title,
        description,
        creator: user?.id,
        size,
      });
      setLoading(false);
      router.back();
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
    setTitle("");
    setDescription(null);
    setSize("");
    setErrorMessage("");
  };

  const handleAddSubtask = () => {
    setSubTasks((prev) => [...prev, { title: "", description: "" }]);
  };

  const handleRemoveSubtask = (index: number) => {
    setSubTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubtaskChange = (index: number, field: string, value: string) => {
    setSubTasks((prev) =>
      prev.map((subtask, i) => {
        if (i === index) {
          return { ...subtask, [field]: value };
        }
        return subtask;
      })
    );
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    size,
    setSize,
    subtasks,
    handleAddSubtask,
    handleSubtaskChange,
    handleRemoveSubtask,
    errorMessage,
    loading,
    handleCreate,
    handleGoBack,
  };
};

export default useCreatePage;
