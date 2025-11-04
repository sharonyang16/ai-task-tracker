import TaskCard from "@/components/home/task-card";
import useHomePage from "@/hooks/useHomePage";
import React from "react";
import { ScrollView } from "react-native";
import styles from "@/styles/global.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Fab, FabIcon } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { tasks, isLoading, handleTaskCheckboxPress } = useHomePage();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Heading size="2xl">Tasks</Heading>
      {isLoading ? (
        <Spinner size="large" />
      ) : tasks.length === 0 ? (
        <Text>No tasks found</Text>
      ) : (
        <ScrollView>
          <VStack space="md">
            {tasks.map((task) => (
              <TaskCard
                task={task}
                key={task.id}
                handleTaskCheckboxPress={handleTaskCheckboxPress}
              />
            ))}
          </VStack>
        </ScrollView>
      )}
      <Fab
        placement="bottom right"
        size="lg"
        onPress={() => {
          router.navigate("/tasks/create");
        }}
      >
        <FabIcon as={AddIcon} />
      </Fab>
    </SafeAreaView>
  );
}
