import React from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import useLogin from "@/hooks/useLogin";
import styles from "../styles/auth.styles";
import Banner from "@/components/banner";

export default function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errorMessage,
    infoMessage,
    signInWithEmail,
  } = useLogin();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>
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
        <Button title="Submit" onPress={signInWithEmail} disabled={loading} />
      </View>
    </View>
  );
}
