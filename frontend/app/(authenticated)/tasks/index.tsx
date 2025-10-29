import TaskCard from "@/components/home/task-card";
import useHomePage from "@/hooks/useHomePage";
import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import styles from "@/styles/global.styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { tasks, isLoading, handleTaskCheckboxPress } = useHomePage();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Text style={styles.pageHeading}>Tasks</Text>
      {isLoading && <ActivityIndicator size="large" />}
      {!isLoading && tasks.length === 0 ? (
        <Text>No tasks found</Text>
      ) : (
        <View style={styles.content}>
          <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tasks.map((task) => (
              <TaskCard
                task={task}
                key={task.id}
                handleTaskCheckboxPress={handleTaskCheckboxPress}
              />
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
