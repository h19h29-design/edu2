import type { Slide } from "./slides";

export type AgentState = "대기 중" | "호출됨" | "분석 중" | "설계 중" | "구현 중" | "검토 중" | "보안 점검 중" | "완료";

export type Agent = {
  name: string;
  shortName: string;
  role: string;
  color: string;
  accent: string;
};

export const agents: Agent[] = [
  { name: "Main Agent", shortName: "Main", role: "전체 방향 결정, 최종 통합", color: "from-indigo-500 to-purple-500", accent: "#7c3aed" },
  { name: "PM Agent", shortName: "PM", role: "요구사항 정리, Spec 작성", color: "from-emerald-400 to-lime-400", accent: "#22c55e" },
  { name: "UI/UX Agent", shortName: "UI", role: "화면 설계, 사용자 경험 검토", color: "from-pink-400 to-rose-400", accent: "#f472b6" },
  { name: "Dev Agent", shortName: "Dev", role: "코드 구현", color: "from-sky-400 to-blue-500", accent: "#0ea5e9" },
  { name: "Review Agent", shortName: "Review", role: "오류 검토, 테스트 기준 확인", color: "from-violet-400 to-fuchsia-500", accent: "#a855f7" },
  { name: "Security Agent", shortName: "CSO", role: "개인정보/API Key 점검", color: "from-amber-400 to-orange-500", accent: "#f59e0b" },
  { name: "Deploy Agent", shortName: "Deploy", role: "배포 준비, URL 공개 흐름 설명", color: "from-cyan-400 to-teal-500", accent: "#06b6d4" },
  { name: "Research Agent", shortName: "Research", role: "사례와 자료 정리", color: "from-blue-400 to-indigo-500", accent: "#3b82f6" },
  { name: "Glossary Agent", shortName: "Glossary", role: "개발 용어를 행정업무 비유로 변환", color: "from-purple-400 to-indigo-500", accent: "#8b5cf6" },
  { name: "Tool Agent", shortName: "Tool", role: "MCP/API/외부 도구 연결 설명", color: "from-cyan-400 to-blue-500", accent: "#22d3ee" },
  { name: "Database Agent", shortName: "DB", role: "Supabase/localStorage 차이 설명", color: "from-emerald-400 to-cyan-500", accent: "#10b981" },
];

export function agentStateForSlide(agentName: string, slide: Slide, index: number): { state: AgentState; progress: number } {
  if (!slide.agents.includes(agentName)) return { state: "대기 중", progress: 8 };
  const stateCycle: AgentState[] = ["호출됨", "분석 중", "설계 중", "구현 중", "검토 중", "완료"];
  if (agentName.includes("Security") || slide.animationType === "security") {
    return { state: "보안 점검 중", progress: 84 };
  }
  const state = stateCycle[(index + slide.number.length) % stateCycle.length];
  return { state, progress: Math.min(96, 42 + index * 9 + slide.agents.length * 4) };
}

export function getAgent(name: string) {
  return agents.find((agent) => agent.name === name) ?? agents[0];
}
