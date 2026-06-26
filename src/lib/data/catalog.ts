import "server-only";
import type { Category, Product } from "./types";

/**
 * Catálogo da loja (fonte única). Sem banco de dados: para adicionar uma peça,
 * inclua um objeto aqui. As fotos vivem em `/public/pecas/` e são referenciadas
 * em `images` (ex.: "/pecas/aur-a01.jpg"). A primeira imagem é a capa.
 * Sem `images`, o site exibe um marcador visual elegante e determinístico.
 *
 * Preços em CENTAVOS (inteiro).
 */
const PRODUCTS: Product[] = [
  {
    reference: "AUR-A01",
    name: "Anel Flor de Aurora",
    category: "aneis",
    priceCents: 489000,
    material: "Ouro 18k",
    stone: "Diamantes",
    description:
      "Um buquê de diamantes em arranjo floral sobre aro fino que quase desaparece na mão. Delicado de perto, luminoso de longe.",
    images: ["/pecas/aur-a01.jpg"],
    badge: "Mais procurado",
    featured: true,
  },
  {
    reference: "AUR-A03",
    name: "Anel Esmeralda Halo",
    category: "aneis",
    priceCents: 386000,
    material: "Ouro branco 18k",
    stone: "Esmeralda",
    description:
      "Esmeralda de corte quadrado abraçada por um halo de diamantes. Verde profundo e brilho frio do ouro branco — uma peça de presença.",
    images: ["/pecas/aur-a03.jpg"],
    badge: "Edição única",
    featured: true,
  },
  {
    reference: "AUR-C03",
    name: "Colar de Pérolas Clássico",
    category: "colares",
    priceCents: 224000,
    material: "Ouro 18k",
    stone: "Pérolas",
    description:
      "Fio graduado de pérolas de água doce com fecho em ouro. O colar que atravessa gerações sem nunca sair de moda.",
    images: ["/pecas/aur-c03.jpg"],
    featured: true,
  },
  {
    reference: "AUR-A02",
    name: "Aliança Eterna Lisa",
    category: "aneis",
    priceCents: 198000,
    material: "Ouro 18k",
    description:
      "Alianças de perfil abaulado, polidas à mão para um brilho profundo. Conforto pensado para o uso diário, por décadas.",
    images: ["/pecas/aur-a02.jpg"],
  },
  {
    reference: "AUR-C01",
    name: "Colar Fio de Luz",
    category: "colares",
    priceCents: 175000,
    material: "Ouro 18k",
    description:
      "Corrente delicada com micro pingente geométrico que pousa exatamente na clavícula. Leve o bastante para não tirar nunca.",
    images: ["/pecas/aur-c01.jpg"],
  },
  {
    reference: "AUR-C02",
    name: "Colar Gota Dourada",
    category: "colares",
    priceCents: 268000,
    material: "Ouro 18k",
    description:
      "Pingente em forma de gota com miolo trabalhado em dois tons de ouro. Volume na medida certa para um colar de assinatura.",
    images: ["/pecas/aur-c02.jpg"],
  },
  {
    reference: "AUR-B01",
    name: "Brincos Gota de Orvalho",
    category: "brincos",
    priceCents: 242000,
    material: "Ouro 18k",
    stone: "Pérolas",
    description:
      "Cachos de pérolas que balançam de leve a cada movimento, sobre base de ouro texturizado. Movimento e luz na mesma peça.",
    images: ["/pecas/aur-b01.jpg"],
  },
  {
    reference: "AUR-B02",
    name: "Argolas Torção",
    category: "brincos",
    priceCents: 142000,
    material: "Ouro 18k",
    description:
      "Argolas de volume médio com torção em corda — o brilho do ouro multiplicado pela textura. O básico que nunca é demais.",
    images: ["/pecas/aur-b02.jpg"],
  },
  {
    reference: "AUR-P01",
    name: "Bracelete Serpente",
    category: "pulseiras",
    priceCents: 542000,
    material: "Ouro 18k",
    stone: "Diamantes",
    description:
      "A serpente que envolve o pulso, toda cravejada de diamantes, com olhos em pedra verde. Símbolo de eternidade, em alto brilho.",
    images: ["/pecas/aur-p01.jpg"],
    badge: "Edição única",
  },
  {
    reference: "AUR-P02",
    name: "Pulseira Elos",
    category: "pulseiras",
    priceCents: 329000,
    material: "Ouro 18k",
    description:
      "Elos largos de caimento firme, para usar sozinha ou em camadas. Presença discreta com ar contemporâneo.",
    images: ["/pecas/aur-p02.jpg"],
  },
  {
    reference: "AUR-CJ01",
    name: "Conjunto Jardim Imperial",
    category: "conjuntos",
    priceCents: 798000,
    material: "Ouro 18k",
    stone: "Pérolas e esmeraldas",
    description:
      "Colar e brincos em harmonia: folhas de ouro escovado, cachos de pérolas e flores com esmeralda ao centro. Um conjunto de gala, feito para noites que pedem presença.",
    images: ["/pecas/aur-cj01.jpg"],
    badge: "Conjunto completo",
    featured: true,
  },
];

export function getAllProducts(): Product[] {
  return [...PRODUCTS].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}

export function getProductByReference(reference: string): Product | undefined {
  return PRODUCTS.find((p) => p.reference.toLowerCase() === reference.toLowerCase());
}

export function getByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}
