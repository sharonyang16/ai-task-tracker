import TaskCard from "@/components/home/task-card";
import useHomePage from "@/hooks/useHomePage";
import React from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { tasks } = useHomePage() || [];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </View>
  );
}
