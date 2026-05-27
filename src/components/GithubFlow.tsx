import { Check, GitBranch, GitCommitHorizontal, GitMerge, GitPullRequestArrow, UploadCloud } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  { label: "Branch", desc: "수정 작업본", icon: GitBranch },
  { label: "Commit", desc: "중간 결재 기록", icon: GitCommitHorizontal },
  { label: "Push", desc: "문서고에 올리기", icon: UploadCloud },
  { label: "Pull Request", desc: "검토 요청", icon: GitPullRequestArrow },
  { label: "Merge", desc: "최종 반영", icon: GitMerge },
];

export default function GithubFlow() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/82 p-6 shadow-card">
      <div className="grid gap-3 md:grid-cols-5">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              className="relative rounded-[22px] border border-slate-200 bg-slate-50 p-4"
            >
              <Icon className="mb-4 h-8 w-8 text-slate-800" />
              <p className="font-black text-slate-900">{step.label}</p>
              <p className="mt-2 text-sm text-slate-500">{step.desc}</p>
              <div className="mt-4 flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                <Check className="h-3 w-3" />
                기록됨
              </div>
              {index < steps.length - 1 ? <div className="absolute right-[-8px] top-1/2 hidden h-1 w-4 rounded-full bg-slate-300 md:block" /> : null}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
