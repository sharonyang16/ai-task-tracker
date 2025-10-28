import React from "react";
import { Stack } from "expo-router";
import useTasksDetailsPage from "@/hooks/useTaskDetailsPage";
import { useTaskDetailContext } from "@/context/task-detail-context";

type NavigatorProps = {
  taskId: number;
};
export default function Navigator({ taskId }: NavigatorProps) {
  useTasksDetailsPage(taskId);
  const { isEditing } = useTaskDetailContext();

  return (
    <Stack>
      <Stack.Protected guard={!isEditing}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isEditing}>
        <Stack.Screen name="edit" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
