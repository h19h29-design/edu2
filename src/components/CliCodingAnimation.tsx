import { CheckCircle2, FilePlus2, Terminal } from "lucide-react";
import { motion } from "motion/react";

const terminalLines = [
  "$ codex",
  "/goal 학교 업무용 질문·투표 보드 만들기",
  "> Analyzing requirements...",
  "> Creating docs/SPEC.md",
  "> Creating src/components/QuestionBoard.tsx",
  "> Running tests...",
  "> npm run build",
  "✓ Build passed",
];

const files = ["docs/SPEC.md", "docs/DESIGN.md", "src/components/QuestionBoard.tsx", "src/data/demoQuestions.ts", "dist/index.html"];

export default function CliCodingAnimation() {
  return (
    <div className="dark-terminal h-full rounded-[26px] p-4 text-white">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-sm font-black">
          <Terminal className="h-5 w-5 text-cyan-300" />
          CLI (명령줄) 작업
        </div>
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_0.55fr]">
        <div className="min-h-[290px] rounded-2xl bg-black/40 p-4 font-mono text-[13px] leading-7 md:text-sm">
          {terminalLines.map((line, index) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.45 }}
              className={line.includes("Build passed") ? "text-emerald-300" : line.startsWith("$") ? "text-rose-300" : line.startsWith("/") ? "text-violet-300" : "text-slate-200"}
            >
              {line}
              {index === terminalLines.length - 1 ? <span className="ml-1 animate-pulse">▌</span> : null}
            </motion.div>
          ))}
        </div>
        <div className="rounded-2xl bg-white/8 p-3">
          <p className="mb-3 text-xs font-black text-cyan-200">파일 트리</p>
          <div className="space-y-2">
            {files.map((file, index) => (
              <motion.div
                key={file}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.28 }}
                className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs text-slate-100"
              >
                <FilePlus2 className="h-4 w-4 text-cyan-300" />
                <span className="truncate">{file}</span>
                <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
