export type AnimationType =
  | "opening"
  | "research"
  | "domain"
  | "codex-coding"
  | "glossary"
  | "node-env"
  | "mcp"
  | "api"
  | "skill"
  | "prompt-harness"
  | "harness-core"
  | "plugin-arsenal"
  | "github"
  | "vercel"
  | "supabase"
  | "pipeline"
  | "question-board"
  | "school-tools"
  | "worktree"
  | "security"
  | "setup"
  | "closing";

export type Slide = {
  id: string;
  number: string;
  sourceNumber?: number;
  title: string;
  subtitle?: string;
  coreMessage: string;
  chapter: string;
  bullets?: string[];
  speakerNotes: string;
  animationType: AnimationType;
  agents: string[];
  demoRoute?: string;
};

export const slides: Slide[] = [
  {
    id: "opening",
    number: "01",
    sourceNumber: 1,
    title: "비개발자를 위한 Codex 바이브 코딩",
    subtitle: "AI에게 하네스를 씌우면 안전하게 제어되는 업무도구가 됩니다",
    coreMessage: "코딩 문법보다 중요한 것은 문제를 설명하고 AI 개발팀을 지휘하는 능력입니다.",
    chapter: "Intro",
    bullets: ["학교 업무를 아는 사람이 문제를 가장 정확히 정의합니다.", "Codex는 아이디어를 코드와 데모로 바꾸는 실행 파트너입니다.", "하네스는 AI를 안전하게 일하게 만드는 통제 구조입니다."],
    speakerNotes:
      "오늘 수업은 코딩 문법을 암기하는 시간이 아닙니다. 학교 업무를 아는 사람이 Codex에게 일을 맡기고, 결과를 검토하고, 안전하게 공개하는 흐름을 익히는 시간입니다.",
    animationType: "opening",
    agents: ["Main Agent"],
  },
  {
    id: "hackathon-case",
    number: "02",
    sourceNumber: 2,
    title: "Claude 해커톤에서 비개발자가\n우승한 사례",
    subtitle: "문제를 잘 아는 사람이 AI와 함께 구현까지 밀어붙인 순간",
    coreMessage: "AI 도구는 개발자만의 전유물이 아니라 현장 전문가의 실행력을 키우는 도구입니다.",
    chapter: "Why",
    bullets: ["캘리포니아 변호사는 건축 허가 반려 문제를 자동 분석 도구로 풀었습니다.", "벨기에 심장내과 과장은 진료 기록을 환자 맞춤 건강 안내로 변환했습니다.", "우간다 도로 엔지니어는 블랙박스 영상을 투자 추천 보고서로 바꿨습니다."],
    speakerNotes:
      "비개발자 우승 사례는 중요한 메시지를 줍니다. 앞으로는 문제를 가장 잘 아는 사람이 AI에게 실행을 맡기는 방식으로 업무도구를 만들 수 있습니다.",
    animationType: "research",
    agents: ["Research Agent", "Main Agent"],
  },
  {
    id: "domain-expert",
    number: "03",
    sourceNumber: 3,
    title: "왜 비개발자 우승이 중요한가",
    subtitle: "도메인 전문가는 문제를 가장 가까이에서 봅니다",
    coreMessage: "학교 행정의 세부 맥락을 아는 사람은 외부 개발자보다 더 좋은 요구사항을 쓸 수 있습니다.",
    chapter: "Why",
    bullets: ["어떤 양식이 불편한지 알고 있습니다.", "누가 언제 무엇을 확인해야 하는지 압니다.", "실제 현장의 예외상황을 먼저 떠올립니다."],
    speakerNotes:
      "현장 전문가는 사용자의 언어, 반복되는 불편, 예외상황을 알고 있습니다. Codex는 그 문제정의를 실행 가능한 구조로 바꾸는 파트너입니다.",
    animationType: "domain",
    agents: ["PM Agent", "Research Agent"],
  },
  {
    id: "codex-why",
    number: "03.5",
    title: "왜 Codex를 써야 하는가?",
    subtitle: "문제를 아는 사람은 당신, 구현을 돕는 파트너는 Codex",
    coreMessage: "비개발자에게 필요한 것은 문법 암기가 아니라 Codex에게 일을 맡기고 검토하는 능력입니다.",
    chapter: "Why",
    bullets: ["요구사항을 구조화해 줍니다.", "실제 파일을 만들고 코드를 수정합니다.", "테스트와 검토까지 작업 흐름으로 연결합니다."],
    speakerNotes:
      "앞에서 본 것처럼 학교 업무를 가장 잘 아는 사람은 현장에 있는 여러분입니다. 하지만 아이디어만으로는 웹도구가 만들어지지 않습니다. 이때 필요한 실행 파트너가 Codex입니다. Codex는 단순히 대답만 하는 채팅창이 아니라, CLI나 작업환경 안에서 실제 프로젝트를 분석하고, 파일을 만들고, 코드를 수정하고, 테스트하고, 결과를 보고하는 AI 개발팀원처럼 동작합니다. 그래서 바이브 코딩 시대의 핵심 능력은 코딩 문법 암기가 아니라, Codex에게 정확히 지시하고 결과를 검토하는 능력입니다.",
    animationType: "codex-coding",
    agents: ["Main Agent", "PM Agent", "UI/UX Agent", "Dev Agent", "Review Agent", "Security Agent"],
  },
  {
    id: "terms-map",
    number: "04",
    sourceNumber: 4,
    title: "바이브 코딩 전 알아야 할 용어들",
    subtitle: "개발 용어를 학교 행정업무 비유로 바꿔 봅니다",
    coreMessage: "용어를 외우는 목적은 개발자가 되기 위해서가 아니라 Codex와 협업하기 위해서입니다.",
    chapter: "Glossary",
    bullets: ["Codex는 AI 개발팀원입니다.", "Prompt는 업무 지시서입니다.", "GitHub, API, MCP, Skill은 협업과 연결의 언어입니다."],
    speakerNotes:
      "이제부터 나오는 용어들은 어렵게 느껴질 수 있지만, 학교 업무 비유로 바꾸면 훨씬 쉽습니다. 용어는 Codex에게 일을 맡기기 위한 공통 언어입니다.",
    animationType: "glossary",
    agents: ["Glossary Agent"],
  },
  {
    id: "mcp",
    number: "05",
    sourceNumber: 5,
    title: "MCP란 무엇인가",
    subtitle: "AI가 여러 도구를 꽂아 쓰는 멀티탭",
    coreMessage: "MCP는 AI가 파일, GitHub, 브라우저, 문서 생성 같은 도구를 안전하게 연결하는 규약입니다.",
    chapter: "Tooling",
    bullets: ["AI가 도구를 직접 사용할 수 있게 합니다.", "각 도구는 정해진 권한과 방식으로 연결됩니다.", "학교 업무에서는 여러 시스템을 묶는 허브처럼 이해할 수 있습니다."],
    speakerNotes:
      "MCP는 AI용 멀티탭이라고 보면 됩니다. AI가 필요한 도구를 연결해서 파일을 읽고, GitHub를 확인하고, 브라우저를 점검하는 식으로 일할 수 있습니다.",
    animationType: "mcp",
    agents: ["Tool Agent"],
  },
  {
    id: "api",
    number: "06",
    sourceNumber: 6,
    title: "API란 무엇인가",
    subtitle: "프로그램끼리 약속된 방식으로 요청하고 응답하는 창구",
    coreMessage: "API는 다른 서비스에 정해진 형식으로 요청서를 보내고 결과를 받는 방법입니다.",
    chapter: "Tooling",
    bullets: ["요청 형식과 응답 형식이 정해져 있습니다.", "API Key는 출입증처럼 관리해야 합니다.", "GitHub에 공개하면 안 되는 비밀 정보입니다."],
    speakerNotes:
      "API는 창구입니다. 아무 말이나 하는 것이 아니라 정해진 서식으로 요청해야 하고, API Key는 출입증처럼 안전하게 관리해야 합니다.",
    animationType: "api",
    agents: ["Tool Agent", "Security Agent"],
  },
  {
    id: "skill",
    number: "07",
    sourceNumber: 7,
    title: "Skill은 무엇인가",
    subtitle: "Codex에게 반복 업무를 잘하게 만드는 작업 매뉴얼",
    coreMessage: "Skill은 특정 업무를 수행할 때 Codex가 따라야 할 절차와 기준입니다.",
    chapter: "Tooling",
    bullets: ["신규 직원에게 업무 매뉴얼을 주는 것과 비슷합니다.", "PPT, 문서, 코드리뷰, 테스트 작성 등에 특화될 수 있습니다.", "API/MCP가 연결이라면 Skill은 일하는 방식입니다."],
    speakerNotes:
      "Skill은 매뉴얼입니다. 도구를 연결하는 것만으로는 부족하고, 그 도구를 어떤 순서와 기준으로 쓸지 알려주는 절차가 필요합니다.",
    animationType: "skill",
    agents: ["Tool Agent", "Glossary Agent"],
  },
  {
    id: "prompt-harness",
    number: "08",
    sourceNumber: 8,
    title: "프롬프트와 하네스 엔지니어링",
    subtitle: "나쁜 프롬프트를 통제 가능한 업무 지시서로 바꾸기",
    coreMessage: "하네스 프롬프트는 역할, 배경, 범위, 제약, 테스트, 보안을 포함합니다.",
    chapter: "Harness",
    bullets: ["나쁜 프롬프트: 시간 관리 앱 만들어줘.", "좋은 하네스: 역할, 데이터, 기능, 보안, 테스트 기준을 함께 제시합니다.", "Codex는 이 구조를 바탕으로 파일과 코드를 만듭니다."],
    speakerNotes:
      "프롬프트는 짧을수록 좋은 것이 아니라, Codex가 안전하게 일할 수 있을 만큼 구조화되어야 합니다.",
    animationType: "prompt-harness",
    agents: ["PM Agent", "UI/UX Agent", "Dev Agent", "Review Agent", "Security Agent"],
    demoRoute: "/prompt",
  },
  {
    id: "harness-core",
    number: "09",
    sourceNumber: 9,
    title: "하네스 엔지니어링 핵심 개념",
    subtitle: "Spec은 코드보다 먼저 고정되는 진실의 원장입니다",
    coreMessage: "AI 결과가 흔들려도 Spec, 테스트, 보안 기준이 중심을 잡아야 합니다.",
    chapter: "Harness",
    bullets: ["요구사항 문서가 단일 기준이 됩니다.", "코드는 바뀔 수 있지만 기준은 추적되어야 합니다.", "검토와 반려 기준이 있어야 반복 개선이 가능합니다."],
    speakerNotes:
      "하네스 엔지니어링은 AI를 못 믿는다는 뜻이 아니라, 공공업무가 요구하는 기준을 먼저 세우고 그 안에서 AI를 활용한다는 뜻입니다.",
    animationType: "harness-core",
    agents: ["PM Agent", "Review Agent"],
  },
  {
    id: "plugin-arsenal",
    number: "10",
    sourceNumber: 10,
    title: "Superpowers와 GitHub Plugin",
    subtitle: "플러그인은 Codex에게 특정 능력을 붙여주는 확장 도구입니다",
    coreMessage: "플러그인은 Codex가 더 잘 일하도록 업무 방식, 외부 도구, 협업 흐름을 연결해 주는 확장 기능입니다.",
    chapter: "Harness",
    bullets: ["Plugin: Codex에게 추가 능력을 붙이는 확장 장치", "Superpowers: 요구사항 정리와 하네스 작업 흐름을 돕는 도구", "GitHub Plugin: 저장소, 이슈, PR, 코드 변경 흐름을 연결하는 도구"],
    speakerNotes:
      "플러그인은 Codex가 더 많은 일을 할 수 있게 해주는 확장 장치입니다. Superpowers는 요구사항 정리와 작업 흐름을 강화하는 느낌으로 이해하면 되고, GitHub Plugin은 코드 저장소와 이슈, PR, 변경 이력을 Codex가 더 잘 다루게 해주는 연결 장치로 이해하면 됩니다. 중요한 것은 플러그인 이름을 외우는 것이 아니라 어떤 작업을 어떤 도구에 맡길지 판단하는 능력입니다.",
    animationType: "plugin-arsenal",
    agents: ["Tool Agent", "Security Agent", "Review Agent"],
  },
  {
    id: "github",
    number: "11",
    sourceNumber: 11,
    title: "GitHub 쉽게 이해하기",
    subtitle: "소스코드 문서고와 검토 요청 시스템",
    coreMessage: "GitHub는 작업 이력, 수정본, 검토 요청, 최종 반영을 남기는 협업 문서고입니다.",
    chapter: "Publish",
    bullets: ["Commit은 중간 결재 기록입니다.", "Branch는 수정 작업본입니다.", "Pull Request는 검토 요청입니다.", "Merge는 최종 반영입니다."],
    speakerNotes:
      "GitHub를 개발자만 쓰는 공간으로 보지 말고, 버전이 남는 문서고와 결재선으로 이해하면 쉽습니다.",
    animationType: "github",
    agents: ["Review Agent", "Dev Agent"],
  },
  {
    id: "vercel",
    number: "12",
    sourceNumber: 12,
    title: "Vercel 쉽게 이해하기",
    subtitle: "내 컴퓨터의 웹도구를 다른 사람이 접속 가능한 주소로 공개하기",
    coreMessage: "Vercel은 GitHub에 올라간 웹앱을 공개 URL로 배포하는 게시대입니다.",
    chapter: "Publish",
    bullets: ["로컬 개발 화면과 공개 URL은 다릅니다.", "GitHub와 연결하면 자동 배포가 가능합니다.", "공개 전 개인정보와 권한을 반드시 점검해야 합니다."],
    speakerNotes:
      "Vercel은 배포 게시대입니다. 다만 공개된다는 것은 책임도 함께 생긴다는 뜻이므로 보안 점검이 반드시 필요합니다.",
    animationType: "vercel",
    agents: ["Deploy Agent", "Security Agent"],
  },
  {
    id: "supabase",
    number: "13",
    sourceNumber: 13,
    title: "Supabase 쉽게 이해하기",
    subtitle: "localStorage는 개인 서랍, Supabase는 공유 전산 관리대장",
    coreMessage: "데모는 localStorage로 충분하지만 여러 사람이 함께 쓰려면 공유 DB와 로그인 구조가 필요합니다.",
    chapter: "Publish",
    bullets: ["localStorage는 내 브라우저에만 저장됩니다.", "Supabase는 공유 DB, 로그인, 파일 저장을 제공합니다.", "실제 연결 전 기관 규정과 보안 기준을 확인해야 합니다."],
    speakerNotes:
      "오늘 데모는 외부 연결 없이 localStorage로 작동합니다. 실제 서비스로 확장할 때 Supabase 같은 DB를 검토할 수 있지만, 개인정보와 규정 검토가 먼저입니다.",
    animationType: "supabase",
    agents: ["Database Agent", "Security Agent"],
  },
  {
    id: "codex-pipeline",
    number: "14",
    sourceNumber: 14,
    title: "Codex에게 일을 맡기는 기본 흐름",
    subtitle: "아이디어에서 배포와 기록까지 이어지는 하네스 파이프라인",
    coreMessage: "Codex는 한 번에 마법처럼 완성하는 도구가 아니라 단계별 협업 흐름 안에서 강해집니다.",
    chapter: "Workflow",
    bullets: ["아이디어를 브레인스토밍합니다.", "SPEC과 구현 계획을 먼저 만듭니다.", "실행, 검토, 수정, 배포, 기록을 반복합니다."],
    speakerNotes:
      "Codex에게 일을 맡길 때는 만들기 전에 계획하고, 만든 뒤 검토하고, 실패를 기록하는 흐름을 유지해야 합니다.",
    animationType: "pipeline",
    agents: ["Main Agent", "PM Agent", "Dev Agent", "Review Agent", "Deploy Agent"],
  },
  {
    id: "node-env",
    number: "14.5",
    title: "Node.js와 Env는 무엇인가",
    subtitle: "내 컴퓨터에서 앱을 실행하는 엔진과 비밀 설정함",
    coreMessage: "Node.js는 로컬에서 개발 도구를 돌리는 엔진이고, Env는 공개하면 안 되는 설정을 코드 밖에 두는 방법입니다.",
    chapter: "Workflow",
    bullets: ["Node.js는 React/Vite 같은 개발 도구를 실행합니다.", "npm install은 필요한 부품을 내려받는 과정입니다.", "Env Variable은 API Key 같은 비밀 설정을 코드 밖에 보관하는 방식입니다."],
    speakerNotes:
      "Node.js는 웹앱을 개발할 때 내 컴퓨터에서 필요한 도구를 돌리는 실행 환경입니다. npm install은 프로젝트에 필요한 부품을 설치하는 과정이고, npm run dev와 npm run build는 각각 개발 서버 실행과 배포용 파일 생성을 뜻합니다. Env는 비밀 설정함입니다. 실제 API Key는 코드나 GitHub에 넣지 않고 .env 같은 별도 설정으로 관리해야 합니다. 이 강의 데모는 실제 키를 쓰지 않고 .env.example만 제공합니다.",
    animationType: "node-env",
    agents: ["Tool Agent", "Security Agent"],
  },
  {
    id: "question-board",
    number: "15",
    sourceNumber: 15,
    title: "하네스 방식 실습 예제: 연수 질문·투표 보드",
    subtitle: "질문 등록, 공감 투표, 인기순 정렬, CSV 다운로드를 데모로 만듭니다",
    coreMessage: "작은 업무도구라도 요구사항, 구현, 검토, 보안 기준을 통과해야 합니다.",
    chapter: "Practice",
    bullets: ["PM Agent가 요구사항을 정리합니다.", "UI Agent가 화면을 설계합니다.", "Dev Agent가 기능을 만들고 Review/Security Agent가 점검합니다."],
    speakerNotes:
      "이 실습은 실제 API 없이 로컬 상태와 더미 데이터만으로 동작합니다. 중요한 것은 기능보다 하네스 방식으로 작은 앱을 안전하게 만드는 흐름입니다.",
    animationType: "question-board",
    agents: ["PM Agent", "UI/UX Agent", "Dev Agent", "Review Agent", "Security Agent"],
    demoRoute: "/demo",
  },
  {
    id: "school-tools",
    number: "16",
    sourceNumber: 16,
    title: "학교 업무도구 예시 4가지",
    subtitle: "작게 시작하고, 필요할 때 DB/API/Storage로 확장합니다",
    coreMessage: "좋은 업무도구는 거대한 시스템보다 반복 업무 하나를 정확히 줄이는 데서 시작합니다.",
    chapter: "Practice",
    bullets: ["연수 질문·투표 보드", "시설·물품 요청 접수함", "행사·연수 신청 관리", "안전점검 체크리스트"],
    speakerNotes:
      "처음부터 거대한 시스템을 만들 필요는 없습니다. 자주 반복되는 작고 명확한 업무부터 Codex와 함께 도구로 바꿔봅니다.",
    animationType: "school-tools",
    agents: ["PM Agent", "Database Agent"],
  },
  {
    id: "subagents",
    number: "17",
    sourceNumber: 17,
    title: "서브에이전트와 역할 분담",
    subtitle: "Main Agent가 방향을 잡고, 서브에이전트가 독립 작업을 맡습니다",
    coreMessage: "작업을 나누면 빠르지만, 산출물과 병합 기준이 명확해야 합니다.",
    chapter: "Workflow",
    bullets: ["PM Agent는 SPEC.md를 만듭니다.", "UI Agent는 DESIGN.md를 만듭니다.", "Dev Agent는 React Components를 만듭니다.", "Review/Security Agent는 점검 보고서를 만듭니다."],
    speakerNotes:
      "서브에이전트는 역할을 나눌 때 유용합니다. 다만 같은 파일을 동시에 고치면 충돌이 생기므로 작업 범위와 통합 책임이 중요합니다.",
    animationType: "worktree",
    agents: ["Main Agent", "PM Agent", "UI/UX Agent", "Dev Agent", "Review Agent", "Security Agent"],
  },
  {
    id: "security",
    number: "18",
    sourceNumber: 18,
    title: "CSO 보안 감사",
    subtitle: "실제 개인정보는 넣지 않고, API Key는 절대 공개하지 않습니다",
    coreMessage: "교육용 데모라도 보안 습관은 실제 업무 기준으로 연습해야 합니다.",
    chapter: "Security",
    bullets: ["실제 개인정보 없음", "전화번호/주민번호/건강정보 없음", "API Key 없음", "더미 데이터 사용", "사람이 최종 검토"],
    speakerNotes:
      "학교 업무에는 민감한 정보가 많습니다. 데모에서는 실제 개인정보를 넣지 않고, 외부 연결 전에는 기관 규정과 계정 소유권, 요금, 장애 가능성을 확인해야 합니다.",
    animationType: "security",
    agents: ["Security Agent"],
    demoRoute: "/demo",
  },
  {
    id: "home-setup",
    number: "19",
    sourceNumber: 19,
    title: "집에서 따라 하는 준비물과 순서",
    subtitle: "계정, 도구, Node.js, Codex 환경을 준비하고 작은 앱부터 시작합니다",
    coreMessage: "준비물은 많아 보여도 흐름은 간단합니다. 아이디어, SPEC, 구현, 검토, 배포 순서입니다.",
    chapter: "Next",
    bullets: ["ChatGPT/Codex", "GitHub 계정", "Vercel 계정", "Supabase 계정", "Node.js", "VS Code 또는 Codex 환경"],
    speakerNotes:
      "집에서 다시 해볼 때는 작은 예제부터 시작하세요. 외부 서비스는 실제 연결 전에 반드시 보안과 규정을 확인합니다.",
    animationType: "setup",
    agents: ["Main Agent", "Deploy Agent", "Database Agent"],
  },
  {
    id: "closing",
    number: "20",
    sourceNumber: 20,
    title: "마무리: 당신은 더 이상 코더가 아니라 Tech Lead다",
    subtitle: "AI를 통제하는 사람이 결과물을 만듭니다",
    coreMessage: "바이브 코딩 시대의 핵심 역량은 AI에게 정확히 맡기고, 검토하고, 책임 있게 공개하는 능력입니다.",
    chapter: "Next",
    bullets: ["문제를 정의하십시오.", "Codex에게 구조적으로 맡기십시오.", "사람이 최종 검토하십시오."],
    speakerNotes:
      "오늘의 목표는 여러분이 개발자가 되는 것이 아닙니다. Codex와 함께 학교 업무도구를 만들 수 있는 Tech Lead가 되는 것입니다.",
    animationType: "closing",
    agents: ["Main Agent", "PM Agent", "UI/UX Agent", "Dev Agent", "Review Agent", "Security Agent", "Deploy Agent"],
  },
];

export const chapters = Array.from(new Set(slides.map((slide) => slide.chapter)));

export const slideById = (id: string) => slides.find((slide) => slide.id === id) ?? slides[0];
