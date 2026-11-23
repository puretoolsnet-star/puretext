"use client";

import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { getPortalRoot } from "@/lib/release-interaction-locks";
import { useClientMounted } from "@/lib/use-client-mounted";

export function BodyPortal({ open, children }: { open: boolean; children: ReactNode }) {
  const mounted = useClientMounted();
  if (!mounted || !open) return null;
  return createPortal(children, getPortalRoot());
}