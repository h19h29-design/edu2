import { ArrowRight, BookOpenCheck, ClipboardList, ExternalLink, MessageSquareText, UserRound } from "lucide-react";
import DeckShell from "../components/DeckShell";
import TrainingIntroBoard from "../components/TrainingIntroBoard";
import TrainingQuestionBoard from "../components/TrainingQuestionBoard";

export default function DemoPage() {
  return (
    <DeckShell mode="demo" progress={100}>
      <div className="space-y-5">
        <section className="glass-card rounded-[30px] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <ClipboardList className="h-6 w-6" />
              </div>
              <p className="text-2xl font-black text-slate-950">실습 데모 허브</p>
              <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-slate-600">
                오늘 실습의 메인은 독서 공유 & 책 읽기 프로그램 Codex 프롬프트 전용 로드맵입니다. 아래에서 단계별 프롬프트를 먼저 보고, 프롬프트 메모판·일반 게시판·자기소개 게시판으로 이어갑니다.
              </p>
            </div>
            <a href="#reading-roadmap" className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-black text-white shadow-glow">
              메인 실습자료 보기
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <a href="#reading-roadmap" className="rounded-[24px] border border-amber-200 bg-amber-50/80 p-4 transition hover:-translate-y-1">
              <BookOpenCheck className="mb-3 h-6 w-6 text-amber-600" />
              <p className="font-black text-slate-950">메인. 프롬프트 로드맵</p>
              <p className="mt-1 text-sm font-bold leading-6 text-slate-500">Codex에 붙여넣을 단계별 프롬프트를 봅니다.</p>
            </a>
            <a href="/prompt#prompt-memo-board" className="rounded-[24px] border border-violet-200 bg-violet-50/80 p-4 transition hover:-translate-y-1">
              <ClipboardList className="mb-3 h-6 w-6 text-violet-600" />
              <p className="font-black text-slate-950">1. 프롬프트 메모판</p>
              <p className="mt-1 text-sm font-bold leading-6 text-slate-500">공개 프롬프트를 읽고 복사합니다.</p>
            </a>
            <a href="#question-board" className="rounded-[24px] border border-blue-200 bg-blue-50/80 p-4 transition hover:-translate-y-1">
              <MessageSquareText className="mb-3 h-6 w-6 text-blue-600" />
              <p className="font-black text-slate-950">2. 일반 게시판</p>
              <p className="mt-1 text-sm font-bold leading-6 text-slate-500">질문, 첨부, 좋아요/싫어요, 관리자 답글을 사용합니다.</p>
            </a>
            <a href="#intro-board" className="rounded-[24px] border border-emerald-200 bg-emerald-50/80 p-4 transition hover:-translate-y-1">
              <UserRound className="mb-3 h-6 w-6 text-emerald-600" />
              <p className="font-black text-slate-950">3. 자기소개 게시판</p>
              <p className="mt-1 text-sm font-bold leading-6 text-slate-500">선택값이 그래프로 집계됩니다.</p>
            </a>
          </div>
        </section>

        <section id="reading-roadmap" className="glass-card rounded-[30px] p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-2xl bg-amber-100 px-4 py-2 text-sm font-black text-amber-700">
                <BookOpenCheck className="h-4 w-4" />
                메인 실습자료
              </div>
              <p className="text-2xl font-black text-slate-950">독서 공유 & 책 읽기 프로그램 프롬프트 전용 로드맵</p>
              <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-slate-600">
                새로 첨부한 prompt-only HTML을 프로젝트 안에 보관하고, 외부 광고/로컬 스크립트는 제거했습니다. 수강생은 단계별 프롬프트를 복사해 MVP, 도서검색 API, Supabase 저장, GitHub push 순서로 실습합니다.
              </p>
            </div>
            <a href="/practice/reading-roadmap-5-4mini.html" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-card">
              새 창으로 열기
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-card">
            <iframe title="독서 공유 책읽기 프로그램 프롬프트 전용 로드맵" src="/practice/reading-roadmap-5-4mini.html" className="h-[720px] w-full bg-white" />
          </div>
        </section>

        <section id="question-board">
          <TrainingQuestionBoard />
        </section>

        <TrainingIntroBoard />
      </div>
    </DeckShell>
  );
}
