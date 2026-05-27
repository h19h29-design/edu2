import { mkdir, writeFile } from "node:fs/promises";

const visuals = [
  ["lecture-overview", "Codex Vibe Coding", "AI 개발팀을 지휘하는 강의 웹앱", ["발표", "학습", "용어", "실습"], "#7c3aed", "#0ea5e9"],
  ["opening", "Harnessed AI", "안전하게 제어되는 업무도구", ["문제정의", "하네스", "검토", "책임"], "#7c3aed", "#06b6d4"],
  ["hackathon-case", "Hackathon Cases", "현장 전문가가 AI로 구현까지 완성", ["금상", "동상", "Keep Thinking", "도메인"], "#f59e0b", "#7c3aed"],
  ["domain-expert", "Domain Expert", "문제를 가장 가까이에서 보는 사람", ["현장 맥락", "예외상황", "검토기준", "사용자 언어"], "#10b981", "#0ea5e9"],
  ["codex-why", "Why Codex", "문제를 아는 사람과 구현 파트너의 협업", ["SPEC", "코드 수정", "빌드", "리뷰"], "#2563eb", "#7c3aed"],
  ["terms-map", "Glossary Map", "개발 용어를 행정업무 비유로 연결", ["GitHub", "API", "MCP", "Env"], "#8b5cf6", "#14b8a6"],
  ["mcp", "MCP Hub", "AI가 여러 도구를 꽂아 쓰는 멀티탭", ["파일", "GitHub", "DB", "브라우저"], "#0ea5e9", "#7c3aed"],
  ["api", "API Window", "정해진 요청 창구와 응답 문서", ["요청", "응답", "Key", "권한"], "#0284c7", "#f59e0b"],
  ["skill", "Skill Manual", "Codex가 반복 업무를 잘하게 하는 매뉴얼", ["절차", "기준", "스킬", "반복"], "#a855f7", "#22c55e"],
  ["prompt-harness", "Prompt to Harness", "짧은 요청을 실행 가능한 지시서로", ["역할", "범위", "제약", "테스트"], "#ec4899", "#7c3aed"],
  ["harness-core", "SPEC Anchor", "AI 결과를 붙잡는 기준점", ["명세", "검수", "보안", "기록"], "#4f46e5", "#10b981"],
  ["plugin-arsenal", "Plugin Toolbox", "Codex에 능력을 붙이는 확장 장치", ["Plugin", "Superpowers", "GitHub", "Workflow"], "#7c3aed", "#0ea5e9"],
  ["github", "GitHub Flow", "버전이 남는 문서고와 검토 요청", ["Branch", "Commit", "PR", "Merge"], "#111827", "#0ea5e9"],
  ["vercel", "Vercel Deploy", "내 컴퓨터에서 공개 URL까지", ["Local", "GitHub", "Vercel", "URL"], "#111827", "#7c3aed"],
  ["supabase", "Shared Database", "개인 서랍에서 공유 전산 관리대장으로", ["DB", "Auth", "Storage", "Realtime"], "#10b981", "#0ea5e9"],
  ["codex-pipeline", "Codex Pipeline", "아이디어에서 배포와 기록까지", ["Idea", "SPEC", "Build", "Deploy"], "#2563eb", "#14b8a6"],
  ["node-env", "Node.js & Env", "실행 엔진과 비밀 설정함", ["npm", "dev", "build", "env"], "#16a34a", "#7c3aed"],
  ["question-board", "Question Board", "질문·투표·답글·첨부 실습", ["질문", "투표", "CSV", "관리자"], "#7c3aed", "#22c55e"],
  ["school-tools", "School Tools", "반복 업무를 작은 웹도구로", ["연수", "시설", "신청", "안전"], "#0ea5e9", "#f59e0b"],
  ["subagents", "Sub Agents", "역할별 작업공간이 병렬로 움직임", ["PM", "UI", "Dev", "Review"], "#8b5cf6", "#0ea5e9"],
  ["security", "Security Sweep", "개인정보와 API Key를 먼저 점검", ["PII 금지", "Key 금지", "더미 데이터", "사람 검토"], "#f97316", "#ef4444"],
  ["home-setup", "Home Setup", "집에서 따라 하는 준비물과 순서", ["Codex", "GitHub", "Node.js", "Vercel"], "#0ea5e9", "#22c55e"],
  ["closing", "Tech Lead Mode", "AI를 통제하는 사람이 결과물을 만든다", ["지시", "검토", "배포", "기록"], "#7c3aed", "#f59e0b"],
];

