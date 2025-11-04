import React from "react";
import { Tabs } from "expo-router";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: "Sign Up",
        }}
      />
    </Tabs>
  );
}
