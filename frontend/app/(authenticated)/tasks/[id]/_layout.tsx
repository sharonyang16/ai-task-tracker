import React from "react";
import { TaskDetailProvider } from "@/context/task-detail-context";
import Navigator from "./navigator";
import { useLocalSearchParams } from "expo-router";

export default function RootLayout() {
  const localId = useLocalSearchParams().id;
  const taskId = Number(localId);
  return (
    <TaskDetailProvider>
      <Navigator taskId={taskId} />
    </TaskDetailProvider>
  );
}
