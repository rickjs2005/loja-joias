/**
 * Ponto único de verdade para links de WhatsApp.
 * NUNCA monte `wa.me` à mão em componentes — use waUrl() ou productWaUrl().
 *
 * A mensagem do produto carrega, por decisão de produto, exatamente:
 * Nome · Referência · Preço — para o vendedor identificar a peça na hora.
 */
import { theme } from "@/config/theme.config";
import { normalizePhone } from "./phone";
import { formatCents } from "./format";
import type { Product } from "@/lib/data/types";

const PHONE = normalizePhone(theme.contact.whatsapp);

/** Link genérico (mensagem livre) para o WhatsApp da loja. */
export function waUrl(message: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

/** Mensagem dinâmica de interesse em uma peça específica. */
export function productMessage(product: Product): string {
  return [
    `Olá, ${theme.brand}! Tenho interesse nesta peça:`,
    "",
    `• Peça: ${product.name}`,
    `• Referência: ${product.reference}`,
    `• Valor: ${formatCents(product.priceCents)}`,
    "",
    "Pode me passar mais detalhes?",
  ].join("\n");
}

export function productWaUrl(product: Product): string {
  return waUrl(productMessage(product));
}