const outDir = new URL("../public/assets/learning-visuals/", import.meta.url);

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function chip(text, x, y, fill) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="190" height="54" rx="22" fill="white" fill-opacity="0.86" stroke="${fill}" stroke-opacity="0.22"/>
      <circle cx="${x + 28}" cy="${y + 27}" r="10" fill="${fill}" fill-opacity="0.9"/>
      <text x="${x + 48}" y="${y + 34}" font-size="20" font-weight="800" fill="#0f172a">${esc(text)}</text>
    </g>`;
}

function makeSvg([id, title, subtitle, chips, accent, accent2]) {
  const chipSvg = chips.map((item, index) => chip(item, 682 + (index % 2) * 220, 278 + Math.floor(index / 2) * 78, index % 2 ? accent2 : accent)).join("");
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(subtitle)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
      <stop stop-color="#eef6ff"/>
      <stop offset="0.52" stop-color="#f6f3ff"/>
      <stop offset="1" stop-color="#ecfeff"/>
    </linearGradient>
    <linearGradient id="accent" x1="210" y1="120" x2="990" y2="620" gradientUnits="userSpaceOnUse">
      <stop stop-color="${accent}"/>
      <stop offset="1" stop-color="${accent2}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="32" flood-color="#334155" flood-opacity="0.18"/>
    </filter>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#94a3b8" stroke-opacity="0.18" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1280" height="720" rx="48" fill="url(#bg)"/>
  <rect x="36" y="36" width="1208" height="648" rx="42" fill="url(#grid)" opacity="0.55"/>
  <circle cx="162" cy="128" r="104" fill="${accent}" fill-opacity="0.13"/>
  <circle cx="1114" cy="604" r="132" fill="${accent2}" fill-opacity="0.14"/>
  <path d="M252 392 C408 224 574 550 730 356 C860 196 984 218 1084 146" stroke="url(#accent)" stroke-width="12" stroke-linecap="round" opacity="0.28"/>
  <g filter="url(#shadow)">
    <rect x="82" y="92" width="488" height="536" rx="38" fill="white" fill-opacity="0.9" stroke="#ffffff"/>
    <rect x="122" y="136" width="144" height="144" rx="36" fill="url(#accent)"/>
    <text x="194" y="223" text-anchor="middle" font-size="56" font-weight="900" fill="white">AI</text>
    <text x="122" y="354" font-size="54" font-weight="900" fill="#020617">${esc(title)}</text>
    <text x="122" y="408" font-size="26" font-weight="800" fill="#475569">${esc(subtitle)}</text>
    <rect x="122" y="462" width="368" height="24" rx="12" fill="${accent}" fill-opacity="0.18"/>
    <rect x="122" y="462" width="250" height="24" rx="12" fill="url(#accent)"/>
    <text x="122" y="538" font-size="22" font-weight="800" fill="#334155">강의 흐름을 한눈에 보는 시각 자료</text>
  </g>
  <g filter="url(#shadow)">
    <rect x="632" y="118" width="550" height="484" rx="38" fill="white" fill-opacity="0.82" stroke="#ffffff"/>
    <text x="682" y="190" font-size="34" font-weight="900" fill="#0f172a">핵심 장면</text>
    <text x="682" y="230" font-size="22" font-weight="800" fill="#64748b">용어, 흐름, 역할을 그림으로 먼저 이해합니다.</text>
    ${chipSvg}
    <g transform="translate(710 472)">
      <rect x="0" y="0" width="382" height="78" rx="26" fill="#0f172a"/>
      <circle cx="46" cy="39" r="18" fill="${accent2}"/>
      <rect x="82" y="24" width="236" height="12" rx="6" fill="white" fill-opacity="0.78"/>
      <rect x="82" y="46" width="160" height="10" rx="5" fill="white" fill-opacity="0.34"/>
      <path d="M332 26 L352 39 L332 52" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
</svg>`;
}

await mkdir(outDir, { recursive: true });
await Promise.all(
  visuals.map(async (item) => {
    await writeFile(new URL(`${item[0]}.svg`, outDir), makeSvg(item), "utf8");
  }),
);

console.log(`Generated ${visuals.length} learning visuals in ${outDir.pathname}`);
