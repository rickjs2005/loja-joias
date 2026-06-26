/**
 * Normaliza um número de WhatsApp para o formato aceito pelo wa.me:
 * apenas dígitos, com DDI do Brasil (55) garantido.
 *
 * Aceita entradas como "33998779375", "(33) 99877-9375", "+55 33 99877-9375".
 */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("55")) return digits;
  return `55${digits}`;
}
