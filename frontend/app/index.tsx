import { Redirect } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function Index() {
  const user = null;

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Wrong Place</Text>
    </View>
  );
}
