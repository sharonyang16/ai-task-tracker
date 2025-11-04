import useEditPage from "@/hooks/useEditPage";
import styles from "@/styles/global.styles";
import React from "react";
import { Alert, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { CheckIcon, ChevronDownIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";

export default function TaskDetailsEdit() {
  const localId = useLocalSearchParams().id;
  const taskId = Number(localId);

  const {
    title,
    setTitle,
    description,
    setDescription,
    size,
    setSize,
    isComplete,
    setIsComplete,
    subTasks,
    recommendedSubTasks,
    loading,
    handleSave,
    handleDelete,
    handleAddSubTask,
    newSubTasks,
  } = useEditPage(taskId);

  const deleteConfirmation = () => {
    Alert.alert("Deleting Task", `Are you sure you want to delete "${title}"`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Yes", onPress: () => handleDelete() },
    ]);
  };

  return (
    <SafeAreaView style={styles.layoutContainer}>
      {loading ? (
        <Spinner size="large" />
      ) : (
        <VStack>
          <Heading size="2xl">{`Editing "${title}"`}</Heading>
          <Input>
            <InputField
              type="text"
              value={title}
              onChangeText={(text) => setTitle(text)}
              placeholder="Do some work"
            />
          </Input>
          <Textarea>
            <TextareaInput
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="Get xyz done..."
            />
          </Textarea>
          <Select selectedValue={size} onValueChange={setSize}>
            <SelectTrigger>
              <SelectInput placeholder="Task Size" />
              <SelectIcon as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Small" value="SMALL" />
                <SelectItem label="Medium" value="MEDIUM" />
                <SelectItem label="Large" value="LARGE" />
              </SelectContent>
            </SelectPortal>
          </Select>
          <Checkbox
            value={isComplete?.toString() || ""}
            isChecked={isComplete || false}
            onChange={(value) => setIsComplete(value)}
            size="md"
          >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Done?</CheckboxLabel>
          </Checkbox>
          {(subTasks.length !== 0 || newSubTasks.length !== 0) && (
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Heading size="md">Subtasks</Heading>
              {subTasks.map((subTask) => (
                <View
                  key={subTask.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    backgroundColor: "#EAEAEA",
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  <Heading size="sm">{subTask.title}</Heading>
                  <Text>{subTask.description}</Text>
                </View>
              ))}
              {newSubTasks.map((subTask) => (
                <View
                  key={subTask.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    backgroundColor: "#EAEAEA",
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  <Heading size="sm">{subTask.title}</Heading>
                  <Text>{subTask.description}</Text>
                </View>
              ))}
            </View>
          )}

          {recommendedSubTasks.length !== 0 && (
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Heading size="md">Recommended Subtasks</Heading>
              {recommendedSubTasks.map((subTask) => (
                <Pressable
                  key={subTask.title}
                  onPress={() => handleAddSubTask(subTask)}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      backgroundColor: "#EAEAEA",
                      padding: 8,
                      borderRadius: 8,
                    }}
                  >
                    <Heading size="sm">{subTask.title}</Heading>
                    <Text>{subTask.description}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
          <Button onPress={() => handleSave} disabled={loading} size="lg">
            <ButtonText>{loading ? <ButtonSpinner /> : "Save"}</ButtonText>
          </Button>
          <Button
            onPress={() => deleteConfirmation()}
            disabled={loading}
            variant="outline"
            size="md"
            action="negative"
          >
            <ButtonText>
              {loading ? <ButtonSpinner /> : "Delete Task"}
            </ButtonText>
          </Button>
        </VStack>
      )}
    </SafeAreaView>
  );
}
