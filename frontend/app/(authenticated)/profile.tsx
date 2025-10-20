import { useAuth } from "@/context/auth-context";
import styles from "@/styles/global.styles";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Text style={styles.pageHeading}>Profile</Text>
      <Text>{user?.email}</Text>
    </SafeAreaView>
  );
}
