import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { slides } from "../data/slides";

type SlideNavigatorProps = {
  currentIndex: number;
  onSelect: (index: number) => void;
  open?: boolean;
};

export default function SlideNavigator({ currentIndex, onSelect, open = true }: SlideNavigatorProps) {
  return (
    <aside
      className={clsx(
        "glass-card scrollbar-soft h-full min-h-0 w-full shrink-0 overflow-y-auto rounded-[24px] p-4 transition-all lg:block xl:w-64",
        open ? "block" : "hidden lg:block",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-black text-slate-700">오늘의 챕터</p>
          <p className="text-xs text-slate-500">총 {slides.length}개 장면</p>
        </div>
        <div className="rounded-2xl bg-violet-100 px-3 py-2 text-lg font-black text-violet-700">
          {currentIndex + 1}/{slides.length}
        </div>
      </div>
      <div className="space-y-2">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.id}
            onClick={() => onSelect(index)}
            className={clsx(
              "group flex w-full items-center gap-2 rounded-2xl px-3 py-3 text-left text-sm transition",
              index === currentIndex
                ? "bg-gradient-to-r from-violet-500 to-blue-500 font-black text-white shadow-glow"
                : "text-slate-600 hover:bg-white/80 hover:text-violet-700",
            )}
          >
            <span className="w-9 shrink-0 font-black">{slide.number}</span>
            <span className="line-clamp-2 flex-1">{slide.title}</span>
            <ChevronRight className="h-4 w-4 opacity-60" />
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-[20px] bg-gradient-to-br from-emerald-100 to-cyan-100 p-4 text-sm text-emerald-900">
        <p className="font-black">하네스 요정</p>
        <p className="mt-1 leading-relaxed">궁금한 용어는 용어집에서 다시 볼 수 있어요.</p>
      </div>
    </aside>
  );
}
