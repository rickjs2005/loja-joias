"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { theme } from "@/config/theme.config";
import { copy } from "@/config/copy";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";
import { Container } from "./ui/Container";
import { WhatsappCta } from "./ui/WhatsappCta";
import { Logo } from "./ui/Logo";
import { ThemeToggle } from "./ui/ThemeToggle";

/** Usa <Link> para rotas e <a> para âncoras (#sec / /#sec). */
function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const isHash = href.startsWith("#") || href.startsWith("/#");
  if (isHash) {
    return (
      <a href={href} className={className} onClick={onClick} data-cursor="hover">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick} data-cursor="hover">
      {children}
    </Link>
  );
}

export function Header() {
  const scrolled = useScrolled(32);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line/70 bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label={theme.brand} data-cursor="hover">
          <Logo className="h-9 md:h-11" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {copy.nav.links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <WhatsappCta variant="outline" className="px-5 py-2.5 text-xs">
            {copy.nav.cta}
          </WhatsappCta>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <Burger open={open} />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-bg md:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {copy.nav.links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 font-display text-2xl tracking-tight"
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-4">
                <WhatsappCta className="w-full">{copy.nav.cta}</WhatsappCta>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <div className="relative h-4 w-6">
      <span
        className={cn(
          "absolute left-0 block h-px w-6 bg-ink transition-all duration-300",
          open ? "top-2 rotate-45" : "top-0.5",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-2 block h-px w-6 bg-ink transition-all duration-300",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 block h-px w-6 bg-ink transition-all duration-300",
          open ? "top-2 -rotate-45" : "top-[14px]",
        )}
      />
    </div>
  );
}
