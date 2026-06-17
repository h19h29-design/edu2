import clsx from "clsx";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, ChevronDown, PencilLine, Pointer, ZoomIn } from "lucide-react";

type StrokePoint = {
  x: number;
  y: number;
};

type Stroke = {
  id: string;
  points: StrokePoint[];
};

type PresentationToolLayerProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

function isEditableTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  if (!element) return false;
  const tagName = element.tagName.toLowerCase();
  return tagName === "input" || tagName === "textarea" || tagName === "select" || element.isContentEditable;
}

export default function PresentationToolLayer({ children, className, contentClassName }: PresentationToolLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [drawMode, setDrawMode] = useState(false);
  const [pointerMode, setPointerMode] = useState(false);
  const [zoomMode, setZoomMode] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [pointer, setPointer] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (isEditableTarget(event.target)) return;

      if (event.key === "2") {
        event.preventDefault();
        setDrawMode((current) => {
          const next = !current;
          if (!next) {
            drawingRef.current = false;
            setStrokes([]);
          }
          return next;
        });
        return;
      }

      if (event.key === "3") {
        event.preventDefault();
        setPointerMode((current) => !current);
        return;
      }

      if (event.key === "4") {
        event.preventDefault();
        setZoomMode((current) => !current);
        return;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!panelRef.current) return;
      if (panelRef.current.contains(event.target as Node)) return;
      setPanelOpen(false);
    }

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function pointFromEvent(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const point = pointFromEvent(event);
    if (!point) return;
    setPointer({ ...point, visible: true });

    if (!drawMode || event.button !== 0) return;

    drawingRef.current = true;
    const stroke: Stroke = {
      id: `stroke-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      points: [point],
    };
    setStrokes((current) => [...current, stroke]);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const point = pointFromEvent(event);
    if (!point) return;

    if (pointerMode || drawMode || drawingRef.current) {
      setPointer({ ...point, visible: true });
    }

    if (!drawingRef.current || !drawMode) return;

    setStrokes((current) => {
      if (!current.length) return current;
      const next = [...current];
      const last = next[next.length - 1];
      next[next.length - 1] = {
        ...last,
        points: [...last.points, point],
      };
      return next;
    });
  }

  function stopDrawing() {
    drawingRef.current = false;
  }

  function onPointerLeave() {
    stopDrawing();
    if (!pointerMode && !drawMode) {
      setPointer((current) => ({ ...current, visible: false }));
    }
  }

  const contentStyle = useMemo(() => (zoomMode ? ({ zoom: 2 } as CSSProperties) : undefined), [zoomMode]);
  const showPointer = pointer.visible && (pointerMode || drawMode || drawingRef.current);

  function toggleDrawMode() {
    setDrawMode((current) => {
      const next = !current;
      if (!next) {
        drawingRef.current = false;
        setStrokes([]);
      }
      return next;
    });
  }

  const toolItems = [
    {
      id: "draw",
      label: "그리기",
      shortcut: "2",
      active: drawMode,
      icon: PencilLine,
      tone: drawMode ? "bg-rose-500 text-white" : "bg-white text-slate-600",
      onClick: toggleDrawMode,
    },
    {
      id: "pointer",
      label: "포인터",
      shortcut: "3",
      active: pointerMode,
      icon: Pointer,
      tone: pointerMode ? "bg-sky-500 text-white" : "bg-white text-slate-600",
      onClick: () => setPointerMode((current) => !current),
    },
    {
      id: "zoom",
      label: "확대",
      shortcut: "4",
      active: zoomMode,
      icon: ZoomIn,
      tone: zoomMode ? "bg-emerald-500 text-white" : "bg-white text-slate-600",
      onClick: () => setZoomMode((current) => !current),
    },
  ] as const;

  return (
    <div
      ref={containerRef}
      className={clsx("relative", className, (pointerMode || drawMode) && "select-none")}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrawing}
      onPointerCancel={stopDrawing}
      onPointerLeave={onPointerLeave}
      style={{ cursor: pointerMode ? "none" : drawMode ? "crosshair" : undefined }}
    >
      <div className={contentClassName} style={contentStyle}>
        {children}
      </div>

      <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {strokes.map((stroke) => (
          <polyline
            key={stroke.id}
            points={stroke.points.map((point) => `${point.x},${point.y}`).join(" ")}
            fill="none"
            stroke="#ef4444"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.6"
          />
        ))}
      </svg>

      {showPointer ? (
        <div
          className="pointer-events-none absolute z-30"
          style={{
            left: `${pointer.x}%`,
            top: `${pointer.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden="true"
        >
          <div className="relative h-11 w-11 rounded-full border-4 border-rose-500/90 bg-rose-400/20 shadow-[0_0_0_12px_rgba(244,63,94,0.12)]">
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600" />
          </div>
        </div>
      ) : null}

      <div ref={panelRef} className="absolute right-4 top-4 z-30 flex items-start justify-end">
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => setPanelOpen((current) => !current)}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm font-black text-slate-700 shadow-card backdrop-blur"
            aria-expanded={panelOpen}
            aria-label="발표 도구 열기"
          >
            <Bot className="h-4 w-4 text-violet-600" />
            발표 도구
            <ChevronDown className={clsx("h-4 w-4 text-slate-400 transition", panelOpen && "rotate-180")} />
          </button>

          {panelOpen ? (
            <div className="w-[260px] rounded-[24px] border border-slate-200 bg-white/96 p-4 shadow-[0_24px_54px_rgba(15,23,42,0.18)] backdrop-blur">
              <div className="mb-3">
                <p className="text-sm font-black text-slate-900">발표 옵션</p>
                <p className="mt-1 text-xs font-bold text-slate-500">단축키 2, 3, 4로도 같은 기능을 켜고 끌 수 있습니다.</p>
              </div>
              <div className="grid gap-2">
                {toolItems.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={tool.onClick}
                      className={clsx(
                        "flex items-center justify-between rounded-2xl border border-slate-200 px-3 py-3 text-left shadow-sm transition",
                        tool.active ? "border-transparent bg-slate-950 text-white" : "bg-slate-50 text-slate-700 hover:bg-white",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className={clsx("grid h-10 w-10 place-items-center rounded-2xl", tool.tone)}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-sm font-black">{tool.label}</span>
                          <span className={clsx("block text-xs font-bold", tool.active ? "text-white/75" : "text-slate-500")}>
                            {tool.active ? "켜짐" : "꺼짐"}
                          </span>
                        </span>
                      </span>
                      <span className={clsx("rounded-full px-2 py-1 text-xs font-black", tool.active ? "bg-white/15 text-white" : "bg-white text-slate-500")}>
                        {tool.shortcut}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
