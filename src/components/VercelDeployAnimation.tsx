import { Cloud, GitPullRequestArrow, Laptop, Link2 } from "lucide-react";
import { motion } from "motion/react";

export default function VercelDeployAnimation() {
  const nodes = [
    { label: "내 컴퓨터", icon: Laptop, desc: "localhost 개발 화면" },
    { label: "GitHub", icon: GitPullRequestArrow, desc: "소스코드 문서고" },
    { label: "Vercel", icon: Cloud, desc: "웹 공개 게시대" },
    { label: "공개 URL", icon: Link2, desc: "동료가 접속 가능" },
  ];
  return (
    <div className="rounded-[28px] border border-cyan-200 bg-white/82 p-6 shadow-card">
      <div className="grid gap-4 md:grid-cols-4">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.16 }}
              className="rounded-[24px] bg-gradient-to-br from-white to-blue-50 p-5 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-100 text-cyan-700">
                <Icon className="h-7 w-7" />
              </div>
              <p className="font-black text-slate-900">{node.label}</p>
              <p className="mt-2 text-sm text-slate-500">{node.desc}</p>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-5 rounded-2xl bg-violet-50 px-4 py-3 text-center text-sm font-black text-violet-700">
        https://school-question-board.vercel.app
      </div>
    </div>
  );
}
