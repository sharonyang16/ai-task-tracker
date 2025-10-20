import React from "react";
import { Stack } from "expo-router";
import useSession from "@/hooks/useSession";
import { useAuth } from "@/context/auth-context";

export default function Navigator() {
  const { session } = useSession();
  const { setUser } = useAuth();

  const isLoggedIn = session !== null;

  if (isLoggedIn) {
    setUser(session.user);
  }

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
