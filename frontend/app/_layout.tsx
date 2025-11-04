import React from "react";
import { AuthProvider } from "@/context/auth-context";
import Navigator from "./navigator";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {
  return (
    
    <GluestackUIProvider mode="dark">
      <AuthProvider>
      <Navigator />
    </AuthProvider>
    </GluestackUIProvider>
  
  );
}
