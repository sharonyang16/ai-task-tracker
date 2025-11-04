import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-context";
import useAuth from "@/hooks/useAuth";
import styles from "@/styles/global.styles";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuthContext();
  const { loading, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Text style={styles.pageHeading}>Profile</Text>
      <Text>{user?.email}</Text>
      <Button onPress={() => signOut()} disabled={loading} size="lg">
        <ButtonText>{loading ? <ButtonSpinner /> : "Sign Out"}</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
