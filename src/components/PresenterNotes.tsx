import { BookOpen, X } from "lucide-react";
import type { Slide } from "../data/slides";

type PresenterNotesProps = {
  slide: Slide;
  onClose?: () => void;
};

export default function PresenterNotes({ slide, onClose }: PresenterNotesProps) {
  return (
    <div className="glass-card rounded-[24px] p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-violet-600" />
          <h3 className="text-lg font-black text-slate-900">발표자 노트</h3>
        </div>
        {onClose ? (
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-white">
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      <p className="text-sm leading-7 text-slate-700">{slide.speakerNotes}</p>
    </div>
  );
}
