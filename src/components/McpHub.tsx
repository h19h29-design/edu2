import { Bot, Database, FileText, GitPullRequestArrow, Monitor, UploadCloud } from "lucide-react";
import { motion } from "motion/react";

const tools = [
  { label: "파일 읽기", icon: FileText },
  { label: "GitHub 확인", icon: GitPullRequestArrow },
  { label: "DB 조회", icon: Database },
  { label: "브라우저 조작", icon: Monitor },
  { label: "문서 생성", icon: FileText },
  { label: "배포 확인", icon: UploadCloud },
];

export default function McpHub() {
  return (
    <div className="relative grid min-h-[420px] place-items-center rounded-[28px] border border-cyan-200 bg-white/82 p-6 shadow-card">
      <div className="absolute inset-8 rounded-full border border-dashed border-cyan-200" />
      <motion.div
        className="z-10 grid h-36 w-36 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-glow"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <Bot className="h-14 w-14" />
        <span className="absolute -bottom-8 text-sm font-black text-slate-700">MCP 허브</span>
      </motion.div>
      <div className="absolute inset-0">
        {tools.map((tool, index) => {
          const angle = (index / tools.length) * Math.PI * 2;
          const x = 45 + Math.cos(angle) * 36;
          const y = 45 + Math.sin(angle) * 32;
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.12 }}
              className="absolute rounded-[20px] border border-white bg-white/90 px-4 py-3 shadow-card"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            >
              <div className="flex items-center gap-2 text-sm font-black text-slate-700">
                <Icon className="h-4 w-4 text-violet-600" />
                {tool.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
