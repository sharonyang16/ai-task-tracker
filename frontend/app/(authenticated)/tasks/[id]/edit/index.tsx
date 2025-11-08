import React from "react";
import { ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import {
  AddIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
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
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import styles from "@/styles/global.styles";
import useEditPage from "@/hooks/useEditPage";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import SubtaskEditCard from "@/components/subtask-card";
import AiStarIcon from "@/components/ai-star-icon";

export default function TaskDetailsEdit() {
  const { id } = useLocalSearchParams();
  const taskId = Number(id);

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
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    handleSubtaskChange,
    handleSubtaskDelete,
  } = useEditPage(taskId);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      {loading ? (
        <Spinner size="large" />
      ) : (
        <ScrollView>
          <VStack space="md">
            <HStack>
              <Button variant="link" onPress={() => router.back()}>
                <ButtonIcon size="lg" as={ChevronLeftIcon} />
              </Button>
            </HStack>

            <AlertDialog isOpen={showDeleteConfirmation} size="lg">
              <AlertDialogBackdrop />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <Heading>Deleting Task</Heading>
                </AlertDialogHeader>
                <AlertDialogBody className="py-4">
                  <Text>{`Are you sure you want to delete "${title}"?`}</Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={() => setShowDeleteConfirmation(false)}
                  >
                    <ButtonText>Cancel</ButtonText>
                  </Button>
                  <Button onPress={() => handleDelete()} action="negative">
                    <ButtonText>Delete</ButtonText>
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Heading size="2xl">{`Editing "${title}"`}</Heading>
            <FormControl isRequired>
              <FormControlLabel>
                <FormControlLabelText>Title</FormControlLabelText>
              </FormControlLabel>
              <Input isDisabled={loading}>
                <InputField
                  type="text"
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                  placeholder="Do some work"
                />
              </Input>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Description</FormControlLabelText>
              </FormControlLabel>
              <Textarea isDisabled={loading}>
                <TextareaInput
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  placeholder="Get xyz done..."
                />
              </Textarea>
            </FormControl>
            <FormControl isRequired>
              <FormControlLabel>
                <FormControlLabelText>Size</FormControlLabelText>
              </FormControlLabel>
              <Select
                selectedValue={size}
                onValueChange={setSize}
                isDisabled={loading}
              >
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
            </FormControl>
            <FormControl isRequired>
              <FormControlLabel>
                <FormControlLabelText>Status</FormControlLabelText>
              </FormControlLabel>
              <Checkbox
                value={isComplete?.toString() || ""}
                isChecked={isComplete || false}
                onChange={(value) => setIsComplete(value)}
                size="lg"
                isDisabled={loading}
              >
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>Done?</CheckboxLabel>
              </Checkbox>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Subtasks</FormControlLabelText>
              </FormControlLabel>
              {subTasks.map((subTask, index) => (
                <SubtaskEditCard
                  key={"subtask-" + index}
                  title={subTask.title}
                  description={subTask.description}
                  setTitle={(title: string): void => {
                    handleSubtaskChange(index, "title", title, false);
                  }}
                  setDescription={(description: string): void => {
                    handleSubtaskChange(
                      index,
                      "description",
                      description,
                      false
                    );
                  }}
                  handleDelete={() => handleSubtaskDelete(index, false)}
                  loading={loading}
                />
              ))}
              {newSubTasks.map((subTask, index) => (
                <SubtaskEditCard
                  key={"new-subtask-" + index}
                  title={subTask.title}
                  description={subTask.description}
                  setTitle={(title: string): void => {
                    handleSubtaskChange(index, "title", title, true);
                  }}
                  setDescription={(description: string): void => {
                    handleSubtaskChange(
                      index,
                      "description",
                      description,
                      true
                    );
                  }}
                  handleDelete={() => handleSubtaskDelete(index, true)}
                  loading={loading}
                />
              ))}
              <Button
                onPress={() => handleAddSubTask({ title: "", description: "" })}
                variant="outline"
                isDisabled={loading}
              >
                <ButtonText>Add Subtask</ButtonText>
              </Button>
            </FormControl>

            {recommendedSubTasks.length !== 0 && (
              <FormControl>
                <FormControlLabel className="flex flex-row gap-2">
                  <AiStarIcon />
                  <FormControlLabelText>
                    Recommended Subtasks
                  </FormControlLabelText>
                </FormControlLabel>
                <VStack space="md">
                  {recommendedSubTasks.map((subTask) => (
                    <Card key={subTask.title}>
                      <HStack space="md">
                        <Button
                          onPress={() => handleAddSubTask(subTask)}
                          variant="link"
                        >
                          <ButtonIcon size="md" as={AddIcon} />
                        </Button>
                        <VStack className="w-full">
                          <Heading size="sm">{subTask.title}</Heading>
                          <Text>{subTask.description}</Text>
                        </VStack>
                      </HStack>
                    </Card>
                  ))}
                </VStack>
              </FormControl>
            )}
            <Button onPress={() => handleSave()} isDisabled={loading} size="lg">
              <ButtonText>{loading ? <ButtonSpinner /> : "Save"}</ButtonText>
            </Button>
            <Button
              onPress={() => setShowDeleteConfirmation(true)}
              disabled={loading}
              variant="outline"
              size="md"
              action="negative"
              isDisabled={loading}
            >
              <ButtonText className="text-red-600">
                {loading ? <ButtonSpinner /> : "Delete Task"}
              </ButtonText>
            </Button>
          </VStack>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
