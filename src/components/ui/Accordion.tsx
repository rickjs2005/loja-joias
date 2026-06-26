"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

/** Accordion no estilo shadcn/ui, sobre Radix — acessível e animado. */
export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item className={cn("border-b border-line", className)} {...props} />
  );
}

export function AccordionTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-6 text-left font-display text-lg tracking-tight transition-colors hover:text-accent md:text-xl",
          className,
        )}
        {...props}
      >
        {children}
        <Plus className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-data-[state=open]:rotate-45" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-[acc-up_0.3s_ease] data-[state=open]:animate-[acc-down_0.3s_ease]"
      {...props}
    >
      <div className={cn("max-w-2xl pb-6 leading-relaxed text-muted", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
