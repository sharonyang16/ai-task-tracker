import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import {
  Button,
  ButtonIcon,
  ButtonText,
  ButtonSpinner,
} from "@/components/ui/button";

import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  AlertCircleIcon,
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
import useCreatePage from "@/hooks/useCreatePage";
import styles from "@/styles/global.styles";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";

const CreatePage = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    size,
    setSize,
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
          <VStack>
            <Text>Title</Text>
            <Input>
              <InputField
                type="text"
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder="Do some work"
              />
            </Input>
          </VStack>

          <VStack>
            <Text>Description</Text>
            <Textarea>
              <TextareaInput
                value={description || ""}
                onChangeText={(text) => setDescription(text)}
                placeholder="Get xyz done..."
              />
            </Textarea>
          </VStack>

          <VStack>
            <Text>Size</Text>
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
          </VStack>

          <Button onPress={() => handleCreate()} disabled={loading} size="lg">
            <ButtonText>{loading ? <ButtonSpinner /> : "Save"}</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePage;
