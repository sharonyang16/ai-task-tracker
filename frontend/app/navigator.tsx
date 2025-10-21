import React from "react";
import { Stack } from "expo-router";
import { useAuthContext } from "@/context/auth-context";

export default function Navigator() {
  const { user } = useAuthContext();

  const isLoggedIn = user !== null;

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
