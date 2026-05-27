import { ArrowRight, ClipboardList, MessageSquareText, UserRound } from "lucide-react";
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
                오늘 실습은 프롬프트 메모판, 일반 질문 게시판, 자기소개 게시판 세 가지로 진행합니다. 관리자 기능은 화면 빈 곳에서 1015를 입력하면 열립니다.
              </p>
            </div>
            <a href="/prompt#prompt-memo-board" className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-black text-white shadow-glow">
              프롬프트 메모판 열기
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
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

        <section id="question-board">
          <TrainingQuestionBoard />
        </section>

        <TrainingIntroBoard />
      </div>
    </DeckShell>
  );
}
