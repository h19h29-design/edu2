import confetti from "canvas-confetti";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

const checks = [
  "실제 개인정보 없음",
  "전화번호/주민번호/건강정보 없음",
  "API Key 없음",
  "더미 데이터 사용",
  "외부 서비스 규정 확인",
  "무료 서비스 위험 확인",
  "사람이 최종 검토",
];

export default function SecurityChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const allDone = useMemo(() => checks.every((check) => done[check]), [done]);

  useEffect(() => {
    if (allDone) {
      void confetti({ particleCount: 90, spread: 70, origin: { y: 0.75 } });
    }
  }, [allDone]);

  return (
    <div className="glass-card rounded-[28px] p-5">
      <div className="mb-4 flex items-start gap-3">
        <ShieldAlert className="mt-1 h-7 w-7 text-amber-500" />
        <div>
          <p className="text-2xl font-black text-slate-950">보안 체크리스트</p>
          <p className="mt-1 text-sm font-bold leading-6 text-amber-800">
            이 강의 데모는 교육용이며 실제 학생, 학부모, 교직원 개인정보를 입력하지 않습니다. 외부 서비스 연결 전에는 기관 내부 규정, 계정 소유권, 보존기간, 요금, 장애 가능성을 반드시 확인해야 합니다.
          </p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {checks.map((check) => (
          <button
            type="button"
            key={check}
            onClick={() => setDone((current) => ({ ...current, [check]: !current[check] }))}
            className={clsx("flex items-center gap-3 rounded-2xl border px-4 py-3 text-left font-black transition", done[check] ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-700")}
          >
            <ShieldCheck className={clsx("h-5 w-5", done[check] ? "text-emerald-500" : "text-slate-300")} />
            {check}
          </button>
        ))}
      </div>
      {allDone ? <div className="mt-4 rounded-2xl bg-emerald-500 px-5 py-4 text-center text-xl font-black text-white">CSO PASS</div> : null}
    </div>
  );
}
