/**
 * Todo o texto de marketing da vitrine (títulos, frases, CTAs).
 * Rótulos de UI genéricos ("Ver no WhatsApp") podem ficar no componente,
 * mas a copy de venda vive aqui para edição sem mexer em layout.
 */

import { theme } from "./theme.config";

export const copy = {
  /** Mensagens de pré-preenchimento do WhatsApp (sem peça específica). */
  wa: {
    general: `Olá, ${theme.brand}! Vim pelo site e quero conhecer as peças.`,
    atelier: `Olá, ${theme.brand}! Quero encomendar uma peça exclusiva. Pode me ajudar?`,
    visit: `Olá, ${theme.brand}! Gostaria de agendar uma visita ao atelier.`,
  },

  nav: {
    links: [
      { label: "Coleção", href: "/#colecao" },
      { label: "A Marca", href: "/#sobre" },
      { label: "Experimentar", href: "/experimentar" },
      { label: "Visite", href: "/#visite" },
    ],
    cta: "Falar no WhatsApp",
  },

  hero: {
    eyebrow: "Peças autorais · feitas à mão",
    /** Linhas do título; a palavra de destaque (itálico dourado) vem em `titleAccent`. */
    title: "Joias que\nguardam",
    titleAccent: "histórias",
    subtitle:
      `Cada peça da ${theme.brand} nasce no atelier — ouro 18k e pedras selecionadas, lapidadas à mão para durar gerações.`,
    primaryCta: "Explorar Coleção",
    secondaryCta: "Falar com o atelier",
    /** Selos curtos exibidos abaixo dos CTAs, separados por ponto. */
    trust: ["Ouro 18k", "Feito à mão", "Garantia vitalícia"],
  },

  marquee: ["Ouro 18k", "Feito à mão", "Pedras naturais", "Garantia vitalícia", "Manhuaçu · MG"],

  trust: [
    { title: "Ouro 18k certificado", desc: "Procedência garantida em cada peça." },
    { title: "Feito sob encomenda", desc: "Ajustes de tamanho e gravação sem custo." },
    { title: "Atendimento pessoal", desc: "Você fala direto com o atelier, no WhatsApp." },
  ],

  categories: {
    eyebrow: "Coleções",
    title: "Encontre o seu brilho",
    items: [
      { key: "aneis", label: "Anéis", image: "/pecas/aur-a01.jpg" },
      { key: "brincos", label: "Brincos", image: "/pecas/aur-b01.jpg" },
      { key: "colares", label: "Colares", image: "/pecas/aur-c03.jpg" },
      { key: "pulseiras", label: "Pulseiras", image: "/pecas/aur-p01.jpg" },
      { key: "conjuntos", label: "Conjuntos", image: "/pecas/aur-cj01.jpg" },
    ],
  },

  collection: {
    eyebrow: "A coleção",
    title: "Peças disponíveis",
    subtitle: "Toque em qualquer peça para conversar — referência e valor já vão na mensagem.",
  },

  diferenciais: {
    eyebrow: "Por que a AURÉA",
    title: "Luxo é estar nos detalhes",
    items: [
      { icon: "ShieldCheck", title: "Garantia vitalícia", desc: "Cada peça acompanha garantia e procedência registrada." },
      { icon: "Gem", title: "Ouro 18k e pedras naturais", desc: "Matéria-prima selecionada, nada de banho ou imitação." },
      { icon: "Hand", title: "Feito à mão", desc: "Peças autorais, produzidas uma a uma no atelier." },
      { icon: "Sparkles", title: "Peças selecionadas", desc: "Curadoria enxuta — só o que merece o nome AURÉA." },
      { icon: "MessageCircle", title: "Atendimento pessoal", desc: "Você fala direto com quem cria, pelo WhatsApp." },
      { icon: "Truck", title: "Entrega segura", desc: "Envio assegurado para todo o Brasil, com rastreio." },
    ],
  },

  depoimentos: {
    eyebrow: "Quem usa, ama",
    title: "Histórias que brilham",
    items: [
      { name: "Marina Alves", city: "Belo Horizonte — MG", text: "Comprei o colar de pérolas para o casamento da minha irmã. Chegou impecável e o atendimento foi de outro mundo." },
      { name: "Carla Menezes", city: "Vitória — ES", text: "O anel de esmeralda é ainda mais lindo pessoalmente. Dá pra sentir que é feito à mão, peça única mesmo." },
      { name: "Roberta Dias", city: "Manhuaçu — MG", text: "Atendimento todo pelo WhatsApp, sem enrolação. Me ajudaram a escolher o conjunto perfeito para presentear minha mãe." },
      { name: "Juliana Castro", city: "Juiz de Fora — MG", text: "Já é a terceira peça que compro. Qualidade do ouro impecável e o acabamento é de joalheria internacional." },
    ],
  },

  instagram: {
    eyebrow: "@aurea.joias",
    title: "Acompanhe no Instagram",
    subtitle: "Bastidores do atelier, novas peças e clientes reais.",
    cta: "Seguir no Instagram",
  },

  faq: {
    eyebrow: "Dúvidas",
    title: "Perguntas frequentes",
    items: [
      { q: "Como funciona a compra?", a: "Toda a negociação acontece pelo WhatsApp. Você escolhe a peça no site, toca em \"Tenho interesse\" e já abrimos a conversa com nome, referência e valor preenchidos. Forma de pagamento e entrega são combinadas no chat." },
      { q: "As joias são de ouro de verdade?", a: "Sim. Trabalhamos com ouro 18k e semijoias de alto padrão, sempre com a composição informada. Nada de banho frágil ou imitação." },
      { q: "Vocês entregam em todo o Brasil?", a: "Entregamos para todo o país com envio assegurado e código de rastreio. O prazo é combinado no atendimento." },
      { q: "Tem garantia?", a: "Sim, garantia vitalícia contra defeitos de fabricação, além de procedência registrada de cada peça." },
      { q: "Posso encomendar uma peça exclusiva?", a: "Com certeza. Fazemos peças sob encomenda — do desenho ao acabamento. Fale com o atelier no WhatsApp para começar o seu projeto." },
    ],
  },

  atelier: {
    eyebrow: "O atelier",
    title: "Feitas à mão, uma a uma",
    body: [
      "Não trabalhamos com produção em escala. Cada anel, colar ou brinco é desenhado e executado à mão, com tempo de sobra para o detalhe.",
      "É por isso que a coleção é pequena e muda devagar — e por isso cada peça é, de verdade, única.",
    ],
    cta: "Encomendar uma peça exclusiva",
  },

  store: {
    eyebrow: "Visite o atelier",
    title: "Onde o ouro vira história",
    address: `${theme.contact.city}`,
    hours: "Seg a Sex · 9h às 18h · Sáb · 9h às 13h",
    note: "Atendimento com hora marcada para experimentar as peças com calma.",
    cta: "Agendar visita",
  },

  finalCta: {
    title: "Encontrou a sua?",
    subtitle: "Mande uma mensagem — respondemos rápido e sem compromisso.",
    cta: "Falar no WhatsApp",
  },

  produto: {
    garantia:
      "Garantia vitalícia contra defeitos de fabricação. Cada peça acompanha certificado de procedência e nota fiscal. Ajustes de tamanho e gravação são feitos sem custo no atelier.",
    cuidados:
      "Guarde a peça separada das demais, em local seco. Evite contato com perfumes, cremes e produtos de limpeza. Para o brilho, limpe com flanela macia. Pérolas e pedras naturais pedem cuidado extra — sem imersão em água.",
    ctaHelper:
      "Ao tocar, abrimos o WhatsApp com o nome, a referência e o valor já preenchidos. Sem pagamento online — combinamos tudo na conversa.",
  },

  footer: {
    about: "Joalheria contemporânea feita à mão. Ouro 18k e pedras naturais.",
    rights: `© ${"2026"} ${theme.brand}. Todos os direitos reservados.`,
  },
} as const;
