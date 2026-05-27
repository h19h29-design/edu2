import { motion } from "motion/react";

const steps = ["아이디어", "브레인스토밍", "Spec", "구현 계획", "Codex 실행", "검토", "수정", "배포", "기록"];

export default function PipelineTimeline() {
  return (
    <div className="rounded-[28px] border border-blue-200 bg-white/82 p-6 shadow-card">
      <div className="grid gap-3 md:grid-cols-9">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="relative rounded-[20px] bg-gradient-to-br from-white to-blue-50 p-4 text-center shadow-sm"
          >
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-black text-white">
              {index + 1}
            </div>
            <p className="text-sm font-black text-slate-800">{step}</p>
            {index < steps.length - 1 ? <div className="absolute right-[-8px] top-1/2 hidden h-1 w-4 rounded-full bg-violet-300 md:block" /> : null}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
