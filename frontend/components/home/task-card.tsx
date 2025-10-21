import React from "react";
import { View, Text } from "react-native";

import { DatabaseTask } from "@/types/tasks";

type TaskCardProps = {
  task: DatabaseTask;
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <View style={{ backgroundColor: "#EAEAEA", padding: 16, borderRadius: 8 }}>
      <Text>{task.title}</Text>
      {task.description && <Text>{task.description}</Text>}
      <Text>{task.size}</Text>
    </View>
  );
};

export default TaskCard;
