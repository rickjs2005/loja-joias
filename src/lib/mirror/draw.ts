/**
 * Desenho das joias douradas sobre o canvas do Espelho Virtual.
 * Tudo vetorial (transparente, 60fps) — é uma demonstração tecnológica, então
 * a joia é representada de forma estilizada, não como foto recortada.
 */
import type { TryOnKind } from "@/lib/data/tryon";

// Dourado da marca ÁUREA (#9C7B45 / #C7AE83) com extremos para volume.
const GOLD = "#b08d57";
const GOLD_LIGHT = "#ecd9ab";
const GOLD_DARK = "#7c5f33";
const SPEC = "rgba(255,255,255,0.85)"; // realce especular sutil

type Pt = { x: number; y: number };

function goldStroke(ctx: CanvasRenderingContext2D, w: number) {
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = w;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

/** Pequeno ponto especular para dar brilho de metal/pérola (sem exagero). */
function specular(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const prev = ctx.shadowColor;
  ctx.shadowColor = "transparent";
  ctx.fillStyle = SPEC;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowColor = prev;
}

function stud(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const g = ctx.createRadialGradient(x - r * 0.32, y - r * 0.32, r * 0.08, x, y, r);
  g.addColorStop(0, GOLD_LIGHT);
  g.addColorStop(0.55, GOLD);
  g.addColorStop(1, GOLD_DARK);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  // micro-rim escuro p/ definição + brilho de luz alta
  ctx.strokeStyle = "rgba(60,42,18,0.35)";
  ctx.lineWidth = Math.max(0.5, r * 0.08);
  ctx.beginPath();
  ctx.arc(x, y, r * 0.96, 0, Math.PI * 2);
  ctx.stroke();
  specular(ctx, x - r * 0.34, y - r * 0.34, r * 0.22);
}

function pearl(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.6, "#f3ece0");
  g.addColorStop(1, "#cdbfa6");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  specular(ctx, x - r * 0.32, y - r * 0.36, r * 0.18);
}

function teardrop(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y);
  const g = ctx.createLinearGradient(0, -r, 0, r * 1.6);
  g.addColorStop(0, GOLD_LIGHT);
  g.addColorStop(1, GOLD_DARK);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, -r * 1.4);
  ctx.bezierCurveTo(r * 1.1, -r * 0.2, r * 0.7, r * 1.5, 0, r * 1.5);
  ctx.bezierCurveTo(-r * 0.7, r * 1.5, -r * 1.1, -r * 0.2, 0, -r * 1.4);
  ctx.fill();
  // estria de luz vertical para dar facetado
  specular(ctx, -r * 0.28, r * 0.1, r * 0.16);
  ctx.restore();
}

/** Desenha um brinco pendurado a partir do ponto do lóbulo, com leve rotação. */
export function drawEarring(
  ctx: CanvasRenderingContext2D,
  lobe: Pt,
  size: number,
  angle: number,
  kind: TryOnKind,
) {
  ctx.save();
  ctx.translate(lobe.x, lobe.y);
  ctx.rotate(angle * 0.5); // segue parcialmente a inclinação da cabeça
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = size * 0.4;
  ctx.shadowOffsetY = size * 0.15;

  stud(ctx, 0, 0, size * 0.28);

  if (kind === "hoop") {
    goldStroke(ctx, size * 0.28);
    ctx.beginPath();
    ctx.arc(0, size * 1.05, size * 0.9, 0, Math.PI * 2);
    ctx.stroke();
  } else if (kind === "pearls-ear") {
    pearl(ctx, 0, size * 0.7, size * 0.34);
    pearl(ctx, 0, size * 1.35, size * 0.3);
    pearl(ctx, 0, size * 1.9, size * 0.24);
  } else {
    // drop (padrão)
    goldStroke(ctx, size * 0.16);
    ctx.beginPath();
    ctx.moveTo(0, size * 0.2);
    ctx.lineTo(0, size * 1.1);
    ctx.stroke();
    teardrop(ctx, 0, size * 1.5, size * 0.5);
  }

  ctx.restore();
}

function quad(p0: Pt, p1: Pt, p2: Pt, t: number): Pt {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

/** Desenha o colar como uma curva da lateral esquerda ao direita, dipando no centro. */
export function drawNecklace(
  ctx: CanvasRenderingContext2D,
  left: Pt,
  center: Pt,
  right: Pt,
  size: number,
  kind: TryOnKind,
) {
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.22)";
  ctx.shadowBlur = size * 0.3;
  ctx.shadowOffsetY = size * 0.12;

  if (kind === "pearls-neck") {
    const n = 26;
    for (let i = 0; i <= n; i++) {
      const p = quad(left, center, right, i / n);
      pearl(ctx, p.x, p.y, size * 0.32);
    }
  } else {
    goldStroke(ctx, kind === "pendant" ? size * 0.22 : size * 0.13);
    ctx.beginPath();
    ctx.moveTo(left.x, left.y);
    ctx.quadraticCurveTo(center.x, center.y, right.x, right.y);
    ctx.stroke();

    if (kind === "chain") {
      const n = 16;
      for (let i = 1; i < n; i++) {
        const p = quad(left, center, right, i / n);
        stud(ctx, p.x, p.y, size * 0.12);
      }
    }
    if (kind === "pendant") {
      const tip = quad(left, center, right, 0.5);
      stud(ctx, tip.x, tip.y, size * 0.2);
      teardrop(ctx, tip.x, tip.y + size * 0.7, size * 0.62);
    }
  }

  ctx.restore();
}
