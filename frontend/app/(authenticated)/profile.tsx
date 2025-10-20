import { useAuth } from "@/context/auth-context";
import React from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile</Text>
      <Text>{user?.email}</Text>
    </View>
  );
}
