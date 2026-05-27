import { Bot, CheckCircle2, FileCode2, GitPullRequestArrow, ListChecks, MessageSquare, Wand2 } from "lucide-react";
import { motion } from "motion/react";

const files = ["docs/SPEC.md", "docs/RUNBOOK.md", "src/App.tsx", "src/components/QuestionBoard.tsx", "src/data/slides.ts"];
const planCards = ["요구사항 정리", "데이터 모델", "화면 구성", "구현 및 테스트"];

export default function CodexWorkspaceAnimation() {
  return (
    <div className="h-full rounded-[28px] border border-blue-200 bg-white/88 p-3 shadow-card">
      <div className="mb-3 flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2.5 text-white">
        <div className="flex items-center gap-2 font-black">
          <Bot className="h-5 w-5" />
          Codex GUI 작업 공간
        </div>
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black">Build Success</span>
      </div>
      <div className="grid gap-3 md:grid-cols-[0.72fr_1fr]">
        <div className="space-y-3">
          <div className="rounded-2xl bg-slate-50 p-3">
          <p className="mb-2 text-xs font-black text-slate-500">파일 트리</p>
          {files.map((file, index) => (
            <motion.div
              key={file}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12 }}
              className="mb-2 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-600"
            >
              <FileCode2 className="h-4 w-4 text-blue-500" />
              <span className="truncate">{file}</span>
            </motion.div>
          ))}
          </div>
          <div className="rounded-2xl bg-slate-950 p-3 text-white">
            <div className="mb-2 flex items-center gap-2 text-xs font-black text-cyan-200">
              <GitPullRequestArrow className="h-4 w-4" />
              diff preview
            </div>
            <pre className="whitespace-pre-wrap rounded-xl bg-black/40 p-3 text-[11px] leading-5 text-emerald-200">{`+ docs/SPEC.md
+ QuestionBoard
+ localStorage
 npm run build: passed`}</pre>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-3 shadow-inner">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-violet-100 text-violet-700">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                학교 업무용 질문·투표 보드를 만들어줘. 하네스 엔지니어링 방식으로 먼저 SPEC과 구현 계획부터 작성해줘.
              </div>
            </div>
            <div className="ml-12 rounded-2xl bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-900">
              요구사항을 구조화하고, PM/UI/개발/리뷰/보안 관점에서 작업을 나누겠습니다.
            </div>
            <div className="grid grid-cols-2 gap-2">
              {planCards.map((card, index) => (
                <motion.div
                  key={card}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.12 }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-black text-slate-700"
                >
                  {card}
                  <CheckCircle2 className="mt-2 h-4 w-4 text-emerald-500" />
                </motion.div>
              ))}
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                <ListChecks className="h-4 w-4" />
                Apply ready
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-violet-50 px-3 py-2 text-xs font-black text-violet-700">
                <Wand2 className="h-4 w-4" />
                검토 가능
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
