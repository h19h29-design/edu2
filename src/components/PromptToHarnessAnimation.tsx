import { ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { motion } from "motion/react";
import { promptBlocks } from "../data/prompts";

export default function PromptToHarnessAnimation() {
  return (
    <div className="rounded-[28px] border border-violet-200 bg-white/82 p-6 shadow-card">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, rotate: -1, y: 10 }}
          animate={{ opacity: 1, rotate: 0, y: 0 }}
          className="rounded-[24px] border border-rose-200 bg-rose-50 p-6"
        >
          <p className="mb-3 text-sm font-black text-rose-600">나쁜 프롬프트</p>
          <p className="text-3xl font-black text-slate-900">“시간 관리 앱 만들어줘.”</p>
          <div className="mt-6 h-1 rounded-full bg-rose-300" />
          <p className="mt-4 text-sm font-bold text-rose-700">역할, 범위, 검토 기준, 보안 기준이 비어 있습니다.</p>
        </motion.div>
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-violet-600" />
            <p className="font-black text-slate-900">하네스 블록으로 분해 후 재조립</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {promptBlocks.map((block, index) => (
              <motion.div
                key={block}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <Sparkles className="mb-3 h-5 w-5 text-violet-500" />
                <p className="text-sm font-black text-slate-800">{block}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 rounded-[22px] bg-gradient-to-r from-violet-600 to-blue-500 p-5 text-white">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              <p className="font-black">좋은 하네스 프롬프트</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-violet-50">
              역할, 업무배경, 기능범위, 제약조건, 테스트, 보안기준을 포함해 Codex가 안전하게 작업하도록 만듭니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
