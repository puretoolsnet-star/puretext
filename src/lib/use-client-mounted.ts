"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useClientMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}