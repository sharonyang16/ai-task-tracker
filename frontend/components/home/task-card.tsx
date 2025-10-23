import React from "react";
import { View, Text } from "react-native";
import { Checkbox } from "expo-checkbox";
import { Task } from "@/types/tasks";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <View style={{ backgroundColor: "#EAEAEA", padding: 16, borderRadius: 8 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 16,
          justifyContent: "space-between",
        }}
      >
        <Checkbox value={task.isComplete} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>{task.title}</Text>
          {task.description && <Text>{task.description}</Text>}
          <Text>{task.size}</Text>
          {task.subTasks.length > 0 && (
            <View style={{ padding: 8, gap: 8 }}>
              {task.subTasks.map((subtask) => (
                <View
                  key={`${task.id}-${subtask.id}`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 16,
                  }}
                >
                  <Checkbox value={task.isComplete} />
                  <View style={{ flex: 1 }}>
                    <Text style={{fontWeight: 600}}>{subtask.title}</Text>
                    {subtask.description && <Text>{subtask.description}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default TaskCard;
