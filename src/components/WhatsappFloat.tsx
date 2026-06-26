"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useScrolled } from "@/hooks/useScrolled";
import { copy } from "@/config/copy";
import { waUrl } from "@/lib/whatsapp";
import { WhatsappGlyph } from "./ui/WhatsappCta";

/** Botão flutuante do WhatsApp — aparece após o primeiro scroll. */
export function WhatsappFloat() {
  const visible = useScrolled(400);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={waUrl(copy.wa.general)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-bg shadow-lg shadow-ink/20 transition-colors hover:bg-accent hover:text-white"
        >
          <WhatsappGlyph className="h-6 w-6" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
