import { useRouter } from "expo-router";
import { useState } from "react";
import { createTask } from "@/services/task-services";
import { useAuthContext } from "@/context/auth-context";

const useCreatePage = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string | null>(null);
  const [size, setSize] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
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

  return {
    title,
    setTitle,
    description,
    setDescription,
    size,
    setSize,
    errorMessage,
    loading,
    handleCreate,
    handleGoBack,
  };
};

export default useCreatePage;
