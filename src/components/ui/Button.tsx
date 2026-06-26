"use client";

import { useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { Magnetic } from "./Magnetic";

const button = cva(
  "relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium uppercase tracking-wide transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-ink text-bg hover:bg-accent hover:text-white",
        gold: "bg-accent text-white hover:bg-ink",
        outline: "border border-ink/20 text-ink hover:border-accent hover:text-accent",
        ghost: "text-ink hover:text-accent",
      },
      size: {
        sm: "px-5 py-2.5 text-xs",
        md: "px-7 py-3.5 text-sm",
        lg: "px-9 py-4 text-sm",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type Ripple = { id: number; x: number; y: number; size: number };

type BaseProps = VariantProps<typeof button> & {
  children: React.ReactNode;
  className?: string;
  magnetic?: boolean;
  /** Se informado, renderiza <a>; caso contrário <button>. */
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  "aria-label"?: string;
};

/** CTA premium: variantes (cva), ripple dourado no clique e efeito magnético. */
export function Button({
  children,
  className,
  variant,
  size,
  magnetic = true,
  href,
  ...rest
}: BaseProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);

  const spawn = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const id = idRef.current++;
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size },
    ]);
    window.setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 650);
  };

  const classes = cn(button({ variant, size }), className);
  const ripple = ripples.map((r) => (
    <span
      key={r.id}
      className="pointer-events-none absolute animate-[ripple_0.65s_ease-out] rounded-full bg-white/30"
      style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
    />
  ));

  const inner = href ? (
    <a href={href} className={classes} onClick={spawn} {...rest}>
      {ripple}
      <span className="relative z-[1] inline-flex items-center gap-2.5">{children}</span>
    </a>
  ) : (
    <button className={classes} onClick={(e) => spawn(e)} {...rest}>
      {ripple}
      <span className="relative z-[1] inline-flex items-center gap-2.5">{children}</span>
    </button>
  );

  return magnetic ? <Magnetic className="inline-flex">{inner}</Magnetic> : inner;
}
