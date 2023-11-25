"use client";

import { LayoutProviderType } from "@/types/types";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }: LayoutProviderType) {
  return <SessionProvider>{children}</SessionProvider>;
}
