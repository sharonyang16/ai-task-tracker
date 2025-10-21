import TaskCard from "@/components/home/task-card";
import useHomePage from "@/hooks/useHomePage";
import React from "react";
import { Text, View } from "react-native";
import styles from "@/styles/global.styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { tasks } = useHomePage() || [];

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Text style={styles.pageHeading}>Home</Text>
      <View style={styles.content}>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </View>
    </SafeAreaView>
  );
}
