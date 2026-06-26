import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Junta e resolve conflitos de classes Tailwind (padrão shadcn/ui). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
