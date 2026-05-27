export type SlideVisual = {
  src: string;
  alt: string;
  caption: string;
};

export const slideVisuals: Record<string, SlideVisual> = {
  opening: {
    src: "/assets/learning-visuals/opening.svg",
    alt: "AI를 안전하게 제어하는 하네스 개념 인포그래픽",
    caption: "AI를 그냥 쓰는 것이 아니라 기준과 검토 절차 안에서 쓰는 모습을 보여줍니다.",
  },
  "hackathon-case": {
    src: "/assets/learning-visuals/hackathon-case.svg",
    alt: "비개발자 해커톤 우승 사례 인포그래픽",
    caption: "현장 문제를 잘 아는 사람이 AI로 구현까지 밀어붙인 사례를 시각화했습니다.",
  },
  "domain-expert": {
    src: "/assets/learning-visuals/domain-expert.svg",
    alt: "도메인 전문가의 강점 인포그래픽",
    caption: "학교 행정 맥락, 예외상황, 사용자 언어가 좋은 요구사항의 출발점입니다.",
  },
  "codex-why": {
    src: "/assets/learning-visuals/codex-why.svg",
    alt: "Codex를 실행 파트너로 쓰는 이유 인포그래픽",
    caption: "Codex는 대화만 하는 도구가 아니라 파일, 코드, 빌드, 검토까지 이어주는 실행 파트너입니다.",
  },
  "terms-map": {
    src: "/assets/learning-visuals/terms-map.svg",
    alt: "바이브 코딩 용어 지도 인포그래픽",
    caption: "GitHub, API, MCP, Env 같은 용어를 행정업무 비유로 묶어 봅니다.",
  },
  mcp: {
    src: "/assets/learning-visuals/mcp.svg",
    alt: "MCP 허브 인포그래픽",
    caption: "MCP는 AI가 여러 도구를 꽂아 쓰는 안전한 멀티탭처럼 이해하면 쉽습니다.",
  },
  api: {
    src: "/assets/learning-visuals/api.svg",
    alt: "API 요청과 응답 창구 인포그래픽",
    caption: "API는 정해진 형식으로 요청하고 결과를 받는 창구입니다.",
  },
  skill: {
    src: "/assets/learning-visuals/skill.svg",
    alt: "Skill 작업 매뉴얼 인포그래픽",
    caption: "Skill은 Codex가 특정 업무를 반복해서 잘하도록 돕는 작업 매뉴얼입니다.",
  },
  "prompt-harness": {
    src: "/assets/learning-visuals/prompt-harness.svg",
    alt: "프롬프트를 하네스로 바꾸는 흐름 인포그래픽",
    caption: "짧은 요청을 역할, 범위, 제약, 테스트, 보안 기준이 있는 지시서로 바꿉니다.",
  },
  "harness-core": {
    src: "/assets/learning-visuals/harness-core.svg",
    alt: "SPEC 기준점 인포그래픽",
    caption: "SPEC.md가 기준점이면 코드가 바뀌어도 검토 기준이 흔들리지 않습니다.",
  },
  "plugin-arsenal": {
    src: "/assets/learning-visuals/plugin-arsenal.svg",
    alt: "Codex 플러그인 도구상자 인포그래픽",
    caption: "플러그인은 Codex에게 업무 방식과 외부 도구 연결 능력을 붙이는 확장 장치입니다.",
  },
  github: {
    src: "/assets/learning-visuals/github.svg",
    alt: "GitHub 협업 흐름 인포그래픽",
    caption: "Branch, Commit, PR, Merge를 결재 흐름처럼 이해할 수 있습니다.",
  },
  vercel: {
    src: "/assets/learning-visuals/vercel.svg",
    alt: "Vercel 배포 흐름 인포그래픽",
    caption: "내 컴퓨터의 결과물이 GitHub와 Vercel을 지나 공개 URL이 됩니다.",
  },
  supabase: {
    src: "/assets/learning-visuals/supabase.svg",
    alt: "Supabase 공유 DB 확장 인포그래픽",
    caption: "localStorage 개인 서랍에서 공유 DB, 로그인, 파일함으로 확장되는 그림입니다.",
  },
  "codex-pipeline": {
    src: "/assets/learning-visuals/codex-pipeline.svg",
    alt: "Codex 작업 파이프라인 인포그래픽",
    caption: "아이디어, SPEC, 구현, 검토, 배포, 기록으로 이어지는 작업 흐름입니다.",
  },
  "node-env": {
    src: "/assets/learning-visuals/node-env.svg",
    alt: "Node.js와 Env 설명 인포그래픽",
    caption: "Node.js는 실행 엔진, Env는 공개하면 안 되는 설정을 담는 비밀 설정함입니다.",
  },
  "question-board": {
    src: "/assets/learning-visuals/question-board.svg",
    alt: "질문 투표 보드 실습 인포그래픽",
    caption: "질문, 투표, 답글, 첨부, CSV를 작은 업무도구 흐름으로 보여줍니다.",
  },
  "school-tools": {
    src: "/assets/learning-visuals/school-tools.svg",
    alt: "학교 업무도구 예시 인포그래픽",
    caption: "작은 반복 업무 네 가지를 웹도구 아이디어로 바꾸는 예시입니다.",
  },
  subagents: {
    src: "/assets/learning-visuals/subagents.svg",
    alt: "서브에이전트 역할 분담 인포그래픽",
    caption: "PM, UI, Dev, Review, Security가 각자 산출물을 만들고 Main이 통합합니다.",
  },
  security: {
    src: "/assets/learning-visuals/security.svg",
    alt: "보안 점검 인포그래픽",
    caption: "개인정보, API Key, 더미 데이터, 사람 검토를 먼저 확인합니다.",
  },
  "home-setup": {
    src: "/assets/learning-visuals/home-setup.svg",
    alt: "집에서 따라 하는 준비물 인포그래픽",
    caption: "Codex, GitHub, Node.js, Vercel 같은 준비물을 한눈에 정리합니다.",
  },
  closing: {
    src: "/assets/learning-visuals/closing.svg",
    alt: "Tech Lead 모드 마무리 인포그래픽",
    caption: "AI를 통제하고 검토하는 사람이 결과물을 만든다는 마지막 메시지입니다.",
  },
};

export const homeVisual = {
  src: "/assets/learning-visuals/lecture-overview.svg",
  alt: "Codex 바이브 코딩 강의 웹앱 전체 구성 인포그래픽",
  caption: "발표, 학습, 용어, 실습을 하나의 강의 웹앱 안에서 연결합니다.",
};
