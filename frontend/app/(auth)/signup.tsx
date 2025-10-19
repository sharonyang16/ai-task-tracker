import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import useAuth from "@/hooks/useAuth";
import styles from "../styles/auth.styles";
import Banner from "@/components/banner";

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
    signUpWithEmail,
  } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Sign Up</Text>
        {!!errorMessage && <Banner text={errorMessage} alertType="warning" />}
        {!!infoMessage && <Banner text={infoMessage} alertType="info" />}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="your email"
        />
        <TextInput
          style={styles.input}
          value={password}
          textContentType="password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          placeholder="your password"
        />
        <TextInput
          style={styles.input}
          value={confirmPassword}
          textContentType="password"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="confirm password"
        />
        <Button title="Submit" onPress={signUpWithEmail} disabled={loading} />
      </View>
    </View>
  );
}
