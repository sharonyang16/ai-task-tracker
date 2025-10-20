import { useAuth } from "@/context/auth-context";
import styles from "@/styles/global.styles";
import React from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.layoutContainer}>
      <Text style={styles.pageHeading}>Profile</Text>
      <Text>{user?.email}</Text>
    </View>
  );
}
