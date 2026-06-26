# Vitrine 3D — efeito de exposição nos cards

Componente: `src/components/ui/Showcase.tsx`
Usado em: `src/components/ProductCard.tsx`
CSS de apoio: utilitário `.vitrine-sheen` + keyframe `vitrine-sweep` em `src/app/globals.css`

Cada card da coleção vira uma **vitrine de museu**: a joia "flutua" à frente de
um pedestal de vidro, sob um holofote, atrás de uma tampa de vidro com reflexo.
O efeito é todo em CSS 3D + Framer Motion (GPU, 60fps) — sem WebGL, sem libs
extras.

## Anatomia (camadas em profundidade real)

O container ganha `transform-style: preserve-3d` e perspectiva. Cada camada fica
numa profundidade `translateZ` diferente, então **ao inclinar há parallax de
verdade** — a joia se move sobre o pedestal, o vidro se move sobre a joia.

| Camada | `translateZ` | Papel |
|---|---|---|
| Moldura / aresta de vidro | `+62px` | borda da tampa + sombra interna |
| Reflexo do vidro (sheen) | `+60px` | faixa diagonal que varre no hover |
| Brilho que segue o cursor (glare) | `+60px` | highlight radial sob o ponteiro |
| Holofote de museu | `+58px` | cone de luz vindo do topo |
| **A joia** (`children`) | `+45px` | flutua à frente do pedestal |
| Pedestal + pool de luz no piso | `−30px` | base recuada, linha dourada, luz no chão |

> **Por que o vidro fica à frente da joia (Z maior)?** A foto da peça é opaca
> (`object-cover`). Qualquer camada com Z menor ficaria escondida atrás dela.
> Colocando holofote/brilho/moldura num Z **maior** que o da joia, eles agem como
> a tampa de vidro da vitrine — visíveis por cima, como na vida real.

## Interações

- **Inclinação:** segue o cursor nos eixos X/Y (ângulo máx. `max`, padrão `10°`),
  com mola suave (`useSpring`). Volta ao centro ao tirar o mouse.
- **Brilho de vidro (glare):** gradiente radial branco cuja posição acompanha o
  cursor (`useMotionTemplate`), aparece só no hover.
- **Reflexo (sheen):** faixa de luz diagonal varre o vidro uma vez no hover
  (`@keyframes vitrine-sweep`).
- **Holofote + pool de luz:** acendem no hover; a luz no piso se alarga, dando a
  sensação de peça iluminada em exposição.

## Acessibilidade / desempenho

- Respeita `prefers-reduced-motion`: a **inclinação é desativada** (o componente
  checa `useReducedMotion`); a moldura/holofote estáticos permanecem.
- A inclinação só é perceptível em ponteiro fino (desktop). No toque, o card
  mostra moldura, holofote e pedestal, sem o tilt seguindo o dedo.
- Tudo é `transform`/`opacity` (compositável na GPU). As sobreposições são
  `pointer-events-none` e `aria-hidden` — não afetam clique nem leitor de tela.

## Como ajustar

```tsx
// ProductCard.tsx
<Showcase className="rounded-xl">{/* imagem da peça */}</Showcase>
```

- **Intensidade da inclinação:** prop `max` no `<Showcase>` (graus por eixo).
- **Quanto a joia "salta":** o `translateZ(45px)` da `<div>` da peça em
  `Showcase.tsx`. Suba para um efeito mais dramático; as camadas de vidro
  (`+58…+62px`) devem permanecer **acima** desse valor.
- **Holofote / luz no piso:** os gradientes `radial-gradient(...)` inline no
  componente.
- **Velocidade do reflexo:** a duração da animação `vitrine-sweep` em
  `globals.css`.

## Reutilizar em outros cards

`Showcase` é genérico: aceita qualquer `children` (a peça em destaque) e cuida
de toda a moldura 3D. Para aplicar em outra grade (ex.: relacionados em
`/pecas/[ref]`), envolva a imagem com `<Showcase>` e garanta um `group` no
elemento pai se quiser sincronizar outros estados de hover.
