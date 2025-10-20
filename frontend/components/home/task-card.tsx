import React from "react";
import { View, Text } from "react-native";

import { DatabaseTask } from "@/types/tasks";

type TaskCardProps = {
  task: DatabaseTask;
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <View>
      <Text>{task.title}</Text>
    </View>
  );
};

export default TaskCard;
