import { useTaskDetailContext } from "@/context/task-detail-context";
import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function TaskDetailsEdit() {
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
      <TextInput value={task.title} />
      <Text>{task.description}</Text>
      <Button
        title="Done"
        onPress={() => {
          setIsEditing(true);
        }}
      />
    </View>
  );
}
