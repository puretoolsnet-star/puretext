"use client";

import type { ReactNode } from "react";

import { HumanVerificationProvider } from "@/context/HumanVerificationContext";

export function Providers({ children }: { children: ReactNode }) {
  return <HumanVerificationProvider>{children}</HumanVerificationProvider>;
}