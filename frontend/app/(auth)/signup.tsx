import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import useAuth from "@/hooks/useAuth";
import { default as authStyles } from "@/styles/auth.styles";
import styles from "@/styles/global.styles";
import Banner from "@/components/banner";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    errorMessage,
    infoMessage,
    handleSignUp,
  } = useAuth();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Text style={styles.pageHeading}>Sign Up</Text>
      <View style={styles.content}>
        <View style={authStyles.container}>
          {!!errorMessage && <Banner text={errorMessage} alertType="warning" />}
          {!!infoMessage && <Banner text={infoMessage} alertType="info" />}
          <TextInput
            style={authStyles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="your email"
          />
          <TextInput
            style={authStyles.input}
            value={password}
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            placeholder="your password"
          />
          <TextInput
            style={authStyles.input}
            value={confirmPassword}
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder="confirm password"
          />
          <Button title="Submit" onPress={handleSignUp} disabled={loading} />
        </View>
      </View>
    </SafeAreaView>
  );
}
