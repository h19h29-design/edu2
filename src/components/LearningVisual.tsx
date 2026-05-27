import { ImageIcon } from "lucide-react";
import type { SlideVisual } from "../data/slideVisuals";

type LearningVisualProps = {
  visual: SlideVisual;
  variant?: "compact" | "study" | "hero";
};

export default function LearningVisual({ visual, variant = "compact" }: LearningVisualProps) {
  const sizeClass =
    variant === "hero"
      ? "min-h-[260px]"
      : variant === "study"
        ? "min-h-[240px]"
        : "min-h-[150px]";

  return (
    <figure className={`group overflow-hidden rounded-[26px] border border-white/80 bg-white/86 shadow-card ${variant === "compact" ? "p-2" : "p-3"}`}>
      <div className={`relative overflow-hidden rounded-[22px] bg-slate-100 ${sizeClass}`}>
        <img src={visual.src} alt={visual.alt} className="absolute inset-0 h-full w-full object-contain transition duration-500 group-hover:scale-[1.025]" loading="lazy" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-2xl bg-white/88 px-3 py-1 text-xs font-black text-violet-700 shadow-sm">
          <ImageIcon className="h-3.5 w-3.5" />
          시각 자료
        </div>
      </div>
      {variant === "compact" ? null : <figcaption className="mt-3 text-sm font-bold leading-6 text-slate-600">{visual.caption}</figcaption>}
    </figure>
  );
}
