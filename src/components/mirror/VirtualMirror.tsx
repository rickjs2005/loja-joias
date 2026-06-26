"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Camera, Download, RefreshCw, Share2, Sparkles } from "lucide-react";
import { TRYON_ITEMS, type TryOnItem } from "@/lib/data/tryon";
import { drawEarring, drawNecklace } from "@/lib/mirror/draw";
import { formatCents } from "@/lib/format";
import { waUrl } from "@/lib/whatsapp";
import { theme } from "@/config/theme.config";
import { cn } from "@/lib/cn";
import { WhatsappCta } from "@/components/ui/WhatsappCta";

type Status = "idle" | "loading" | "ready" | "error";

// Índices de landmarks (FaceMesh 468/478).
const L_EAR = 234;
const R_EAR = 454;
const CHIN = 152;
const L_EYE = 33;
const R_EYE = 263;

// Suavização exponencial (EMA) das posições — reduz o jitter da joia.
// 0 = congelado, 1 = sem suavização. ~0.35 dá um encaixe estável e responsivo.
const SMOOTH = 0.35;

// --- Encaixe da joia (frações de faceW = distância entre as orelhas) ---
// Ajuste fino aqui para calibrar o caimento das peças.
const EARRING_SIZE = 0.1;
const EARRING_DROP = 0.17; // quanto o lóbulo cai abaixo do ponto da orelha
const NECK_SIZE = 0.1;
const NECK_SIDE_INSET = 0.06; // recolhe as pontas para dentro das orelhas
const NECK_SIDE_DROP = 0.5; // descida lateral até o pescoço
const NECK_CENTER_DROP = 0.62; // descida central até a linha da clavícula

type Pt = { x: number; y: number };

