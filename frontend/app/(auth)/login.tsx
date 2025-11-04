import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "@/hooks/useAuth";
import { default as authStyles } from "@/styles/auth.styles";
import styles from "@/styles/global.styles";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { AlertCircleIcon, CheckIcon } from "@/components/ui/icon";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";

export default function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errorMessage,
    handleLogin,
    staySignedIn,
    setStaySignedIn,
  } = useAuth();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Text style={styles.pageHeading}>Login</Text>
      <View style={styles.content}>
        <View style={authStyles.container}>
          {!!errorMessage && (
            <Alert action="error">
              <AlertIcon as={AlertCircleIcon} />
              <AlertText>{errorMessage}</AlertText>
            </Alert>
          )}
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
          <Checkbox
            value={staySignedIn.toString()}
            isChecked={staySignedIn}
            onChange={(value) => setStaySignedIn(value)}
            size="sm"
          >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Stay signed in?</CheckboxLabel>
          </Checkbox>

          <Button title="Submit" onPress={handleLogin} disabled={loading} />
        </View>
      </View>
    </SafeAreaView>
  );
}
