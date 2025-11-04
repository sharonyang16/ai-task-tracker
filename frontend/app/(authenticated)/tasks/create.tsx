import { Heading } from "@/components/ui/heading";
import styles from "@/styles/global.styles";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CreatePage = () => {
  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Heading size="2xl">Create Task</Heading>
    </SafeAreaView>
  );
};

export default CreatePage;
