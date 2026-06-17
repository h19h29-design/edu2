import { ArrowRight, BookOpenCheck, ClipboardList, ExternalLink, MessageSquareText, Presentation, UserRound, VenetianMask } from "lucide-react";
import DeckShell from "../components/DeckShell";
import TrainingAnnouncementBoard from "../components/TrainingAnnouncementBoard";
import TrainingIntroBoard from "../components/TrainingIntroBoard";
import TrainingQuestionBoard from "../components/TrainingQuestionBoard";

export default function DemoPage() {
  return (
    <DeckShell mode="community" progress={100}>
      <div className="space-y-5">
        <section className="glass-card rounded-[30px] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <ClipboardList className="h-6 w-6" />
              </div>
              <p className="text-2xl font-black text-slate-950">커뮤니티 허브</p>
              <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-slate-600">
                질문 보드, 전달용 게시판, 자기소개 보드, 프롬프트 메모판을 한 화면에서 둘러보고 필요할 때 실습 모드로 넘어갈 수 있습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#community-sections" className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-black text-white shadow-glow">
                커뮤니티 보기
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/practice-mode" className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 shadow-card">
                실습 모드
                <Presentation className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <a href="/practice-mode" className="rounded-[24px] border border-amber-200 bg-amber-50/80 p-4 transition hover:-translate-y-1">
              <BookOpenCheck className="mb-3 h-6 w-6 text-amber-600" />
              <p className="font-black text-slate-950">실습 모드</p>
              <p className="mt-1 text-sm font-bold leading-6 text-slate-500">다운로드, 전체화면이 되는 실습 HTML로 이동합니다.</p>
            </a>
            <a href="/prompt#prompt-memo-board" className="rounded-[24px] border border-violet-200 bg-violet-50/80 p-4 transition hover:-translate-y-1">
              <ClipboardList className="mb-3 h-6 w-6 text-violet-600" />
              <p className="font-black text-slate-950">프롬프트 메모판</p>
              <p className="mt-1 text-sm font-bold leading-6 text-slate-500">강의용 프롬프트를 펼쳐 보고 복사합니다.</p>
            </a>
            <a href="#announcement-board" className="rounded-[24px] border border-slate-300 bg-slate-50/90 p-4 transition hover:-translate-y-1">
              <VenetianMask className="mb-3 h-6 w-6 text-slate-700" />
              <p className="font-black text-slate-950">전달용 게시판</p>
              <p className="mt-1 text-sm font-bold leading-6 text-slate-500">강의자가 칠판처럼 문장과 이미지를 띄우고 지울 수 있습니다.</p>
            </a>
            <a href="#community-sections" className="rounded-[24px] border border-blue-200 bg-blue-50/80 p-4 transition hover:-translate-y-1">
              <MessageSquareText className="mb-3 h-6 w-6 text-blue-600" />
              <p className="font-black text-slate-950">질문 커뮤니티</p>
              <p className="mt-1 text-sm font-bold leading-6 text-slate-500">질문, 첨부, 좋아요, 답글 흐름을 실습합니다.</p>
            </a>
            <a href="#intro-board" className="rounded-[24px] border border-emerald-200 bg-emerald-50/80 p-4 transition hover:-translate-y-1">
              <UserRound className="mb-3 h-6 w-6 text-emerald-600" />
              <p className="font-black text-slate-950">자기소개 게시판</p>
              <p className="mt-1 text-sm font-bold leading-6 text-slate-500">닉네임과 선택값만으로 참여 현황을 집계합니다.</p>
            </a>
          </div>
        </section>

        <section id="community-sections" className="glass-card rounded-[30px] p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-2xl bg-amber-100 px-4 py-2 text-sm font-black text-amber-700">
                <BookOpenCheck className="h-4 w-4" />
                커뮤니티와 실습 연결
              </div>
              <p className="text-2xl font-black text-slate-950">커뮤니티에서 실습 모드로 이어지는 흐름</p>
              <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-slate-600">
                강의 앱 안에서는 커뮤니티 기능을 먼저 보여주고, 실습 자료 확인과 다운로드가 필요한 순간에는 독립 실습 모드로 이동하도록 구조를 나눴습니다.
              </p>
            </div>
            <a href="/practice-mode" className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-card">
              실습 모드 열기
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-[24px] border border-slate-200 bg-white/88 p-5 shadow-sm">
              <p className="text-sm font-black text-violet-700">1. 커뮤니티</p>
              <p className="mt-2 text-lg font-black text-slate-950">질문과 참여 흐름 확인</p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-500">질문 등록, 답글, 자기소개 카드까지 발표용 화면에서 바로 보여줍니다.</p>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-white/88 p-5 shadow-sm">
              <p className="text-sm font-black text-amber-700">2. 실습 모드</p>
              <p className="mt-2 text-lg font-black text-slate-950">독립 실습 자료</p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-500">실습 HTML은 발표용 커뮤니티와 분리되어 저장 내용과 다운로드 흐름을 안정적으로 유지합니다.</p>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-white/88 p-5 shadow-sm">
              <p className="text-sm font-black text-emerald-700">3. 다운로드</p>
              <p className="mt-2 text-lg font-black text-slate-950">HTML과 이미지 바로 받기</p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-500">실습 모드 페이지에서 HTML 파일과 첨부 이미지를 바로 다운로드할 수 있습니다.</p>
            </div>
          </div>
        </section>

        <TrainingAnnouncementBoard />

        <section id="question-board">
          <TrainingQuestionBoard />
        </section>

        <TrainingIntroBoard />
      </div>
    </DeckShell>
  );
}
