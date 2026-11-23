"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type HumanVerificationState = {
  /** True after basic browser checks, no webdriver flag, and a natural interaction. */
  isVerifiedHuman: boolean;
  /** navigator.webdriver — automation hint (never overridden by interaction). */
  isAutomationFlag: boolean;
  /** User performed scroll, pointer, keyboard, or touch. */
  hasNaturalInteraction: boolean;
};

const HumanVerificationContext = createContext<HumanVerificationState | null>(null);

function readAutomationFlag(): boolean {
  if (typeof navigator === "undefined") return true;
  return navigator.webdriver === true;
}

function hasBasicBrowserSignals(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  const ua = navigator.userAgent;
  if (!ua || ua.length < 8) return false;
  try {
    const el = document.createElement("div");
    return el.nodeType === 1;
  } catch {
    return false;
  }
}

export function HumanVerificationProvider({ children }: { children: ReactNode }) {
  const [hasNaturalInteraction, setHasNaturalInteraction] = useState(false);
  const [isAutomationFlag] = useState(readAutomationFlag);
  const [basicBrowser] = useState(hasBasicBrowserSignals);
  const engagedRef = useRef(false);

  const markEngaged = useCallback(() => {
    if (engagedRef.current) return;
    engagedRef.current = true;
    setHasNaturalInteraction(true);
  }, []);

  useEffect(() => {
    if (engagedRef.current) return;
    const opts: AddEventListenerOptions = { passive: true, capture: true };
    const events: (keyof WindowEventMap)[] = ["mousemove", "scroll", "keydown", "touchstart", "pointerdown"];
    const handler = () => markEngaged();
    for (const name of events) {
      window.addEventListener(name, handler, opts);
    }
    return () => {
      for (const name of events) {
        window.removeEventListener(name, handler, opts);
      }
    };
  }, [markEngaged]);

  const value = useMemo<HumanVerificationState>(
    () => ({
      isVerifiedHuman: basicBrowser && hasNaturalInteraction && !isAutomationFlag,
      isAutomationFlag,
      hasNaturalInteraction,
    }),
    [basicBrowser, hasNaturalInteraction, isAutomationFlag],
  );

  return <HumanVerificationContext.Provider value={value}>{children}</HumanVerificationContext.Provider>;
}

export function useHumanVerification(): HumanVerificationState {
  const ctx = useContext(HumanVerificationContext);
  if (!ctx) {
    return {
      isVerifiedHuman: false,
      isAutomationFlag: false,
      hasNaturalInteraction: false,
    };
  }
  return ctx;
}