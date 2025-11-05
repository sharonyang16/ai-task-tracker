import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { AlertCircleIcon, CheckIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import styles from "@/styles/global.styles";
import { default as authStyles } from "@/styles/auth.styles";
import useAuth from "@/hooks/useAuth";

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
      <Heading size="2xl">Login</Heading>
      {!!errorMessage && (
        <Alert action="error">
          <AlertIcon as={AlertCircleIcon} />
          <AlertText>{errorMessage}</AlertText>
        </Alert>
      )}
      <VStack style={authStyles.container}>
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input size="xl">
            <InputField
              type="text"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="example@email.com"
            />
          </Input>
        </FormControl>

        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input size="xl">
            <InputField
              type={"password"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="••••••••"
            />
          </Input>
        </FormControl>
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
      </VStack>
    </SafeAreaView>
  );
}
