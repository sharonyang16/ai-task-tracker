import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { Task } from "@/types/tasks";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from "@/components/ui/checkbox";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CheckIcon, EditIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

type TaskCardProps = {
  task: Task;
  handleTaskCheckboxPress: (taskId: number, value: boolean) => void;
};

const TaskCard = ({ task, handleTaskCheckboxPress }: TaskCardProps) => {
  const router = useRouter();

  return (
    <Card>
      <VStack className="">
        <View className="flex flex-row justify-between max-w-full">
          <HStack space="md" className="flex-wrap max-w-100%">
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
            <Heading size="lg" className="">
              {task.title}
            </Heading>
          </HStack>
          <Button
            className="min-w-6"
            variant="link"
            onPress={() => {
              router.navigate(`/tasks/${task.id}/edit`);
            }}
          >
            <ButtonIcon size="sm" as={EditIcon} />
          </Button>
        </View>

        <VStack className="pl-8" space="md">
          <VStack space="sm">
            <HStack>
              <Badge size="sm" action="muted" variant="outline">
                <BadgeText>{task.size}</BadgeText>
              </Badge>
            </HStack>
            {task.description && <Text>{task.description}</Text>}
          </VStack>

          {task.subTasks.length > 0 && (
            <VStack space="md">
              {task.subTasks.map((subtask) => (
                <VStack
                  key={`${task.id}-${subtask.id}`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                  }}
                >
                  <HStack space="sm">
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
                    <Text style={{ fontWeight: 600 }}>{subtask.title}</Text>
                  </HStack>
                </VStack>
              ))}
            </VStack>
          )}
        </VStack>
      </VStack>
    </Card>
  );
};

export default TaskCard;
