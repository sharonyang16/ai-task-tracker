import { useTaskDetailContext } from "@/context/task-detail-context";
import useTasksDetailsEditPage from "@/hooks/useTaskDetailsEditpage";
import styles from "@/styles/global.styles";
import { Task } from "@/types/tasks";
import React from "react";
import { Alert, Button, Text, TextInput } from "react-native";
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
    handleDelete,
  } = useTasksDetailsEditPage(task as Task);

  const deleteConfirmation = () => {
    Alert.alert(
      "Deleting Task",
      `Are you sure you want to delete "${task?.title}"`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Yes", onPress: () => handleDelete() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Text style={styles.pageHeading}>{`Editing "${task?.title}"`}</Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Task Description"
      />
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Task Description"
      />
      <Button
        title="Save"
        onPress={() => {
          handleSave();
          setIsEditing(false);
        }}
      />
      <Button
        title="Delete Task"
        onPress={() => {
          deleteConfirmation();
        }}
      />
    </SafeAreaView>
  );
}
