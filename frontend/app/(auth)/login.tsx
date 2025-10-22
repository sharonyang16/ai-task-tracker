import React from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "expo-checkbox";
import Banner from "@/components/banner";
import useAuth from "@/hooks/useAuth";
import { default as authStyles } from "@/styles/auth.styles";
import styles from "@/styles/global.styles";

export default function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errorMessage,
    infoMessage,
    handleLogin,
    staySignedIn,
    setStaySignedIn,
  } = useAuth();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Text style={styles.pageHeading}>Login</Text>
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
          <View style={authStyles.checkbox}>
            <Checkbox
              value={staySignedIn}
              onChange={() => setStaySignedIn(!staySignedIn)}
              accessibilityLabelledBy="checkbox-label"
            />
            <Pressable onPress={() => setStaySignedIn(!staySignedIn)}>
              <Text
                accessibilityLabel="label for checkbox"
                nativeID="checkbox-label"
              >
                Stay signed in?
              </Text>
            </Pressable>
          </View>
          <Button title="Submit" onPress={handleLogin} disabled={loading} />
        </View>
      </View>
    </SafeAreaView>
  );
}
