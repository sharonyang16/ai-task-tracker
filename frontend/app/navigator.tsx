import React from "react";
import { Stack } from "expo-router";
import useSession from "@/hooks/useSession";

export default function Navigator() {
  const { session } = useSession();

  const isLoggedIn = session !== null;

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
