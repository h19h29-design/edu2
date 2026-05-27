import { BookMarked, FileText, FlaskConical, Presentation, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const skills = [
  { label: "PPT 생성", icon: Presentation },
  { label: "PDF 요약", icon: FileText },
  { label: "코드리뷰", icon: ShieldCheck },
  { label: "테스트 생성", icon: FlaskConical },
];

export default function SkillManualAnimation() {
  return (
    <div className="grid gap-5 rounded-[28px] border border-violet-200 bg-white/82 p-6 shadow-card md:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-[24px] bg-gradient-to-br from-violet-500 to-blue-500 p-6 text-white">
        <BookMarked className="mb-5 h-12 w-12" />
        <p className="text-2xl font-black">Skill은 업무 매뉴얼</p>
        <p className="mt-3 text-sm leading-6 text-violet-50">신규 직원에게 업무 절차서를 주듯, Codex에게도 작업 방식을 알려줍니다.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Icon className="mb-4 h-8 w-8 text-violet-600" />
              <p className="text-lg font-black text-slate-900">{skill.label}</p>
              <p className="mt-2 text-sm text-slate-500">반복 작업 노하우</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
