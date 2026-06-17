import clsx from "clsx";
import { Bell, BookOpen, FlaskConical, GraduationCap, MonitorPlay, NotebookText, Presentation, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import ProgressBar from "./ProgressBar";

type DeckShellProps = {
  children: ReactNode;
  progress?: number;
  mode?: "slide" | "study" | "glossary" | "prompt" | "community" | "practice" | "home";
  bottom?: ReactNode;
  className?: string;
};

const navItems = [
  { href: "/slide", mode: "slide", label: "발표 모드", icon: MonitorPlay },
  { href: "/study", mode: "study", label: "학습 모드", icon: BookOpen },
  { href: "/glossary", mode: "glossary", label: "용어집", icon: NotebookText },
  { href: "/demo", mode: "community", label: "커뮤니티", icon: FlaskConical },
  { href: "/practice-mode", mode: "practice", label: "실습 모드", icon: Presentation },
];

export default function DeckShell({ children, progress = 0, mode = "home", bottom, className }: DeckShellProps) {
  return (
    <div className="lecture-bg min-h-screen text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/78 px-4 py-3 shadow-sm backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1720px] items-center justify-between gap-4">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-400 via-violet-500 to-cyan-300 text-white shadow-glow">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-black text-slate-950 md:text-2xl">
                비개발자를 위한 <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">Codex 바이브 코딩</span>
              </p>
              <p className="hidden text-xs font-semibold text-slate-500 md:block">AI 개발팀을 지휘하는 인터랙티브 강의 웹앱</p>
            </div>
          </a>
          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.mode === mode;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "relative flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-black transition",
                    active
                      ? "border-violet-200 bg-violet-50 text-violet-700 shadow-card"
                      : "border-slate-200 bg-white/80 text-slate-700 hover:border-violet-200 hover:text-violet-700",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                  {active ? <span className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-violet-50" /> : null}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <button className="relative rounded-2xl bg-white p-3 shadow-sm">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500" />
            </button>
            <div className="hidden items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-sm md:flex">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-200 to-blue-200">
                <UserRound className="h-5 w-5 text-violet-700" />
              </div>
              <span className="text-sm font-black">선생님</span>
            </div>
          </div>
        </div>
      </header>
      <main className={clsx("mx-auto max-w-[1720px] px-4 py-5", className)}>{children}</main>
      <footer className="sticky bottom-0 z-30 border-t border-slate-200/70 bg-white/82 px-4 py-3 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1720px] flex-col gap-3 lg:flex-row lg:items-center">
          <ProgressBar value={progress} label="학습 진행률" className="min-w-[280px] flex-1" />
          {bottom ?? (
            <div className="glass-card flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold text-slate-600">
              모든 에이전트가 협업 중입니다.
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
