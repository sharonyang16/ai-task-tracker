import React from "react";
import { Text, View } from "react-native";
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
import { Input, InputField } from "@/components/ui/input";
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
} from "@/components/ui/button";

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
          <Input size="xl">
            <InputField
              type="text"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="example@email.com"
            />
          </Input>
          <Input size="xl">
            <InputField
              type={"password"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="••••••"
            />
          </Input>
          <Checkbox
            value={staySignedIn.toString()}
            isChecked={staySignedIn}
            onChange={(value) => setStaySignedIn(value)}
          >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Stay signed in?</CheckboxLabel>
          </Checkbox>

          <Button onPress={handleLogin} disabled={loading} size="lg">
            <ButtonText>{loading ? <ButtonSpinner /> : "Login"}</ButtonText>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
