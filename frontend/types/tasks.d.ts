export type DatabaseSubTask = {
  id: number;
  created_at: Date;
  parent_task_id: number;
  title: string;
  description?: string;
  is_complete: boolean;
};

export type DatabaseTask = {
  id: number;
  created_at: Date;
  title: string;
  description?: string;
  created_by: string;
  sub_tasks: DatabaseSubTask[];
  is_complete: boolean;
  size: TASK_SIZE;
};

export type SubTask = {
  id: number;
  createdAt: Date;
  parentTaskId: number;
  title: string;
  description?: string;
  isComplete: boolean;
};

export type Task = {
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
