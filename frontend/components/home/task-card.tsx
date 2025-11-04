import React from "react";
import { View } from "react-native";
import { Task } from "@/types/tasks";
import { Link } from "expo-router";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "../ui/heading";

type TaskCardProps = {
  task: Task;
  handleTaskCheckboxPress: (taskId: number, value: boolean) => void;
};

const TaskCard = ({ task, handleTaskCheckboxPress }: TaskCardProps) => {
  return (
    <Card>
      <View
        className="w-full"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          className="w-full"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            alignItems: "flex-start",
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
          <View className="w-full">
            <Heading size="lg" className="text-black">
              {task.title}
            </Heading>
            <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
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
                      gap: 8,
                    }}
                  >
                    <Checkbox
                      value={subtask.isComplete.toString()}
                      isChecked={subtask.isComplete}
                      onChange={(value) =>
                        handleTaskCheckboxPress(task.id, value)
                      }
                      size="sm"
                    >
                      <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                    </Checkbox>
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
      </View>
    </Card>
  );
};

export default TaskCard;
