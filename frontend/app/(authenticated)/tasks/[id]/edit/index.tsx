import useEditPage from "@/hooks/useEditPage";
import styles from "@/styles/global.styles";

import React from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from "expo-checkbox";
import { useLocalSearchParams } from "expo-router";

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
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.layoutContainer}>
          <Text style={styles.pageHeading}>{`Editing "${title}"`}</Text>
          <TextInput
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder="Task Description"
          />
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="Task Description"
          />
          <Picker
            selectedValue={size}
            onValueChange={(itemValue) => setSize(itemValue)}
          >
            <Picker.Item label="Small" value="SMALL" />
            <Picker.Item label="Medium" value="MEDIUM" />
            <Picker.Item label="Large" value="LARGE" />
          </Picker>
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Checkbox
              value={isComplete || false}
              onValueChange={(value) => setIsComplete(value)}
              accessibilityLabelledBy="checkbox-label"
            />
            <Pressable onPress={() => setIsComplete(!isComplete)}>
              <Text
                accessibilityLabel="label for checkbox"
                nativeID="checkbox-label"
              >
                Done?
              </Text>
            </Pressable>
          </View>

          {(subTasks.length !== 0 || newSubTasks.length !== 0) && (
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Text> Subtasks</Text>
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
                  <Text>{subTask.title}</Text>
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
                  <Text>{subTask.title}</Text>
                  <Text>{subTask.description}</Text>
                </View>
              ))}
            </View>
          )}

          {recommendedSubTasks.length !== 0 && (
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Text> Recommended Subtasks</Text>
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
                    <Text>{subTask.title}</Text>
                    <Text>{subTask.description}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}

          <Button
            title="Save"
            onPress={() => {
              handleSave();
            }}
          />
          <Button
            title="Delete Task"
            onPress={() => {
              deleteConfirmation();
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
