import { useTaskDetailContext } from "@/context/task-detail-context";
import useTasksDetailsEditPage from "@/hooks/useTaskDetailsEditpage";
import styles from "@/styles/global.styles";
import { Task } from "@/types/tasks";
import React from "react";
import { Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskDetailsEdit() {
  const { task, setIsEditing } = useTaskDetailContext();

  const {
    title,
    setTitle,
    description,
    setDescription,
    size,
    setSize,
    isComplete,
    setIsComplete,
    handleSave,
  } = useTasksDetailsEditPage(task as Task);

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Text style={styles.pageHeading}>{`Editing ${task?.title}`}</Text>
      <TextInput value={title} onChangeText={(text) => setTitle(text)} />
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button
        title="Done"
        onPress={() => {
          handleSave();
          setIsEditing(false);
        }}
      />
    </SafeAreaView>
  );
}
