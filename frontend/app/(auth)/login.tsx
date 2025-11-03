import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import {
  Button,
  Checkbox,
  Input,
  Form,
  H4,
  XStack,
  Label,
  Spinner,
} from "tamagui";
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
      <Form>
        <H4 fontWeight={500}>Login</H4>
        <View style={styles.content}>
          <View style={authStyles.container}>
            {!!errorMessage && (
              <Banner text={errorMessage} alertType="warning" />
            )}
            {!!infoMessage && <Banner text={infoMessage} alertType="info" />}
            <Input
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="your email"
            />
            <Input
              value={password}
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              placeholder="your password"
            />
            <XStack style={{ alignItems: "center" }} gap="$2">
              <Checkbox
                id="stay-signed-in"
                size="$3"
                checked={staySignedIn}
                onCheckedChange={() => setStaySignedIn(!staySignedIn)}
              >
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox>
              <Label size="$4" htmlFor="stay-signed-in">
                Stay signed in?
              </Label>
            </XStack>
            <Form.Trigger asChild disabled={loading} onPress={handleLogin}>
              <Button icon={loading ? () => <Spinner /> : undefined}>
                Submit
              </Button>
            </Form.Trigger>
          </View>
        </View>
      </Form>
    </SafeAreaView>
  );
}
