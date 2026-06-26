# Convenções do projeto (AURÉA — vitrine de joalheria)

Stack: **Next.js 15** (App Router) + TypeScript + **Tailwind v4** + Framer Motion.
Sem banco de dados: catálogo em `src/lib/data/catalog.ts`.

> **Modelo de produto: VITRINE → WhatsApp.** Não existe carrinho, checkout nem
> pagamento — por decisão de produto. Todo CTA de compra abre o WhatsApp com
> **Nome · Referência · Preço**. Não adicione carrinho/checkout sem pedido
> explícito.

## Regras ao editar

- **Personalização**: marca/cores/contatos só em `src/config/theme.config.ts`;
  textos de marketing só em `src/config/copy.ts`. Nunca hardcode cor em
  componente — use os utilitários do tema (`bg-bg`, `bg-surface`, `text-ink`,
  `text-muted`, `text-accent`, `border-line`...).
- **WhatsApp**: número normalizado por `src/lib/phone.ts`; links só via
  `waUrl()`, `productWaUrl()` ou `<WhatsappCta>`. Nunca monte `wa.me` na mão.
- **Preços em centavos** (inteiro) no catálogo; formate com `formatCents()`.
- **Animações**: variantes reutilizáveis em `src/lib/motion.ts`; entrada por
  scroll via `<Reveal>`. `prefers-reduced-motion` é tratado no `globals.css`.
- **Tailwind v4**: tema CSS-first (`@theme inline` em `globals.css`), sem
  `tailwind.config`. Cores vêm de CSS variables `--store-*` (espelhadas no
  `theme.config.ts`).
- **Imagens**: use `<PieceImage>` — renderiza foto real (`/public/pecas/`) ou um
  marcador editorial determinístico. Não use `<img>` direto.
- Componentes pequenos, de responsabilidade única; primitivas em
  `src/components/ui/`.

## Comandos

```bash
npm run dev      # desenvolvimento
npm run build    # build (valida tipos + lint)
npm run lint     # eslint
npx tsc --noEmit # checagem de tipos isolada
```
