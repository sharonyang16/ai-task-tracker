import React from "react";
import { View, Text } from "react-native";
import { Task } from "@/types/tasks";
import { Link } from "expo-router";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from "@/components/ui/checkbox";
import { CheckIcon } from "../ui/icon";

type TaskCardProps = {
  task: Task;
  handleTaskCheckboxPress: (taskId: number, value: boolean) => void;
};

const TaskCard = ({ task, handleTaskCheckboxPress }: TaskCardProps) => {
  return (
    <View
      style={{
        backgroundColor: "#EAEAEA",
        padding: 16,
        borderRadius: 8,
        width: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
          }}
        >
          <Checkbox
            value={task.isComplete.toString()}
            isChecked={task.isComplete}
            onChange={(value) => handleTaskCheckboxPress(task.id, value)}
            size="md"
          >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
          </Checkbox>
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
                      <Text style={{ fontWeight: 600 }}>{subtask.title}</Text>
                      {subtask.description && (
                        <Text>{subtask.description}</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
        <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
      </View>
    </View>
  );
};

export default TaskCard;
