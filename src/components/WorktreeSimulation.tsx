import { GitBranch, GitMerge, Layers3 } from "lucide-react";
import { motion } from "motion/react";

const branches = [
  ["PM Agent", "SPEC.md"],
  ["UI Agent", "DESIGN.md"],
  ["Dev Agent", "React Components"],
  ["Review Agent", "TEST_REPORT.md"],
  ["Security Agent", "SECURITY_CHECK.md"],
];

export default function WorktreeSimulation() {
  return (
    <div className="rounded-[28px] border border-violet-200 bg-white/82 p-6 shadow-card">
      <div className="mb-5 flex items-center gap-3">
        <Layers3 className="h-8 w-8 text-violet-600" />
        <div>
          <p className="text-xl font-black text-slate-900">서브에이전트 병렬 작업 시뮬레이션</p>
          <p className="text-sm text-slate-500">실제 Git 명령 없이 교육용으로 흐름을 보여줍니다.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        {branches.map(([agent, output], index) => (
          <motion.div
            key={agent}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 }}
            className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
          >
            <GitBranch className="mb-4 h-7 w-7 text-violet-600" />
            <p className="font-black text-slate-900">{agent}</p>
            <p className="mt-2 rounded-2xl bg-white px-3 py-2 text-xs font-black text-slate-600">{output}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
        <GitMerge className="h-5 w-5" />
        Main Agent가 결과를 병합하고 최종 기준으로 검토합니다.
      </div>
    </div>
  );
}
