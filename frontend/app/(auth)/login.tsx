import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Banner from "@/components/banner";
import useAuth from "@/hooks/useAuth";
import { default as authStyles } from "@/styles/auth.styles";
import styles from "@/styles/global.styles";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";

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
