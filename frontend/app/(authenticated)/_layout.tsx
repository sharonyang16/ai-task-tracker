import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="tasks/index"
        options={{
          title: "Tasks",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
      <Tabs.Screen
        name="tasks/[id]/edit"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
