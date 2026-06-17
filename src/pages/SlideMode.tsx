import { BookOpen, ExternalLink, Maximize2, Menu, PanelRightClose, PanelRightOpen, SkipBack, SkipForward } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AgentOrchestrator from "../components/AgentOrchestrator";
import DeckShell from "../components/DeckShell";
import PresentationToolLayer from "../components/PresentationToolLayer";
import PresenterNotes from "../components/PresenterNotes";
import SlideFrame from "../components/SlideFrame";
import SlideNavigator from "../components/SlideNavigator";
import { slides } from "../data/slides";

function clampSlide(index: number) {
  return Math.max(0, Math.min(slides.length - 1, index));
}

function slideIndexFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("s") || params.get("slide");
  if (!raw) return 0;
  const byId = slides.findIndex((slide) => slide.id === raw);
  if (byId >= 0) return byId;
  const byNumber = Number(raw);
  return Number.isFinite(byNumber) ? clampSlide(byNumber - 1) : 0;
}

export default function SlideMode() {
  const slideViewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(slideIndexFromLocation);
  const [showNotes, setShowNotes] = useState(false);
  const [showNavigator, setShowNavigator] = useState(() => window.innerWidth >= 900);
  const [agentCollapsed, setAgentCollapsed] = useState(false);
  const slide = slides[index];
  const progress = useMemo(() => ((index + 1) / slides.length) * 100, [index]);

  const goTo = useCallback((nextIndex: number) => {
    const safe = clampSlide(nextIndex);
    setIndex(safe);
    const next = new URL(window.location.href);
    next.searchParams.set("s", String(safe + 1));
    window.history.replaceState(null, "", next);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const toggleSlideFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }
    void slideViewportRef.current?.requestFullscreen();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        next();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      }
      if (event.key.toLowerCase() === "f") {
        toggleSlideFullscreen();
      }
      if (event.key.toLowerCase() === "m") setShowNavigator((current) => !current);
      if (event.key.toLowerCase() === "n") setShowNotes((current) => !current);
      if (event.key.toLowerCase() === "d") {
        window.location.href = slide.demoRoute || "/demo";
      }
      if (event.key === "Escape") {
        setShowNotes(false);
        setShowNavigator(false);
        setAgentCollapsed(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev, slide.demoRoute, toggleSlideFullscreen]);

  return (
    <DeckShell
      mode="slide"
      progress={progress}
      bottom={
        <div className="flex flex-1 flex-wrap items-center justify-between gap-3">
          <div className="glass-card flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-black text-slate-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            발표 모드 실행 중
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={prev} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">
              <SkipBack className="h-4 w-4" />
            </button>
            <button type="button" onClick={next} className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-black text-white shadow-glow">
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
        </div>
      }
      className="pb-24"
    >
      <div className="flex min-h-[calc(100vh-190px)] flex-col gap-5 xl:flex-row">
        <SlideNavigator currentIndex={index} onSelect={goTo} open={showNavigator} />
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setShowNavigator((current) => !current)} className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
                <Menu className="h-4 w-4" />
                목차
              </button>
              <button type="button" onClick={() => setShowNotes((current) => !current)} className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
                <BookOpen className="h-4 w-4" />
                노트
              </button>
              <button type="button" onClick={() => setAgentCollapsed((current) => !current)} className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
                {agentCollapsed ? <PanelRightOpen className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />}
                에이전트
              </button>
              <button type="button" onClick={toggleSlideFullscreen} className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
                <Maximize2 className="h-4 w-4" />
                전체화면
              </button>
              <button type="button" onClick={() => (window.location.href = slide.demoRoute || "/demo")} className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-black text-white shadow-sm">
                <ExternalLink className="h-4 w-4" />
                커뮤니티
              </button>
            </div>
            <div className="rounded-2xl bg-white/80 px-4 py-2 text-sm font-black text-violet-700 shadow-sm">
              ← → Space · F · M · N · D · 2 · 3 · 4
            </div>
          </div>
          <div ref={slideViewportRef} className="slide-viewport slide-fullscreen-surface scrollbar-soft overflow-auto rounded-[32px] border border-white/80 bg-white/68 p-5 shadow-card">
            <PresentationToolLayer>
              <SlideFrame slide={slide} dense />
            </PresentationToolLayer>
          </div>
          {showNotes ? (
            <div className="mt-4">
              <PresenterNotes slide={slide} onClose={() => setShowNotes(false)} />
            </div>
          ) : null}
        </div>
        <div className="hidden xl:block">
          <AgentOrchestrator slide={slide} collapsed={agentCollapsed} onToggle={() => setAgentCollapsed((current) => !current)} />
        </div>
      </div>
      <div className="mt-5 xl:hidden">
        <AgentOrchestrator compact slide={slide} collapsed={agentCollapsed} onToggle={() => setAgentCollapsed((current) => !current)} />
      </div>
    </DeckShell>
  );
}
