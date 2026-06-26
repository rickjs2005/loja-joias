/**
 * Preços ficam em centavos (inteiro) no catálogo e são formatados aqui.
 * Evita erro de ponto flutuante e centraliza a moeda (BRL).
 */
const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatCents(cents: number): string {
  return BRL.format(cents / 100);
}
