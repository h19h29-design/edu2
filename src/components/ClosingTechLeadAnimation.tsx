import confetti from "canvas-confetti";
import { CheckCircle2, Crown, PartyPopper } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const reports = ["PM Agent: SPEC 완료", "UI Agent: 화면 설계 완료", "Dev Agent: 구현 완료", "Review Agent: 빌드 확인", "Security Agent: 개인정보/API Key 점검"];

export default function ClosingTechLeadAnimation() {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (activated) {
      void confetti({ particleCount: 140, spread: 85, origin: { y: 0.72 } });
    }
  }, [activated]);

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="glass-card rounded-[28px] p-6">
        <p className="mb-4 text-xl font-black text-slate-950">완료 보고</p>
        <div className="space-y-3">
          {reports.map((report, index) => (
            <motion.div key={report} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.12 }} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 font-black text-slate-700 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              {report}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-[30px] bg-slate-950 p-8 text-center text-white shadow-card">
        <motion.div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-[32px] bg-gradient-to-br from-violet-500 to-cyan-400 shadow-glow" animate={{ scale: activated ? [1, 1.08, 1] : 1 }} transition={{ repeat: activated ? Infinity : 0, duration: 2 }}>
          <Crown className="h-12 w-12" />
        </motion.div>
        <p className="text-4xl font-black">{activated ? "Tech Lead Mode Activated" : "최종 체크"}</p>
        <p className="mt-4 text-xl font-bold text-cyan-100">AI를 통제하는 사람이 결과물을 만든다.</p>
        <button type="button" onClick={() => setActivated(true)} className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-black text-violet-700 shadow-glow">
          <PartyPopper className="h-5 w-5" />
          당신은 이제 Tech Lead입니다
        </button>
      </div>
    </div>
  );
}
