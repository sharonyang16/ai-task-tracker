import { Task } from "@/types/tasks";
import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type TaskDetailContextType = {
  task: Task | null;
  setTask: Dispatch<SetStateAction<Task | null>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const TaskDetailContext = createContext<TaskDetailContextType | undefined>(
  undefined
);

function useTaskDetailContext(): TaskDetailContextType {
  const context = useContext(TaskDetailContext);
  if (!context) {
    throw new Error(
      "useTaskDetailContext must be used within an TaskDetailProvider"
    );
  }
  return context;
}

const TaskDetailProvider = (props: { children: ReactNode }): ReactElement => {
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TaskDetailContext.Provider
      {...props}
      value={{
        task,
        setTask,
        isEditing,
        setIsEditing,
        isLoading,
        setIsLoading,
      }}
    />
  );
};

export { TaskDetailProvider, useTaskDetailContext };
