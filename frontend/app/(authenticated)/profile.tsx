import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import useAuth from "@/hooks/useAuth";
import { useAuthContext } from "@/context/auth-context";
import styles from "@/styles/global.styles";

export default function HomeScreen() {
  const { user } = useAuthContext();
  const { loading, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Heading size="2xl">Profile</Heading>
      <Text>{user?.email}</Text>
      <Button onPress={() => signOut()} disabled={loading} size="lg">
        <ButtonText>{loading ? <ButtonSpinner /> : "Sign Out"}</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
