import React from "react";
import { View, Text } from "react-native";

import { Task } from "@/types/tasks";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <View style={{ backgroundColor: "#EAEAEA", padding: 16, borderRadius: 8 }}>
      <Text style={{ fontSize: 16, fontWeight: 600 }}>{task.title}</Text>
      {task.description && <Text>{task.description}</Text>}
      <Text>{task.size}</Text>
      {task.subTasks.length > 0 && (
        <View style={{ padding: 8, gap: 8 }}>
          {task.subTasks.map((subtask) => (
            <View key={`${task.id}-${subtask.id}`}>
              <Text>{subtask.title}</Text>
              <Text>
                {subtask.description && <Text>{subtask.description}</Text>}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default TaskCard;
