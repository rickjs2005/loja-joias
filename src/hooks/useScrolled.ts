"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * True quando a página rolou além de `threshold` px (para header sticky e
 * botão flutuante). Usa useSyncExternalStore para ler o scroll sem
 * setState-em-effect — sem render em cascata e seguro no SSR (snapshot = false).
 */
export function useScrolled(threshold = 24): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("scroll", onChange, { passive: true });
    return () => window.removeEventListener("scroll", onChange);
  }, []);

  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
