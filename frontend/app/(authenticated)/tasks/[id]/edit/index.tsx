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
  TrashIcon,
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
    showDeleteConfirmation,
    setShowDeleteConfirmation,
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
              <Input>
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
              <Textarea>
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
              >
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>Done?</CheckboxLabel>
              </Checkbox>
            </FormControl>

            {(subTasks.length !== 0 || newSubTasks.length !== 0) && (
              <VStack space="md">
                <Heading size="md">Subtasks</Heading>
                {subTasks.map((subTask) => (
                  <Card key={subTask.title}>
                    <HStack space="md">
                      <Button
                        onPress={() => {
                          /*remove exisiting subtask */
                        }}
                        variant="link"
                      >
                        <ButtonIcon size="md" as={TrashIcon} />
                      </Button>
                      <VStack>
                        <Heading size="sm">{subTask.title}</Heading>
                        <Text>{subTask.description}</Text>
                      </VStack>
                    </HStack>
                  </Card>
                ))}
                {newSubTasks.map((subTask) => (
                  <Card key={subTask.title}>
                    <HStack space="md">
                      <Button
                        onPress={() => {
                          /*remove new subtask */
                        }}
                        variant="link"
                      >
                        <ButtonIcon size="md" as={TrashIcon} />
                      </Button>
                      <VStack>
                        <Heading size="sm">{subTask.title}</Heading>
                        <Text>{subTask.description}</Text>
                      </VStack>
                    </HStack>
                  </Card>
                ))}
              </VStack>
            )}

            {recommendedSubTasks.length !== 0 && (
              <VStack space="md">
                <Heading size="md">Recommended Subtasks</Heading>
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
            )}
            <Button onPress={() => handleSave} disabled={loading} size="lg">
              <ButtonText>{loading ? <ButtonSpinner /> : "Save"}</ButtonText>
            </Button>
            <Button
              onPress={() => setShowDeleteConfirmation(true)}
              disabled={loading}
              variant="outline"
              size="md"
              action="negative"
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
