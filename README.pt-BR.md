# AURÉA — Vitrine de Joalheria (funil para WhatsApp)

Vitrine premium (estética editorial clara) para joalheria autoral. **Não é
e-commerce**: não há carrinho, checkout nem pagamento. Todo CTA abre o WhatsApp
com uma mensagem pronta contendo **Nome · Referência · Preço** da peça.

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** (tema CSS-first, sem `tailwind.config`)
- **Framer Motion** + **GSAP** (animações; respeitam `prefers-reduced-motion`)
- **Lenis** (smooth scroll), **shadcn/ui** (Radix Accordion), **lucide-react**
- **@mediapipe/tasks-vision** (Espelho Virtual / try-on)
- Catálogo em arquivo (sem banco de dados)

## Páginas

- `/` — home premium: hero com parallax/partículas, coleções, destaques,
  marca, diferenciais, depoimentos, Instagram, FAQ.
- `/pecas/[ref]` — página da peça: galeria com zoom, materiais, garantia,
  cuidados, relacionados, JSON-LD.
- `/experimentar` — **Espelho Virtual**: prova brincos e colares pela câmera em
  tempo real (MediaPipe FaceLandmarker), captura foto, compartilha e leva ao
  WhatsApp. Processamento 100% no navegador; o modelo carrega de CDN sob demanda.

### Microinterações / efeitos reutilizáveis

`Button` (ripple + magnético), `CustomCursor`, `LuxuryReflection` (mirror via
`-webkit-box-reflect`), `TextReveal`, `ScrollProgress`, `Reveal` (blur/fade),
`Showcase` (vitrine 3D nos cards — ver [docs/vitrine-3d.md](docs/vitrine-3d.md)).

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção (valida tipos + lint)
npm run start    # serve o build
```

## Personalização (white-label)

Tudo que muda de loja para loja está em dois arquivos — nenhum componente
precisa ser editado:

| O quê | Onde |
|---|---|
| Nome da marca, WhatsApp, Instagram, e-mail, cidade, **cores** | `src/config/theme.config.ts` |
| Textos de marketing (hero, seções, CTAs) | `src/config/copy.ts` |
| Catálogo de peças | `src/lib/data/catalog.ts` |

> As cores ficam espelhadas em `src/app/globals.css` (`:root`) e no
> `theme.config.ts`. Ao trocar a paleta, ajuste os dois (mantidos em sincronia
> manual, sem build step).

### WhatsApp

O número fica só em `theme.config.ts` e é normalizado por `src/lib/phone.ts`.
Links **sempre** via `waUrl()` / `productWaUrl()` / `<WhatsappCta>`
(`src/lib/whatsapp.ts`) — nunca monte `wa.me` à mão.

### Fotos das peças

O projeto **já vem com fotos reais** de joias em `public/pecas/` (uma por peça,
nomeadas pelo código: `aur-a01.jpg`, `aur-c03.jpg`...). Para trocar pelas suas:

1. Substitua o arquivo em `public/pecas/` (mantendo o nome) **ou** adicione um
   novo arquivo lá.
2. Ajuste o array `images` da peça em `src/lib/data/catalog.ts` (a primeira é a
   capa; liste várias para a galeria):
   ```ts
   images: ["/pecas/aur-a01.jpg", "/pecas/aur-a01-2.jpg"],
   ```

Se uma peça ficar **sem** `images`, o site mostra automaticamente um marcador
editorial (gradiente creme→dourado com ícone da categoria).

## Estrutura

```
src/
  app/                 layout, home, /pecas/[reference], sitemap, robots, 404
  components/          seções da página (Hero, Collection, Atelier, ...)
    ui/                primitivas reutilizáveis (Container, Reveal, WhatsappCta, ...)
  config/              theme.config.ts (marca/cores) + copy.ts (textos)
  hooks/               useScrolled
  lib/                 phone, format, whatsapp, motion, cn, data/ (catálogo + tipos)
```
