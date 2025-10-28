import { useTaskDetailContext } from "@/context/task-detail-context";
import React from "react";
import { Button, Text, View } from "react-native";

export default function TaskDetails() {
  const { task, setIsEditing } = useTaskDetailContext();
  if (task === null) {
    return (
      <View>
        <Text>Task not found</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <Button
        title="Edit"
        onPress={() => {
          setIsEditing(true);
        }}
      />
    </View>
  );
}
