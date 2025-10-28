import { useTaskDetailContext } from "@/context/task-detail-context";
import styles from "@/styles/global.styles";
import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styles.layoutContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.pageHeading}>{`${task?.title}`}</Text>
        <Button
          title="Edit"
          onPress={() => {
            setIsEditing(true);
          }}
        />
      </View>

      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
    </SafeAreaView>
  );
}
