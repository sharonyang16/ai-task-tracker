import React from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "expo-checkbox";
import Banner from "@/components/banner";
import useAuth from "@/hooks/useAuth";
import { default as authStyles } from "@/styles/auth.styles";
import styles from "@/styles/global.styles";


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
    staySignedIn,
    setStaySignedIn,
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

          <Button title="Submit" onPress={handleSignUp} disabled={loading} />
        </View>
      </View>
    </SafeAreaView>
  );
}
