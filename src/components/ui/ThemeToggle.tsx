"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

/** Lê a classe `.dark` do <html> de forma reativa (sem setState-em-effect). */
function useIsDark(): boolean {
  const subscribe = useCallback((cb: () => void) => {
    const obs = new MutationObserver(cb);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  const getSnapshot = () => document.documentElement.classList.contains("dark");
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Botão claro/escuro. Alterna a classe no <html> e persiste em localStorage. */
export function ThemeToggle({ className }: { className?: string }) {
  const dark = useIsDark();

  const toggle = () => {
    const el = document.documentElement;
    const next = !el.classList.contains("dark");
    el.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      data-cursor="hover"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent",
        className,
      )}
    >
      {dark ? <Sun className="h-4 w-4" strokeWidth={1.6} /> : <Moon className="h-4 w-4" strokeWidth={1.6} />}
    </button>
  );
}
