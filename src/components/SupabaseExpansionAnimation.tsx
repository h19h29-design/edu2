import { Archive, Database, LockKeyhole, RefreshCw, Users } from "lucide-react";
import { motion } from "motion/react";

export default function SupabaseExpansionAnimation() {
  return (
    <div className="grid gap-5 rounded-[28px] border border-emerald-200 bg-white/82 p-6 shadow-card md:grid-cols-[0.9fr_1.1fr]">
      <motion.div className="rounded-[24px] bg-emerald-50 p-6" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}>
        <Archive className="mb-4 h-10 w-10 text-emerald-600" />
        <p className="text-2xl font-black text-slate-900">localStorage</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">개인 브라우저 서랍. 연습과 오프라인 데모에 좋습니다.</p>
      </motion.div>
      <motion.div className="rounded-[24px] bg-gradient-to-br from-blue-50 to-violet-50 p-6" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}>
        <Database className="mb-4 h-10 w-10 text-blue-600" />
        <p className="text-2xl font-black text-slate-900">Supabase</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">공유 DB, 로그인, 파일 저장, 실시간 갱신으로 확장할 수 있습니다.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[["Database", Database], ["Login/Auth", LockKeyhole], ["File Storage", Users], ["Realtime", RefreshCw]].map(([label, Icon]) => {
            const LucideIcon = Icon as typeof Database;
            return (
              <div key={label as string} className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-black text-slate-700">
                <LucideIcon className="h-4 w-4 text-violet-600" />
                {label as string}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
