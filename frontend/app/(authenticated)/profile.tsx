import Banner from "@/components/banner";
import { useAuthContext } from "@/context/auth-context";
import useAuth from "@/hooks/useAuth";
import styles from "@/styles/global.styles";
import React from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuthContext();
  const { loading, errorMessage, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Text style={styles.pageHeading}>Profile</Text>
      <Text>{user?.email}</Text>
      {errorMessage && <Banner text={errorMessage} alertType="warning" />}
      <Button title="Sign Out" onPress={() => signOut()} disabled={loading} />
    </SafeAreaView>
  );
}
