[English](README.md) | **Português**

# ÁUREA — Vitrine de Joalheria (funil para WhatsApp)

Vitrine premium (estética editorial clara) para uma joalheria autoral **fictícia**
("ÁUREA"). **Não é e-commerce**: não há carrinho, checkout nem pagamento. Todo
CTA abre o WhatsApp com uma mensagem pronta contendo **Nome · Referência · Preço**
da peça.

> **Tipo:** demo comercial (marca fictícia; peças, preços e depoimentos são ilustrativos) · **Demo:** https://loja-joias-two.vercel.app

![Página inicial da vitrine ÁUREA](docs/screenshots/home.webp)

## Funcionalidades

- **`/`** — home: hero com parallax/partículas, coleções por categoria, destaques,
  marca/atelier, diferenciais, depoimentos, grade de Instagram, FAQ e visita à loja.
- **`/pecas/[reference]`** — página da peça (11 peças, geradas estaticamente):
  galeria com zoom, materiais, garantia, cuidados, relacionadas e JSON-LD de produto.
- **`/experimentar`** — **Espelho Virtual**: prova brincos e colares pela câmera em
  tempo real (MediaPipe FaceLandmarker), captura foto, compartilha e leva ao
  WhatsApp. O processamento acontece no navegador; o runtime WASM e o modelo são
  baixados sob demanda de CDNs públicas (jsDelivr e Google Storage).
- Alternância de tema claro/escuro, `sitemap.xml`, `robots.txt` e página 404.
- Microinterações reutilizáveis: `Button` (ripple + magnético), `CustomCursor`,
  `LuxuryReflection`, `TextReveal`, `ScrollProgress`, `Reveal` e `Showcase`
  (vitrine 3D nos cards — ver [docs/vitrine-3d.md](docs/vitrine-3d.md)).

![Espelho Virtual](docs/screenshots/experimentar.webp)

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** (tema CSS-first, sem `tailwind.config`)
- **Framer Motion** + **GSAP** (animações; respeitam `prefers-reduced-motion`)
- **Lenis** (smooth scroll), Radix Accordion, **lucide-react**
- **@mediapipe/tasks-vision** (Espelho Virtual)
- Catálogo em arquivo (`src/lib/data/catalog.ts`), sem banco de dados

## Pré-requisitos e execução

Node.js 20 ou superior (testado com Node 22) e npm.

```bash
npm ci
npm run dev      # http://localhost:3000
```

Não há variáveis de ambiente.

### Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run start` | serve o build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | checagem de tipos |

## Personalização (white-label)

| O quê | Onde |
|---|---|
| Marca, WhatsApp, Instagram (@ e URL), e-mail, cidade, URL do site, **cores** | `src/config/theme.config.ts` |
| Textos de marketing (hero, seções, CTAs, depoimentos) | `src/config/copy.ts` |
| Catálogo de peças | `src/lib/data/catalog.ts` |

As cores ficam espelhadas em `src/app/globals.css` (`:root`) e no
`theme.config.ts`; ao trocar a paleta, ajuste os dois.

**WhatsApp:** o número fica só em `theme.config.ts` e é normalizado por
`src/lib/phone.ts`. Links sempre via `waUrl()` / `productWaUrl()` /
`<WhatsappCta>` (`src/lib/whatsapp.ts`). Na demo, o número configurado é o
contato comercial da MilWeb, autora do projeto.

**Contatos fictícios:** o e-mail usa o domínio reservado `aurea.example` e os
botões de Instagram apontam para a página inicial do Instagram — o @ exibido é
fictício. Troque `instagramUrl` pela URL real ao personalizar.

**Fotos das peças:** ficam em `public/pecas/` (uma por peça, nomeadas pelo
código, ex.: `aur-a01.jpg`) e são listadas no array `images` de cada peça em
`catalog.ts`. Sem `images`, o site mostra um marcador editorial (gradiente com
ícone da categoria).

## Estrutura

```
src/
  app/          layout, home, /pecas/[reference], /experimentar, sitemap, robots, 404
  components/   seções da página (Hero, Collection, Atelier, ...)
    ui/         primitivas reutilizáveis (Container, Reveal, WhatsappCta, Showcase, ...)
    mirror/     Espelho Virtual
  config/       theme.config.ts (marca/cores/contatos) + copy.ts (textos)
  hooks/        useScrolled
  lib/          phone, format, whatsapp, motion, cn, mirror/, data/ (catálogo + tipos)
docs/           documentação do efeito vitrine 3D e capturas de tela
```

## Limitações

- Sem carrinho, checkout, pagamento, estoque ou painel administrativo (decisão de produto).
- Catálogo, preços, depoimentos e dados da loja são fictícios e ficam no código.
- O Espelho Virtual depende de câmera, de um navegador com WebAssembly e do download do modelo a partir de CDNs externas.

## Créditos

As fotos de `public/pecas/` parecem ser fotografias de banco de imagens; a origem
e a licença não estão documentadas no repositório (uma delas traz nos metadados
EXIF o crédito do fotógrafo Atul Mohan). O logotipo em `public/` também não tem
origem documentada.

## Segurança

Veja [SECURITY.md](SECURITY.md).

## Licença

Ainda não há licença definida; todos os direitos reservados ao autor.
