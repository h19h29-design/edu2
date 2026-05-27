import { ArrowRight, FileInput, KeyRound, MapPinned, MessageCircle, Sheet } from "lucide-react";
import { motion } from "motion/react";

const services = [
  { label: "Google Sheets", icon: Sheet },
  { label: "Telegram", icon: MessageCircle },
  { label: "Kakao Map", icon: MapPinned },
];

export default function ApiFlow() {
  return (
    <div className="rounded-[28px] border border-blue-200 bg-white/82 p-6 shadow-card">
      <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
        <motion.div className="rounded-[22px] bg-blue-50 p-5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <FileInput className="mb-3 h-8 w-8 text-blue-600" />
          <p className="font-black text-slate-900">요청서</p>
          <p className="mt-2 text-sm text-slate-600">정해진 형식으로 보내기</p>
        </motion.div>
        <ArrowRight className="hidden h-8 w-8 text-violet-500 md:block" />
        <div className="grid gap-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.12 }}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black text-slate-700"
              >
                <Icon className="h-5 w-5 text-cyan-500" />
                {service.label}
              </motion.div>
            );
          })}
        </div>
        <ArrowRight className="hidden h-8 w-8 text-violet-500 md:block" />
        <motion.div className="rounded-[22px] bg-emerald-50 p-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <KeyRound className="mb-3 h-8 w-8 text-emerald-600" />
          <p className="font-black text-slate-900">응답 문서</p>
          <p className="mt-2 text-sm text-slate-600">API Key는 출입증처럼 보관</p>
        </motion.div>
      </div>
      <div className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
        API Key를 GitHub에 공개하면 빨간 경고입니다.
      </div>
    </div>
  );
}
