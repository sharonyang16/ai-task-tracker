import React from "react";
import { AuthProvider } from "@/context/auth-context";
import Navigator from "./navigator";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}
