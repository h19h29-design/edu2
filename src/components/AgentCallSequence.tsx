import { FileCheck2, Sparkles } from "lucide-react";
import { motion } from "motion/react";

type Step = {
  agent: string;
  output: string;
  color?: string;
};

const defaultSteps: Step[] = [
  { agent: "PM Agent", output: "SPEC.md", color: "from-emerald-400 to-lime-400" },
  { agent: "UI Agent", output: "Wireframe", color: "from-pink-400 to-rose-400" },
  { agent: "Dev Agent", output: "React Components", color: "from-sky-400 to-blue-500" },
  { agent: "Review Agent", output: "Test Checklist", color: "from-violet-400 to-fuchsia-500" },
  { agent: "Security Agent", output: "Security Check", color: "from-amber-400 to-orange-500" },
];

export default function AgentCallSequence({ steps = defaultSteps }: { steps?: Step[] }) {
  return (
    <div className="relative grid gap-3 md:grid-cols-5">
      {steps.map((step, index) => (
        <motion.div
          key={step.agent}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.12 }}
          className="relative rounded-[20px] border border-white/70 bg-white/82 p-4 shadow-card"
        >
          <div className={`mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${step.color ?? "from-violet-500 to-blue-500"} text-white`}>
            <Sparkles className="h-6 w-6" />
          </div>
          <p className="text-sm font-black text-slate-900">{step.agent}</p>
          <div className="mt-3 flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-xs font-black text-slate-600">
            <FileCheck2 className="h-4 w-4 text-emerald-500" />
            {step.output}
          </div>
          {index < steps.length - 1 ? <div className="absolute right-[-12px] top-1/2 hidden h-1 w-6 rounded-full bg-violet-300 md:block" /> : null}
        </motion.div>
      ))}
    </div>
  );
}
