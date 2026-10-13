/**
 * Configuração white-label da loja.
 * TODA personalização (marca, contatos, cores, redes) vive aqui.
 * Nenhum componente deve hardcodar marca/cor/telefone — sempre importe daqui.
 *
 * As cores são consumidas como CSS variables em `globals.css` (@theme inline).
 * Para trocar a paleta, altere os valores em `colors` e os mesmos hex
 * em `:root` no globals.css (mantidos espelhados de propósito, sem build step).
 */

export const theme = {
  /** Nome da marca exibido no site. Troque por 1 linha. */
  brand: "ÁUREA",
  /** Assinatura curta sob o logo / no <title>. */
  tagline: "Joias e Semijoias de Alto Padrão",
  /** Domínio canônico (para SEO/OG). Ajuste no deploy. */
  siteUrl: "https://loja-joias-two.vercel.app",

  contact: {
    /** Número cru — será normalizado por src/lib/phone.ts. */
    whatsapp: "33998779375",
    /** @ exibido no site (marca fictícia nesta demo). */
    instagram: "aurea.joias",
    /**
     * Link dos botões de Instagram. Na demo aponta para a página inicial do
     * Instagram (o @ acima é fictício e não deve levar ao perfil de terceiros).
     * Ao personalizar, troque pela URL real do perfil da loja.
     */
    instagramUrl: "https://www.instagram.com/",
    email: "contato@aurea.example",
    city: "Manhuaçu — MG",
  },

  /** Paleta editorial clara. Espelhada em globals.css (:root). */
  colors: {
    bg: "#FAF8F6", // off-white de fundo
    surface: "#FFFFFF", // cartões / superfícies
    ink: "#1B1B1B", // texto principal (preto)
    muted: "#6E6A63", // texto secundário (legível em corpo de texto)
    soft: "#8B8B8B", // cinza claro da marca (detalhes/legendas)
    line: "#E7E0D6", // bordas / divisórias
    accent: "#9C7B45", // dourado p/ texto (contraste AA)
    accentSoft: "#C7AE83", // dourado suave (realces grandes/decor)
  },
} as const;

export type Theme = typeof theme;
