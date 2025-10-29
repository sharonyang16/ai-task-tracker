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
          <Text>{task.size}</Text>
          <Text>{task.isComplete ? "Complete" : "Incomplete"}</Text>

          <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {task.subTasks.map((subTask) => (
              <View
                key={subTask.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  backgroundColor: "#EAEAEA",
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Text>{subTask.title}</Text>
                <Text>{subTask.description}</Text>

                <Text>{subTask.isComplete ? "Complete" : "Incomplete"}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text>No task found</Text>
      )}
    </SafeAreaView>
  );
}
