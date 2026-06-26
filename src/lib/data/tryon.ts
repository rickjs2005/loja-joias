/**
 * Opções do Espelho Virtual (try-on). Client-safe (sem server-only): espelha
 * algumas peças do catálogo com um "kind" que define como o desenho dourado é
 * renderizado sobre o rosto. Mantenha os `reference`/`priceCents` em sincronia
 * com src/lib/data/catalog.ts.
 */
export type TryOnKind = "hoop" | "drop" | "pearls-ear" | "chain" | "pendant" | "pearls-neck";

export type TryOnItem = {
  reference: string;
  name: string;
  priceCents: number;
  type: "earring" | "necklace";
  kind: TryOnKind;
};

export const TRYON_ITEMS: TryOnItem[] = [
  { reference: "AUR-B02", name: "Argolas Torção", priceCents: 142000, type: "earring", kind: "hoop" },
  { reference: "AUR-B01", name: "Brincos Gota de Orvalho", priceCents: 242000, type: "earring", kind: "drop" },
  { reference: "AUR-C01", name: "Colar Fio de Luz", priceCents: 175000, type: "necklace", kind: "chain" },
  { reference: "AUR-C02", name: "Colar Gota Dourada", priceCents: 268000, type: "necklace", kind: "pendant" },
  { reference: "AUR-C03", name: "Colar de Pérolas Clássico", priceCents: 224000, type: "necklace", kind: "pearls-neck" },
];