export function VirtualMirror() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const landmarkerRef = useRef<unknown>(null);
  const rafRef = useRef(0);
  const streamRef = useRef<MediaStream | null>(null);
  const faceRef = useRef(false);
  // Estado anterior das posições-chave (em px de tela) para a suavização EMA.
  const smoothRef = useRef<Record<number, Pt> | null>(null);
  // Restaura o console após filtrar os logs informativos benignos do MediaPipe.
  const restoreConsoleRef = useRef<(() => void) | null>(null);

  const reduceMotion = useReducedMotion();

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [faceFound, setFaceFound] = useState(false);
  const [selected, setSelected] = useState<TryOnItem>(TRYON_ITEMS[0]);
  const [shot, setShot] = useState<string | null>(null);
  const selectedRef = useRef(selected);
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    restoreConsoleRef.current?.();
  }, []);

  // O MediaPipe/TFLite emite linhas informativas ("INFO: Created TensorFlow
  // Lite XNNPACK delegate for CPU.") via console.error; o overlay de dev do
  // Next trata isso como erro. Filtramos só essas mensagens benignas.
  const silenceMediapipeLogs = useCallback(() => {
    if (restoreConsoleRef.current) return;
    const benign = (a: unknown) =>
      typeof a === "string" && /XNNPACK|TensorFlow Lite|^INFO:/.test(a);
    const origError = console.error;
    const origWarn = console.warn;
    const origInfo = console.info;
    console.error = ((...args: unknown[]) =>
      benign(args[0]) ? undefined : origError(...args)) as typeof console.error;
    console.warn = ((...args: unknown[]) =>
      benign(args[0]) ? undefined : origWarn(...args)) as typeof console.warn;
    console.info = ((...args: unknown[]) =>
      benign(args[0]) ? undefined : origInfo(...args)) as typeof console.info;
    restoreConsoleRef.current = () => {
      console.error = origError;
      console.warn = origWarn;
      console.info = origInfo;
      restoreConsoleRef.current = null;
    };
  }, []);

  useEffect(() => () => stop(), [stop]);

  // O loop de render não pode se auto-referenciar dentro do useCallback;
  // usamos `tick` (estável) que chama a versão atual guardada em frameRef.
  const frameRef = useRef<() => void>(() => {});
  const tick = useCallback(() => frameRef.current(), []);

  const frame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const landmarker = landmarkerRef.current as {
      detectForVideo: (v: HTMLVideoElement, t: number) => { faceLandmarks: { x: number; y: number }[][] };
    } | null;
    if (!video || !canvas || !landmarker || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== Math.round(rect.width) || canvas.height !== Math.round(rect.height)) {
      canvas.width = Math.round(rect.width);
      canvas.height = Math.round(rect.height);
    }
    const W = canvas.width;
    const H = canvas.height;
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const scale = Math.max(W / vw, H / vh);
    const dw = vw * scale;
    const dh = vh * scale;
    const dx = (W - dw) / 2;
    const dy = (H - dh) / 2;

    // vídeo espelhado
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.translate(W, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, dx, dy, dw, dh);
    ctx.restore();

    let result;
    try {
      result = landmarker.detectForVideo(video, performance.now());
    } catch {
      result = undefined;
    }

    const found = Boolean(result?.faceLandmarks?.length);
    if (found !== faceRef.current) {
      faceRef.current = found;
      setFaceFound(found);
    }

    if (found && result) {
      const lm = result.faceLandmarks[0];
      // Posição crua do landmark `i` em px de tela (vídeo já espelhado).
      const raw = (i: number) => ({ x: W - (dx + lm[i].x * dw), y: dy + lm[i].y * dh });
      // Suavização exponencial: aproxima o valor anterior do alvo por `SMOOTH`.
      const sm = smoothRef.current ?? {};
      const P = (i: number): Pt => {
        const t = raw(i);
        const prev = sm[i];
        const next = prev
          ? { x: prev.x + (t.x - prev.x) * SMOOTH, y: prev.y + (t.y - prev.y) * SMOOTH }
          : t;
        sm[i] = next;
        return next;
      };

      const eL = P(L_EAR);
      const eR = P(R_EAR);
      const chin = P(CHIN);
      const eyeL = P(L_EYE);
      const eyeR = P(R_EYE);
      smoothRef.current = sm;

      const faceW = Math.hypot(eR.x - eL.x, eR.y - eL.y);
      const angle = Math.atan2(eyeR.y - eyeL.y, eyeR.x - eyeL.x);
      const item = selectedRef.current;

      if (item.type === "earring") {
        const size = faceW * EARRING_SIZE;
        const drop = faceW * EARRING_DROP;
        drawEarring(ctx, { x: eL.x, y: eL.y + drop }, size, angle, item.kind);
        drawEarring(ctx, { x: eR.x, y: eR.y + drop }, size, angle, item.kind);
      } else {
        const size = faceW * NECK_SIZE;
        const left = { x: eL.x + faceW * NECK_SIDE_INSET, y: eL.y + faceW * NECK_SIDE_DROP };
        const right = { x: eR.x - faceW * NECK_SIDE_INSET, y: eR.y + faceW * NECK_SIDE_DROP };
        const center = { x: chin.x, y: chin.y + faceW * NECK_CENTER_DROP };
        drawNecklace(ctx, left, center, right, size, item.kind);
      }
    } else {
      // Sem rosto: zera o histórico para a próxima detecção encaixar na hora.
      smoothRef.current = null;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    frameRef.current = frame;
  }, [frame]);

  const start = useCallback(async () => {
    setStatus("loading");
    setError("");
    silenceMediapipeLogs();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();

      const { FaceLandmarker, FilesetResolver } = await import("@mediapipe/tasks-vision");
      const fileset = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm",
      );
      landmarkerRef.current = await FaceLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numFaces: 1,
      });

      setStatus("ready");
      rafRef.current = requestAnimationFrame(tick);
    } catch (e) {
      const name = (e as Error)?.name;
      setError(
        name === "NotAllowedError"
          ? "Precisamos da câmera para o espelho virtual. Permita o acesso e tente de novo."
          : "Não foi possível iniciar a câmera ou carregar o modelo. Verifique a conexão e tente novamente.",
      );
      setStatus("error");
      stop();
    }
  }, [tick, stop, silenceMediapipeLogs]);

  const capture = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setShot(canvas.toDataURL("image/jpeg", 0.92));
  }, []);

  const share = useCallback(async () => {
    if (!shot) return;
    try {
      const blob = await (await fetch(shot)).blob();
      const file = new File([blob], "aurea-espelho.jpg", { type: "image/jpeg" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: theme.brand,
          text: `Experimentei no espelho virtual da ${theme.brand}!`,
        });
        return;
      }
    } catch {
      /* cai para download */
    }
    const a = document.createElement("a");
    a.href = shot;
    a.download = "aurea-espelho.jpg";
    a.click();
  }, [shot]);

  const waMessage = waUrl(
    `Olá, ${theme.brand}! Experimentei no espelho virtual e gostei desta peça:\n\n` +
      `• Peça: ${selected.name}\n• Referência: ${selected.reference}\n• Valor: ${formatCents(
        selected.priceCents,
      )}\n\nGostaria de mais informações.`,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
      {/* Palco da câmera */}
      <div className="relative mx-auto w-full max-w-xl">
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line bg-ink sm:aspect-[4/3] lg:aspect-[3/4]">
          <video
            ref={videoRef}
            playsInline
            muted
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
          />
          <canvas ref={canvasRef} className="relative h-full w-full" />

          {/* Moldura editorial: vignette suave + cantos dourados (câmera ativa) */}
          {status === "ready" && (
            <>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ boxShadow: "inset 0 0 90px 14px rgba(27,27,27,0.42)" }}
              />
              <div aria-hidden className="pointer-events-none absolute inset-3.5 sm:inset-5">
                <span className="absolute left-0 top-0 h-7 w-7 rounded-tl-md border-l border-t border-accent-soft/70" />
                <span className="absolute right-0 top-0 h-7 w-7 rounded-tr-md border-r border-t border-accent-soft/70" />
                <span className="absolute bottom-0 left-0 h-7 w-7 rounded-bl-md border-b border-l border-accent-soft/70" />
                <span className="absolute bottom-0 right-0 h-7 w-7 rounded-br-md border-b border-r border-accent-soft/70" />
              </div>
            </>
          )}

          {status !== "ready" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-ink px-8 text-center text-bg">
              {/* Varredura elegante enquanto o modelo carrega */}
              {status === "loading" && !reduceMotion && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-10 h-px bg-accent-soft"
                  style={{ boxShadow: "0 0 14px 1px rgba(199,174,131,0.65)" }}
                  initial={{ top: "16%", opacity: 0 }}
                  animate={{ top: ["16%", "84%", "16%"], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <Sparkles className="h-8 w-8 text-accent-soft" strokeWidth={1.2} />
              {status === "idle" && (
                <>
                  <p className="max-w-xs text-sm leading-relaxed text-bg/70">
                    Ative a câmera para experimentar as peças em tempo real. As imagens
                    ficam só no seu aparelho — nada é enviado.
                  </p>
                  <button
                    type="button"
                    onClick={start}
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 rounded-full bg-bg px-7 py-3.5 text-sm font-medium uppercase tracking-wide text-ink transition-colors hover:bg-accent hover:text-white"
                  >
                    <Camera className="h-4 w-4" /> Ativar câmera
                  </button>
                </>
              )}
              {status === "loading" && (
                <div className="space-y-1.5">
                  <p className="text-sm text-bg/80 motion-safe:animate-pulse">
                    Preparando o espelho…
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-accent-soft/80">
                    Demonstração tecnológica
                  </p>
                </div>
              )}
              {status === "error" && (
                <>
                  <p className="max-w-xs text-sm leading-relaxed text-bg/80">{error}</p>
                  <button
                    type="button"
                    onClick={start}
                    className="inline-flex items-center gap-2 rounded-full bg-bg px-6 py-3 text-sm font-medium uppercase tracking-wide text-ink"
                  >
                    <RefreshCw className="h-4 w-4" /> Tentar de novo
                  </button>
                </>
              )}
            </div>
          )}

          {status === "ready" && !faceFound && (
            <div className="absolute inset-x-0 bottom-4 mx-auto w-fit rounded-full bg-ink/70 px-4 py-2 text-xs text-bg backdrop-blur">
              Aproxime o rosto e centralize na câmera
            </div>
          )}
        </div>

        {status === "ready" && (
          <div className="mt-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={capture}
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium uppercase tracking-wide text-bg transition-colors hover:bg-accent hover:text-white"
            >
              <Camera className="h-4 w-4" /> Capturar foto
            </button>
          </div>
        )}
      </div>

      {/* Painel de escolha */}
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Escolha a peça</p>
        <h2 className="mt-3 font-display text-3xl tracking-tight">Experimente em você</h2>

        <div className="mt-6 space-y-2.5">
          {TRYON_ITEMS.map((item) => (
            <button
              key={item.reference}
              type="button"
              onClick={() => setSelected(item)}
              data-cursor="hover"
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-colors",
                selected.reference === item.reference
                  ? "border-accent bg-accent/5"
                  : "border-line hover:border-ink/30",
              )}
            >
              <span>
                <span className="block font-display text-lg tracking-tight">{item.name}</span>
                <span className="text-xs uppercase tracking-wide text-muted">
                  {item.type === "earring" ? "Brinco" : "Colar"} · {item.reference}
                </span>
              </span>
              <span className="font-display text-base">{formatCents(item.priceCents)}</span>
            </button>
          ))}
        </div>

        <div className="mt-7">
          <WhatsappCta href={waMessage} size="lg" className="w-full sm:w-auto">
            Quero esta peça
          </WhatsappCta>
        </div>

        {shot && (
          <div className="mt-8 rounded-2xl border border-line p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Sua foto
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot} alt="Sua captura no espelho virtual" className="w-full rounded-xl" />
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={share}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-bg transition-colors hover:bg-accent hover:text-white"
              >
                <Share2 className="h-3.5 w-3.5" /> Compartilhar
              </button>
              <a
                href={shot}
                download="aurea-espelho.jpg"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors hover:border-accent hover:text-accent"
              >
                <Download className="h-3.5 w-3.5" /> Baixar
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
