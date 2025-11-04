import React from "react";
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
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";

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
    handleSignUp,
    staySignedIn,
    setStaySignedIn,
  } = useAuth();

  return (
    <SafeAreaView style={styles.layoutContainer}>
      <Heading size="2xl">Sign Up</Heading>
      <VStack style={authStyles.container}>
        <VStack>
          <Text size="lg">Email</Text>
          <Input size="xl">
            <InputField
              type="text"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="example@email.com"
            />
          </Input>
        </VStack>
        <VStack>
          <Text size="lg">Password</Text>
          <Input size="xl">
            <InputField
              type={"password"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="••••••••"
            />
          </Input>
        </VStack>
        <VStack>
          <Text size="lg">Confirm Password</Text>
          <Input size="xl">
            <InputField
              type={"password"}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholder="••••••••"
            />
          </Input>
        </VStack>
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
        {!!errorMessage && (
          <Alert action="error">
            <AlertIcon as={AlertCircleIcon} />
            <AlertText>{errorMessage}</AlertText>
          </Alert>
        )}
        <Button onPress={handleSignUp} disabled={loading} size="lg">
          <ButtonText>{loading ? <ButtonSpinner /> : "Sign Up"}</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
