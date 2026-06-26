/** Categorias da joalheria. Usadas no filtro da coleção. */
export const CATEGORIES = ["aneis", "brincos", "colares", "pulseiras", "conjuntos"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  aneis: "Anéis",
  brincos: "Brincos",
  colares: "Colares",
  pulseiras: "Pulseiras",
  conjuntos: "Conjuntos",
};

/** Singular para textos de UI ("Ver anel"). */
export const CATEGORY_SINGULAR: Record<Category, string> = {
  aneis: "Anel",
  brincos: "Brinco",
  colares: "Colar",
  pulseiras: "Pulseira",
  conjuntos: "Conjunto",
};

export type Product = {
  /** Referência (SKU) — vai na mensagem do WhatsApp. Única. */
  reference: string;
  name: string;
  category: Category;
  priceCents: number;
  /** Material principal (ex.: "Ouro 18k"). */
  material: string;
  /** Pedra principal, se houver. */
  stone?: string;
  description: string;
  /** Imagens (a primeira é a capa). */
  images: string[];
  /** Selo opcional exibido no card (ex.: "Edição única"). */
  badge?: string;
  /** Destaque na home (ordena primeiro). */
  featured?: boolean;
};
