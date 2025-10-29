import { useTaskDetailContext } from "@/context/task-detail-context";
import styles from "@/styles/global.styles";
import React from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskDetails() {
  const { task, setIsEditing, isLoading } = useTaskDetailContext();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : task !== null ? (
        <View>
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
        </View>
      ) : (
        <Text>No task found</Text>
      )}
    </SafeAreaView>
  );
}
