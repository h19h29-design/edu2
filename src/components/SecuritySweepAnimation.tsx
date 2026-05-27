import { CheckCircle2, Radar, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

const checks = ["실제 개인정보 없음", "전화번호/주민번호/건강정보 없음", "API Key 없음", "더미 데이터 사용", "사람이 최종 검토"];

export default function SecuritySweepAnimation() {
  return (
    <div className="rounded-[28px] border border-amber-200 bg-white/82 p-6 shadow-card">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative grid min-h-[300px] place-items-center rounded-[24px] bg-slate-950 text-white">
          <motion.div
            className="absolute h-52 w-52 rounded-full border border-emerald-300/40"
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.35, 0.9, 0.35] }}
            transition={{ repeat: Infinity, duration: 2.8 }}
          />
          <Radar className="h-20 w-20 text-emerald-300" />
          <div className="absolute bottom-5 rounded-full bg-emerald-400/20 px-4 py-2 text-sm font-black text-emerald-200">
            CSO PASS
          </div>
        </div>
        <div className="space-y-3">
          {checks.map((check, index) => (
            <motion.div
              key={check}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12 }}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black text-slate-700"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              {check}
            </motion.div>
          ))}
          <div className="flex items-start gap-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
            외부 서비스 연결 전에는 기관 내부 규정, 계정 소유권, 보존기간, 요금, 장애 가능성을 확인합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
