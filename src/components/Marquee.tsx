import { copy } from "@/config/copy";

/** Faixa rolante infinita com os selos da marca. CSS puro (sem JS).
 *  Duas cópias idênticas lado a lado; o trilho desliza -50% e reinicia
 *  sem emenda visível. */
export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line py-5">
      <div className="flex w-max animate-marquee">
        <Track />
        <Track aria-hidden />
      </div>
    </div>
  );
}

function Track(props: { "aria-hidden"?: boolean }) {
  return (
    <div className="flex items-center" {...props}>
      {copy.marquee.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 font-display text-lg text-ink/70">{item}</span>
          <Diamond />
        </span>
      ))}
    </div>
  );
}

function Diamond() {
  return (
    <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 text-accent" aria-hidden>
      <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="currentColor" />
    </svg>
  );
}
