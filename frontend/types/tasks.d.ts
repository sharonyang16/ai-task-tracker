export type DatabaseSubTask = {
  id: number;
  createdAt: Date;
  parentTaskId: number;
  title: string;
  description?: string;
  isComplete: boolean;
};

export type DatabaseTask = {
  id: number;
  createdAt: Date;
  title: string;
  description?: string;
  createdBy: string;
  subTasks: DatabaseSubTask[];
  isComplete: boolean;
  size: TASK_SIZE;
};

export type TASK_SIZE = "SMALL" | "MEDIUM" | "LARGE";
