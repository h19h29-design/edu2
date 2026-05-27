export type GlossaryCategory = "GitHub 용어" | "프로그램/사이트" | "AI 협업 용어" | "기술/설정";

export type GlossaryItem = {
  term: string;
  easy: string;
  analogy: string;
  description: string;
  beginner: string;
  example: string;
  caution: string;
  category: GlossaryCategory;
};

export const glossaryCategoryOrder: GlossaryCategory[] = ["GitHub 용어", "프로그램/사이트", "AI 협업 용어", "기술/설정"];

export const glossaryCategoryStyles: Record<
  GlossaryCategory,
  {
    short: string;
    description: string;
    shell: string;
    badge: string;
    chip: string;
    dot: string;
  }
> = {
  "GitHub 용어": {
    short: "변경 이력과 협업",
    description: "문서고, 작업본, 검토 요청처럼 변경 과정을 남기는 말입니다.",
    shell: "border-slate-200 bg-slate-50/82",
    badge: "bg-slate-900 text-white",
    chip: "bg-slate-100 text-slate-700",
    dot: "bg-slate-700",
  },
  "프로그램/사이트": {
    short: "실제로 쓰는 서비스",
    description: "Codex, Vercel, Supabase처럼 접속하거나 연결하는 도구입니다.",
    shell: "border-blue-200 bg-blue-50/82",
    badge: "bg-blue-600 text-white",
    chip: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  "AI 협업 용어": {
    short: "AI에게 일을 맡기는 말",
    description: "프롬프트, MCP, Skill처럼 Codex와 협업할 때 필요한 언어입니다.",
    shell: "border-violet-200 bg-violet-50/82",
    badge: "bg-violet-600 text-white",
    chip: "bg-violet-100 text-violet-700",
    dot: "bg-violet-500",
  },
  "기술/설정": {
    short: "데이터와 보안 설정",
    description: "API, DB, Env, API Key처럼 실제 구현과 보안에 닿는 말입니다.",
    shell: "border-emerald-200 bg-emerald-50/82",
    badge: "bg-emerald-600 text-white",
    chip: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
};

export const glossary: GlossaryItem[] = [
  {
    term: "GitHub",
    easy: "소스코드 문서고",
    analogy: "버전이 남는 공용 문서함",
    description: "코드와 변경 이력을 저장하고 협업하는 공간입니다.",
    beginner: "GitHub는 코드를 저장하는 온라인 문서고입니다. 누가 언제 무엇을 바꿨는지 기록이 남기 때문에, 실수해도 이전 상태를 찾아볼 수 있습니다.",
    example: "연수 질문 보드를 수정할 때 원본은 보존하고, 변경한 화면과 기능을 기록으로 남깁니다.",
    caution: "공개 저장소에 개인정보, API Key, 비밀번호를 올리면 안 됩니다.",
    category: "GitHub 용어",
  },
  {
    term: "Commit",
    easy: "중간 결재 기록",
    analogy: "수정본을 남기는 결재 도장",
    description: "특정 시점의 변경 내용을 메시지와 함께 저장하는 단위입니다.",
    beginner: "Commit은 작업 중간 저장 지점입니다. 파일을 조금 고친 뒤 '여기까지는 이런 수정이었다'라고 이름표를 붙여 저장합니다.",
    example: "`질문 등록 기능 추가`처럼 어떤 변경인지 알 수 있는 메시지를 남깁니다.",
    caution: "너무 큰 변경을 한 번에 커밋하면 나중에 무엇이 문제였는지 찾기 어렵습니다.",
    category: "GitHub 용어",
  },
  {
    term: "Push",
    easy: "문서고에 올리기",
    analogy: "내 작업본을 공용 문서함에 제출",
    description: "내 컴퓨터의 변경 사항을 GitHub 같은 원격 저장소에 올리는 작업입니다.",
    beginner: "Push는 내 컴퓨터에만 있던 작업 기록을 GitHub 문서고로 올리는 일입니다. 다른 사람이나 배포 서비스가 내 변경을 볼 수 있게 됩니다.",
    example: "내 PC에서 만든 강의 웹앱 수정을 GitHub 저장소에 올립니다.",
    caution: "Push 전에는 공개되면 안 되는 파일이 포함됐는지 확인해야 합니다.",
    category: "GitHub 용어",
  },
  {
    term: "Branch",
    easy: "수정 작업본",
    analogy: "원본문서와 분리된 검토용 사본",
    description: "본 작업에 영향을 주지 않고 새로운 기능이나 수정을 실험하는 작업 줄기입니다.",
    beginner: "Branch는 원본을 바로 고치지 않고 별도 작업본을 만드는 방법입니다. 새 기능을 실험하다가 문제가 생겨도 원본 흐름은 지킬 수 있습니다.",
    example: "`feature/file-upload` 브랜치에서 파일첨부 기능만 따로 작업합니다.",
    caution: "여러 브랜치가 같은 파일을 크게 고치면 나중에 합칠 때 충돌이 날 수 있습니다.",
    category: "GitHub 용어",
  },
  {
    term: "Pull Request",
    easy: "검토 요청",
    analogy: "수정본을 최종 문서에 반영해 달라는 요청",
    description: "변경 내용을 리뷰하고 병합하기 위해 여는 요청입니다.",
    beginner: "Pull Request는 '제가 이렇게 고쳤는데 본문에 반영해도 될까요?'라고 검토를 요청하는 절차입니다.",
    example: "파일첨부 기능을 만든 뒤 리뷰어에게 화면, 보안, 빌드 결과 확인을 요청합니다.",
    caution: "검토 없이 바로 합치면 오류나 보안 문제가 들어갈 수 있습니다.",
    category: "GitHub 용어",
  },
  {
    term: "Codex",
    easy: "AI 개발팀원",
    analogy: "업무 지시를 받아 문서와 코드를 만드는 협업자",
    description: "프로젝트를 분석하고 파일을 만들고 테스트까지 도와주는 AI 개발 파트너입니다.",
    beginner: "Codex는 대답만 하는 채팅창이 아니라 프로젝트 파일을 보고 수정하는 AI 개발 파트너입니다. 요구사항을 주면 코드, 문서, 테스트 흐름을 함께 다룹니다.",
    example: "`연수 질문 보드에 CSV 다운로드와 파일첨부를 추가해줘`처럼 업무 목표를 맡길 수 있습니다.",
    caution: "Codex 결과도 사람이 읽고 검토해야 합니다. 공공 업무에서는 최종 책임이 사람에게 있습니다.",
    category: "프로그램/사이트",
  },
  {
    term: "Vercel",
    easy: "웹 공개 게시대",
    analogy: "완성된 웹도구를 접속 가능한 주소로 게시",
    description: "정적/프론트엔드 웹앱을 쉽게 배포하는 서비스입니다.",
    beginner: "Vercel은 내 컴퓨터에서만 보이던 웹앱을 다른 사람이 접속할 수 있는 주소로 공개해 주는 배포 서비스입니다.",
    example: "GitHub에 올린 React 웹앱을 `https://...vercel.app` 주소로 보여줍니다.",
    caution: "외부 공개 전 개인정보, 기관 규정, 계정 소유권, 요금 정책을 확인해야 합니다.",
    category: "프로그램/사이트",
  },
  {
    term: "Supabase",
    easy: "공유 DB/로그인/파일함",
    analogy: "공유 전산 관리대장과 인증 창구",
    description: "데이터베이스, 로그인, 파일 저장 기능을 제공하는 백엔드 서비스입니다.",
    beginner: "Supabase는 여러 사용자가 함께 보는 데이터 저장소, 로그인, 파일 저장 기능을 제공하는 서비스입니다. localStorage보다 실제 서비스에 가깝습니다.",
    example: "여러 교사가 같은 질문 보드에 접속해 질문과 투표를 공유하게 만들 수 있습니다.",
    caution: "학생, 학부모, 교직원 개인정보를 저장하려면 기관 보안 기준과 보존기간을 먼저 확인해야 합니다.",
    category: "프로그램/사이트",
  },
  {
    term: "Prompt",
    easy: "업무 지시서",
    analogy: "신규 직원에게 주는 작업 요청서",
    description: "AI에게 원하는 결과, 배경, 제약, 기준을 알려주는 지시문입니다.",
    beginner: "Prompt는 AI에게 주는 업무 지시서입니다. 짧게 '만들어줘'라고만 쓰는 것보다 배경, 기능, 제약, 검토 기준을 함께 쓰면 결과가 좋아집니다.",
    example: "역할, 학교 업무 배경, 필요한 기능, 개인정보 금지, 빌드 확인까지 포함한 요청서를 작성합니다.",
    caution: "개인정보나 비밀키를 프롬프트에 그대로 넣지 않습니다.",
    category: "AI 협업 용어",
  },
  {
    term: "MCP",
    easy: "AI용 멀티탭",
    analogy: "AI가 여러 업무도구를 꽂아 쓰는 허브",
    description: "AI가 외부 도구와 안전하게 연결되도록 돕는 규약입니다.",
    beginner: "MCP는 AI가 파일, 브라우저, GitHub, 문서 도구 같은 외부 도구를 정해진 방식으로 연결해 쓰게 해주는 규칙입니다.",
    example: "Codex가 브라우저 화면을 확인하거나 GitHub 이슈를 읽는 흐름을 연결할 수 있습니다.",
    caution: "도구 연결에는 권한이 따르므로 무엇을 읽고 쓸 수 있는지 확인해야 합니다.",
    category: "AI 협업 용어",
  },
  {
    term: "Skill",
    easy: "작업 매뉴얼",
    analogy: "신규 직원에게 주는 업무 처리 절차서",
    description: "특정 작업을 할 때 AI가 따라야 할 지침과 절차입니다.",
    beginner: "Skill은 Codex에게 특정 업무를 더 잘하게 하는 매뉴얼입니다. PPT 작성, 문서 검토, 웹앱 테스트처럼 반복되는 절차를 알려줍니다.",
    example: "발표자료를 만들 때는 발표용 문서 작성 Skill, 브라우저 검수에는 Browser Skill을 사용합니다.",
    caution: "Skill이 있어도 결과를 그대로 믿지 말고 요구사항과 보안 기준을 확인해야 합니다.",
    category: "AI 협업 용어",
  },
  {
    term: "API",
    easy: "정해진 요청 창구",
    analogy: "민원서식처럼 정해진 양식으로 요청",
    description: "프로그램끼리 정해진 형식으로 요청하고 응답받는 방법입니다.",
    beginner: "API는 프로그램끼리 대화하는 정해진 창구입니다. 사람이 민원서식을 맞춰 내듯 프로그램도 정해진 주소와 형식으로 요청해야 합니다.",
    example: "날씨 API에 지역을 보내고, 온도와 예보를 응답으로 받습니다.",
    caution: "API Key가 필요한 경우 공개 저장소나 화면에 노출하면 안 됩니다.",
    category: "기술/설정",
  },
  {
    term: "Database",
    easy: "전산 관리대장",
    analogy: "여러 사람이 함께 보는 업무대장",
    description: "데이터를 구조적으로 저장하고 조회하는 시스템입니다.",
    beginner: "Database는 데이터를 표나 장부처럼 정리해 저장하는 곳입니다. 질문, 투표수, 작성일처럼 나중에 다시 찾아야 하는 정보를 보관합니다.",
    example: "연수 질문 보드의 질문 목록과 답변 완료 상태를 DB에 저장할 수 있습니다.",
    caution: "개인정보가 들어가는 DB는 접근 권한, 보존기간, 삭제 기준이 필요합니다.",
    category: "기술/설정",
  },
  {
    term: "Env Variable",
    easy: "비밀 설정함",
    analogy: "공개 문서에는 쓰지 않는 내부 설정",
    description: "API Key나 환경별 설정을 코드 밖에 보관하는 방식입니다.",
    beginner: "Env Variable은 비밀 설정함입니다. 코드 안에 직접 쓰면 공개될 수 있는 값을 별도 파일이나 배포 설정에 보관합니다.",
    example: "`VITE_SUPABASE_URL`처럼 환경별 주소나 키 이름을 관리합니다.",
    caution: "실제 값이 들어간 `.env` 파일은 GitHub에 올리지 않고, `.env.example`에는 이름만 적습니다.",
    category: "기술/설정",
  },
  {
    term: "API Key",
    easy: "출입증",
    analogy: "특정 창구를 이용할 수 있는 비밀 출입증",
    description: "외부 서비스 사용 권한을 증명하는 값이므로 공개하면 안 됩니다.",
    beginner: "API Key는 외부 서비스를 사용할 수 있음을 증명하는 비밀 출입증입니다. 이 값이 공개되면 다른 사람이 내 계정으로 서비스를 사용할 수 있습니다.",
    example: "지도, 문자 발송, AI 모델 API를 호출할 때 키가 필요할 수 있습니다.",
    caution: "강의 자료, GitHub, 화면 캡처, 프롬프트에 실제 API Key를 넣지 않습니다.",
    category: "기술/설정",
  },
];
