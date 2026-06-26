"use client";

import { copy } from "@/config/copy";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/Accordion";

export function Faq() {
  const { eyebrow, title, items } = copy.faq;

  return (
    <section id="faq" className="scroll-mt-24 py-20 md:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" className="mx-auto" />

        <Accordion type="single" collapsible className="mt-12 border-t border-line">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
