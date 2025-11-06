import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import {
  Button,
  ButtonIcon,
  ButtonText,
  ButtonSpinner,
} from "@/components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import {
  AlertCircleIcon,
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
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import SubtaskEditCard from "@/components/subtask-card";
import styles from "@/styles/global.styles";
import useCreatePage from "@/hooks/useCreatePage";

const CreatePage = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    size,
    setSize,
    subtasks,
    handleAddSubtask,
    handleRemoveSubtask,
    handleSubtaskChange,
    errorMessage,
    loading,
    handleCreate,
    handleGoBack,
  } = useCreatePage();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <ScrollView>
        <VStack space="md">
          <HStack>
            <Button variant="link" onPress={() => handleGoBack()}>
              <ButtonIcon size="lg" as={ChevronLeftIcon} />
            </Button>
          </HStack>
          <Heading size="2xl">Creating Task</Heading>
          {!!errorMessage && (
            <Alert action="error">
              <AlertIcon as={AlertCircleIcon} />
              <AlertText>{errorMessage}</AlertText>
            </Alert>
          )}
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
                value={description || ""}
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

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Subtasks</FormControlLabelText>
            </FormControlLabel>
            <VStack space="md">
              <VStack space="md">
                {subtasks.map((subtask, index) => (
                  <SubtaskEditCard
                    key={index}
                    title={subtask.title}
                    description={subtask.description}
                    setTitle={(title: string) =>
                      handleSubtaskChange(index, "title", title)
                    }
                    setDescription={(description: string) =>
                      handleSubtaskChange(index, "description", description)
                    }
                    handleDelete={() => handleRemoveSubtask(index)}
                  />
                ))}
              </VStack>
              <Button onPress={() => handleAddSubtask()} variant="outline">
                <ButtonText>Add Subtask</ButtonText>
              </Button>
            </VStack>
          </FormControl>

          <Button onPress={() => handleCreate()} disabled={loading} size="lg">
            <ButtonText>{loading ? <ButtonSpinner /> : "Save"}</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePage;
