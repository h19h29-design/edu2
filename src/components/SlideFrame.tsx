import { ArrowRight, Bot, CheckCircle2, FileText, Lightbulb, Sparkles, Trophy, Wand2 } from "lucide-react";
import { motion } from "motion/react";
import { glossary, glossaryCategoryOrder, glossaryCategoryStyles } from "../data/glossary";
import { schoolTools } from "../data/schoolTools";
import type { Slide } from "../data/slides";
import AgentCallSequence from "./AgentCallSequence";
import ApiFlow from "./ApiFlow";
import CliCodingAnimation from "./CliCodingAnimation";
import CodexWorkspaceAnimation from "./CodexWorkspaceAnimation";
import GithubFlow from "./GithubFlow";
import McpHub from "./McpHub";
import PipelineTimeline from "./PipelineTimeline";
import PromptToHarnessAnimation from "./PromptToHarnessAnimation";
import SecuritySweepAnimation from "./SecuritySweepAnimation";
import SkillManualAnimation from "./SkillManualAnimation";
import SupabaseExpansionAnimation from "./SupabaseExpansionAnimation";
import TrainingQuestionBoard from "./TrainingQuestionBoard";
import VercelDeployAnimation from "./VercelDeployAnimation";
import WorktreeSimulation from "./WorktreeSimulation";
import ClosingTechLeadAnimation from "./ClosingTechLeadAnimation";

type SlideFrameProps = {
  slide: Slide;
  dense?: boolean;
};

function AnimatedCard({
  title,
  desc,
  index,
  tone = "violet",
}: {
  title: string;
  desc: string;
  index: number;
  tone?: "violet" | "emerald" | "blue" | "amber" | "rose";
}) {
  const tones = {
    violet: "from-violet-50 to-white text-violet-700",
    emerald: "from-emerald-50 to-white text-emerald-700",
    blue: "from-blue-50 to-white text-blue-700",
    amber: "from-amber-50 to-white text-amber-700",
    rose: "from-rose-50 to-white text-rose-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 }}
      className={`rounded-[24px] border border-slate-200 bg-gradient-to-br ${tones[tone]} p-5 shadow-sm`}
    >
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm">
        <Sparkles className="h-5 w-5" />
      </div>
      <p className="text-lg font-black text-slate-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
    </motion.div>
  );
}

