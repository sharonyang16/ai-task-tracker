import React from "react";
import { AuthProvider } from "@/context/auth-context";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import Navigator from "./navigator";
import "@/global.css";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </GluestackUIProvider>
  );
}
