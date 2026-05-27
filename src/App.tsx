import { ArrowRight, BookOpen, CheckCircle2, FlaskConical, MonitorPlay, NotebookText, ShieldCheck, Wand2 } from "lucide-react";
import { motion } from "motion/react";
import DeckShell from "./components/DeckShell";
import DemoPage from "./pages/DemoPage";
import GlossaryPage from "./pages/GlossaryPage";
import PromptLabPage from "./pages/PromptLabPage";
import SlideMode from "./pages/SlideMode";
import StudyMode from "./pages/StudyMode";

const quickLinks = [
  { href: "/slide", label: "발표 시작", icon: MonitorPlay, desc: "전체화면 발표와 키보드 조작" },
  { href: "/study", label: "학습 모드", icon: BookOpen, desc: "웹 교재처럼 다시 읽기" },
  { href: "/glossary", label: "용어집", icon: NotebookText, desc: "행정업무 비유로 이해" },
  { href: "/demo", label: "실습 데모", icon: FlaskConical, desc: "질문·투표 보드 실행" },
];

function HomePage() {
  return (
    <DeckShell mode="home" progress={0}>
      <div className="space-y-5">
        <section className="glass-card overflow-hidden rounded-[34px] p-7 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-700">공무원 교육용 인터랙티브 웹앱</span>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700">오프라인 핵심 데모 지원</span>
              </div>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black leading-tight tracking-normal text-slate-950 md:text-7xl">
                비개발자를 위한 <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">Codex 바이브 코딩</span>
              </motion.h1>
              <p className="mt-5 max-w-3xl text-2xl font-bold leading-10 text-slate-700">
                학교 업무를 아는 사람이 Codex에게 일을 맡기고, 검토하고, 안전하게 배포하는 방법을 배우는 강의 웹앱입니다.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/slide" className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 font-black text-white shadow-glow">
                  <MonitorPlay className="h-5 w-5" />
                  발표 시작
                </a>
                <a href="/study" className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-slate-700 shadow-sm">
                  <BookOpen className="h-5 w-5" />
                  학습 모드
                </a>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                { title: "PPT 흐름 기반", desc: "원본 20장 흐름에 신규 3.5/14.5 슬라이드를 더했습니다.", icon: CheckCircle2 },
                { title: "AI 개발팀 시뮬레이션", desc: "발표 모드에서 에이전트 상태와 코딩 장면을 보여줍니다.", icon: Wand2 },
                { title: "안전한 실습", desc: "질문·투표·파일첨부 데모는 localStorage와 더미 데이터로 동작합니다.", icon: ShieldCheck },
              ].map(({ title, desc, icon: CardIcon }, index) => {
                return (
                  <motion.div key={title} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="rounded-[24px] border border-slate-200 bg-white/88 p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-100 text-violet-700">
                        <CardIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-lg font-black text-slate-950">{title}</p>
                        <p className="mt-1 text-sm font-bold leading-6 text-slate-500">{desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a key={link.href} href={link.href} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="rounded-[28px] border border-slate-200 bg-white/86 p-5 shadow-card transition hover:-translate-y-1 hover:shadow-glow">
                <Icon className="mb-5 h-10 w-10 text-violet-600" />
                <p className="text-xl font-black text-slate-950">{link.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{link.desc}</p>
                <ArrowRight className="mt-4 h-5 w-5 text-violet-500" />
              </motion.a>
            );
          })}
        </section>
      </div>
    </DeckShell>
  );
}

export default function App() {
  const path = window.location.pathname;
  if (path.startsWith("/slide")) return <SlideMode />;
  if (path.startsWith("/study")) return <StudyMode />;
  if (path.startsWith("/glossary")) return <GlossaryPage />;
  if (path.startsWith("/prompt")) return <PromptLabPage />;
  if (path.startsWith("/demo")) return <DemoPage />;
  return <HomePage />;
}