function OpeningScene() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-[320px] overflow-hidden rounded-[30px] bg-slate-950 p-6 text-white shadow-card">
        <motion.div
          className="absolute left-8 top-8 grid h-28 w-28 place-items-center rounded-[34px] bg-gradient-to-br from-blue-400 to-violet-500 shadow-glow"
          animate={{ rotate: [-5, 5, -2, 0], x: [0, 14, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <Bot className="h-14 w-14" />
        </motion.div>
        <motion.div
          className="absolute bottom-12 left-10 right-10 h-3 rounded-full bg-gradient-to-r from-cyan-300 via-violet-400 to-emerald-300"
          animate={{ scaleX: [0.35, 1, 0.7, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <div className="absolute right-8 top-10 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-cyan-100">
          하네스 장착
        </div>
        <p className="absolute bottom-20 left-10 max-w-lg text-2xl font-black leading-tight">
          AI에게 하네스를 씌우면 AI가 안전하게, 제어되게, 편안하게 쓸 수 있는 도구가 된다.
        </p>
      </div>
      <div className="grid gap-3">
        {["문제를 정확히 설명한다", "Codex에게 구조적으로 맡긴다", "사람이 최종 검토하고 책임진다"].map((item, index) => (
          <AnimatedCard key={item} title={item} desc="비개발자가 Tech Lead처럼 움직이는 핵심 습관입니다." index={index} tone={index === 1 ? "blue" : "violet"} />
        ))}
      </div>
    </div>
  );
}

function ResearchScene() {
  const cards = [
    ["캘리포니아 상해 전문 변호사", "건축 허가/규정 자동 분석 도구. 캘리포니아에서 건축 허가 신청 90%가 반려되는 문제를 해결, 검토 시간을 몇 주에서 15분으로 단축", "금상"],
    ["벨기에 심장내과 과장", "진료 기록을 환자 맞춤 건강 안내로 변환. 환자가 진료 후 진단 내용을 이해하지 못하는 문제 해결", "동상"],
    ["우간다 인프라/도로 엔지니어", "차량 블랙박스 영상을 도로 인프라 투자 추천 보고서로 자동 변환", "Keep Thinking 상"],
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map(([title, desc, award], index) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 24, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: index * 0.16 }}
          className="glass-card rounded-[28px] p-6"
        >
          <div className={`mb-6 inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-black ${index === 0 ? "bg-amber-100 text-amber-700" : index === 1 ? "bg-orange-100 text-orange-700" : "bg-violet-100 text-violet-700"}`}>
            <Trophy className="h-5 w-5" />
            {award}
          </div>
          <p className="text-2xl font-black leading-tight text-slate-950">{title}</p>
          <p className="mt-4 text-base leading-7 text-slate-600">{desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

function DomainScene() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
      <div className="glass-card rounded-[28px] p-6">
        <p className="mb-4 text-sm font-black text-slate-500">외부 개발자</p>
        {["양식이 왜 불편한지 추측", "현장 예외상황은 인터뷰 필요", "언어를 다시 번역해야 함"].map((item, index) => (
          <AnimatedCard key={item} title={item} desc="문제와 사용자 맥락을 밖에서 이해해야 합니다." index={index} tone="amber" />
        ))}
      </div>
      <div className="hidden items-center text-violet-500 lg:flex">
        <ArrowRight className="h-10 w-10" />
      </div>
      <div className="glass-card rounded-[28px] p-6">
        <p className="mb-4 text-sm font-black text-emerald-600">현장 공무원</p>
        {["반복 업무를 직접 겪음", "검토 기준과 예외를 알고 있음", "사용자 언어로 바로 설명 가능"].map((item, index) => (
          <AnimatedCard key={item} title={item} desc="도메인 전문성이 곧 좋은 요구사항의 출발점입니다." index={index} tone="emerald" />
        ))}
      </div>
    </div>
  );
}

function GlossaryScene() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {glossaryCategoryOrder.map((category, groupIndex) => {
        const items = glossary.filter((item) => item.category === category);
        const style = glossaryCategoryStyles[category];
        return (
          <motion.section
            key={category}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
            className={`rounded-[28px] border p-4 shadow-sm ${style.shell}`}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${style.dot}`} />
                  <p className="text-lg font-black text-slate-950">{category}</p>
                </div>
                <p className="mt-1 text-xs font-bold text-slate-500">{style.short}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${style.badge}`}>{items.length}개</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {items.map((item, index) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, rotateY: -16 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ delay: groupIndex * 0.1 + index * 0.04 }}
                  className="rounded-[18px] border border-white/80 bg-white/86 p-3 shadow-sm"
                >
                  <p className="text-base font-black text-slate-900">{item.term}</p>
                  <p className={`mt-2 rounded-2xl px-3 py-2 text-xs font-black ${style.chip}`}>{item.easy}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{item.analogy}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}

function HarnessCoreScene() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white shadow-card">
        <motion.div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-rose-500/30 blur-2xl" animate={{ x: [0, 120, 20], y: [0, 40, 120] }} transition={{ repeat: Infinity, duration: 5 }} />
        <p className="relative text-sm font-black text-rose-200">통제되지 않은 AI</p>
        <p className="relative mt-4 text-2xl font-black">결과가 흔들릴 수 있습니다</p>
        <div className="relative mt-8 space-y-3">
          {["말이 달라짐", "범위가 커짐", "보안 기준 누락"].map((item, index) => (
            <motion.div key={item} animate={{ x: [0, index % 2 ? 8 : -8, 0] }} transition={{ repeat: Infinity, duration: 1.8 + index * 0.3 }} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold">
              {item}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="glass-card rounded-[28px] p-6">
        <FileText className="mb-5 h-10 w-10 text-violet-600" />
        <p className="text-3xl font-black text-slate-950">SPEC.md(프로젝트 명세서)가 기준점</p>
        <p className="mt-4 text-base leading-7 text-slate-600">요구사항, 테스트, 보안 기준이 먼저 고정되면 코드가 바뀌어도 검토 기준이 남습니다.</p>
        <div className="mt-5 grid gap-3">
          {["요구사항", "구현 계획", "검수 기준"].map((item, index) => (
            <motion.div key={item} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.12 }} className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 font-black text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PluginArsenalScene() {
  const cards = [
    ["Plugin", "확장 장치", "Codex에게 특정 업무 능력과 외부 도구 연결을 붙여주는 방식입니다."],
    ["Superpowers", "작업 흐름 강화", "요구사항 정리, 하네스 프롬프트, 구현 계획 같은 앞단 작업을 더 구조화합니다."],
    ["GitHub Plugin", "협업 문서고 연결", "저장소, 이슈, PR, 변경 이력을 Codex 작업 흐름과 연결합니다."],
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map(([title, analogy, desc], index) => (
        <AnimatedCard key={title} title={`${title} → ${analogy}`} desc={desc} index={index} tone={index === 1 ? "emerald" : "violet"} />
      ))}
    </div>
  );
}

function NodeEnvScene() {
  const cards = [
    ["Node.js", "내 컴퓨터에서 React/Vite 개발 도구를 실행하는 엔진입니다."],
    ["npm install", "프로젝트가 필요로 하는 부품을 내려받아 설치합니다."],
    ["npm run dev", "발표 전 로컬 개발 서버를 띄워 화면을 확인합니다."],
    ["npm run build", "배포 가능한 정적 파일을 dist 폴더에 만듭니다."],
    ["Env Variable", "API Key 같은 비밀 설정을 코드 밖에 보관합니다."],
    [".env.example", "실제 비밀값 없이 필요한 설정 이름만 안내하는 안전한 예시 파일입니다."],
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="dark-terminal rounded-[28px] p-5 text-white">
        <div className="mb-4 flex items-center gap-2 font-black text-cyan-100">
          <Wand2 className="h-5 w-5" />
          PowerShell 흐름
        </div>
        <pre className="rounded-2xl bg-black/40 p-5 font-mono text-sm leading-8 text-emerald-100">{`PS D:\\gpt\\edu> npm install
 필요한 부품 설치 완료

PS D:\\gpt\\edu> npm run dev
 http://localhost:5174

PS D:\\gpt\\edu> npm run build
 dist 생성 완료`}</pre>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {cards.map(([title, desc], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-[22px] border border-slate-200 bg-white/86 p-5 shadow-sm"
          >
            <CheckCircle2 className="mb-4 h-6 w-6 text-emerald-500" />
            <p className="text-xl font-black text-slate-950">{title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function QuestionBoardScene() {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="glass-card rounded-[28px] p-5">
        <p className="mb-4 text-xl font-black text-slate-950">LiveBuildSimulation</p>
        <AgentCallSequence />
      </div>
      <div className="max-h-[520px] overflow-auto rounded-[28px]">
        <TrainingQuestionBoard compact />
      </div>
    </div>
  );
}

function CodexClaudeComparison() {
  const rows = [
    {
      label: "작업 화면",
      codex: "GUI에서 대화, 파일 변경, diff, 실행 결과를 함께 확인합니다.",
      claude: "터미널 중심으로 빠르게 명령하고 결과를 읽는 방식에 가깝습니다.",
    },
    {
      label: "토큰·맥락",
      codex: "계획, 파일, 변경점 단위로 맥락을 나눠 검토하기 쉽습니다.",
      claude: "긴 CLI 세션에서는 필요한 파일만 열어 토큰 낭비를 줄이는 운영이 중요합니다.",
    },
    {
      label: "성능 체감",
      codex: "비개발자가 승인, 수정 요청, 빌드 확인을 따라가기 좋습니다.",
      claude: "숙련자가 터미널에서 반복 구현과 리팩터링을 빠르게 밀기 좋습니다.",
    },
    {
      label: "추천 상황",
      codex: "교육, 발표, 검토 중심 협업, 업무도구 제작 흐름에 적합합니다.",
      claude: "CLI에 익숙한 개발자의 빠른 실험과 자동화 루틴에 적합합니다.",
    },
  ];

  return (
    <div className="rounded-[26px] border border-violet-200 bg-white/88 p-4 shadow-card">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-lg font-black text-slate-950">Codex GUI · Claude Code · 토큰/성능 비교</p>
          <p className="text-xs font-bold text-slate-500">공식 벤치마크가 아니라 수업용 선택 기준입니다.</p>
        </div>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">교육용 비교표</span>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="grid grid-cols-[0.72fr_1fr_1fr] bg-slate-950 text-xs font-black text-white md:text-sm">
          <div className="px-3 py-2">기준</div>
          <div className="px-3 py-2">Codex GUI</div>
          <div className="px-3 py-2">Claude Code</div>
        </div>
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[0.72fr_1fr_1fr] border-t border-slate-200 bg-white text-xs font-bold leading-5 text-slate-700 md:text-sm">
            <div className="bg-violet-50 px-3 py-2 font-black text-violet-800">{row.label}</div>
            <div className="px-3 py-2">{row.codex}</div>
            <div className="px-3 py-2">{row.claude}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchoolToolsScene() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {schoolTools.map((tool, index) => (
        <AnimatedCard key={tool.title} title={tool.title} desc={`${tool.description} 확장 포인트: ${tool.expansion.join(" · ")}`} index={index} tone={index === 0 ? "emerald" : index === 1 ? "blue" : index === 2 ? "violet" : "amber"} />
      ))}
    </div>
  );
}

function SetupScene() {
  const items = ["ChatGPT/Codex", "GitHub 계정", "Vercel 계정", "Supabase 계정", "Node.js", "VS Code 또는 Codex 환경"];
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item, index) => (
        <motion.div key={item} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-white/85 p-5 shadow-sm">
          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          <span className="font-black text-slate-800">{item}</span>
        </motion.div>
      ))}
      <div className="rounded-[22px] bg-violet-600 p-5 font-black text-white md:col-span-3">복습 루틴: 아이디어 → SPEC → 구현 → 빌드 → 보안 점검 → 배포 전 검토</div>
    </div>
  );
}

function renderAnimation(slide: Slide) {
  switch (slide.animationType) {
    case "opening":
      return <OpeningScene />;
    case "research":
      return <ResearchScene />;
    case "domain":
      return <DomainScene />;
    case "codex-coding":
      return (
        <div className="space-y-4">
          <div className="grid gap-4 2xl:grid-cols-[0.78fr_1.22fr]">
            <CliCodingAnimation />
            <CodexWorkspaceAnimation />
          </div>
          <CodexClaudeComparison />
        </div>
      );
    case "glossary":
      return <GlossaryScene />;
    case "node-env":
      return <NodeEnvScene />;
    case "mcp":
      return <McpHub />;
    case "api":
      return <ApiFlow />;
    case "skill":
      return <SkillManualAnimation />;
    case "prompt-harness":
      return <PromptToHarnessAnimation />;
    case "harness-core":
      return <HarnessCoreScene />;
    case "plugin-arsenal":
      return <PluginArsenalScene />;
    case "github":
      return <GithubFlow />;
    case "vercel":
      return <VercelDeployAnimation />;
    case "supabase":
      return <SupabaseExpansionAnimation />;
    case "pipeline":
      return <PipelineTimeline />;
    case "question-board":
      return <QuestionBoardScene />;
    case "school-tools":
      return <SchoolToolsScene />;
    case "worktree":
      return <WorktreeSimulation />;
    case "security":
      return <SecuritySweepAnimation />;
    case "setup":
      return <SetupScene />;
    case "closing":
      return <ClosingTechLeadAnimation />;
    default:
      return null;
  }
}

export default function SlideFrame({ slide, dense = false }: SlideFrameProps) {
  return (
    <section className="space-y-5">
      <motion.div key={slide.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-black text-violet-700">{slide.number}</span>
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-700">{slide.chapter}</span>
        </div>
        <h1 className={dense ? "mt-4 whitespace-pre-line text-4xl font-black tracking-normal text-slate-950 xl:text-6xl" : "mt-5 whitespace-pre-line text-3xl font-black tracking-normal text-slate-950 md:text-5xl"}>{slide.title}</h1>
        {slide.subtitle ? <p className="mt-3 text-xl font-bold leading-8 text-slate-700 md:text-2xl">{slide.subtitle}</p> : null}
        <div className="mt-4 rounded-[24px] border border-violet-200 bg-white/80 px-5 py-4 text-lg font-black leading-8 text-violet-900 shadow-sm">
          <Lightbulb className="mr-2 inline h-5 w-5 text-violet-600" />
          {slide.coreMessage}
        </div>
      </motion.div>
      <div>{renderAnimation(slide)}</div>
      {slide.id === "codex-why" ? (
        <div className="rounded-[24px] bg-slate-950 px-5 py-4 text-center text-lg font-black text-cyan-100">
          그렇다면 이제 Codex를 쓰기 위해 최소한 알아야 할 용어들을 보겠습니다.
        </div>
      ) : null}
    </section>
  );
}
