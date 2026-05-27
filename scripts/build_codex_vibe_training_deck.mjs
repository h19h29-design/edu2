import fs from "node:fs";
import path from "node:path";
import { Canvas, loadImage } from "file:///C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/node_modules/skia-canvas/lib/index.mjs";

const artifact = await import(
  "file:///C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs"
);
const jsx = await import(
  "file:///C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/presentation-jsx/index.mjs"
);

const { slides } = await import("../src/data/slides.ts");
const { glossary, glossaryCategoryOrder, glossaryCategoryStyles } = await import("../src/data/glossary.ts");
const { schoolTools } = await import("../src/data/schoolTools.ts");

const {
  Presentation,
  PresentationFile,
  row,
  column,
  grid,
  layers,
  panel,
  text,
  shape,
  rule,
  fill: fillSize,
  hug,
  fixed,
  grow,
  fr,
  auto,
  drawSlideToCtx,
} = artifact;
const { stroke } = jsx;

const OUT_DIR = "D:/gpt/edu/output/pptx";
const PREVIEW_DIR = "D:/gpt/edu/output/previews/codex_vibe_training_deck";
const REPORT_DIR = "D:/gpt/edu/output/reports";
const DOWNLOADS_DIR = "C:/Users/user/Downloads";
const deckName = "codex_vibe_coding_training_deck";
const outPptx = path.join(OUT_DIR, `${deckName}.pptx`);
const downloadsPptx = path.join(DOWNLOADS_DIR, `${deckName}.pptx`);
const inspectPath = path.join(REPORT_DIR, `${deckName}_inspect.ndjson`);
const qaPath = path.join(REPORT_DIR, `${deckName}_qa.json`);
const montagePath = path.join(PREVIEW_DIR, `${deckName}_montage.png`);

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(PREVIEW_DIR, { recursive: true });
fs.mkdirSync(REPORT_DIR, { recursive: true });

const W = 1920;
const H = 1080;
const TOTAL = slides.length;
const font = "Malgun Gothic";

const C = {
  paper: "#F7FBFF",
  paper2: "#EEF7FF",
  ink: "#081026",
  slate: "#39475D",
  muted: "#64748B",
  line: "#C9D9F3",
  white: "#FFFFFF",
  violet: "#7C3AED",
  violet2: "#EFE7FF",
  blue: "#2563EB",
  blue2: "#DBEAFE",
  cyan: "#0EA5E9",
  cyan2: "#E0F2FE",
  emerald: "#10B981",
  emerald2: "#D1FAE5",
  amber: "#F59E0B",
  amber2: "#FEF3C7",
  rose: "#F43F5E",
  rose2: "#FFE4E6",
  dark: "#07111F",
  dark2: "#111827",
};

function st(base = {}) {
  return { typeface: font, color: C.ink, ...base };
}

const T = {
  eyebrow: st({ fontSize: 22, bold: true, color: C.violet }),
  title: st({ fontSize: 52, bold: true, lineSpacing: 1.04 }),
  subtitle: st({ fontSize: 24, color: C.slate, lineSpacing: 1.16 }),
  body: st({ fontSize: 23, color: C.ink, lineSpacing: 1.17 }),
  small: st({ fontSize: 16, color: C.muted, lineSpacing: 1.15 }),
  label: st({ fontSize: 17, bold: true, color: C.violet }),
  whiteTitle: st({ fontSize: 52, bold: true, color: C.white, lineSpacing: 1.05 }),
  whiteBody: st({ fontSize: 22, color: "#DDEBFF", lineSpacing: 1.18 }),
};

function tx(value, style = T.body, opts = {}) {
  return text(String(value), {
    name: opts.name,
    width: opts.width ?? fillSize,
    height: opts.height ?? hug,
    columnSpan: opts.columnSpan,
    rowSpan: opts.rowSpan,
    style: { ...style, ...(opts.style ?? {}) },
  });
}

function chip(label, color = C.violet, fill = C.violet2) {
  const labelText = String(label);
  const minWidth = /^[0-9.]+$/.test(labelText) ? 82 : 126;
  const width = Math.max(
    minWidth,
    Math.min(
      310,
      38 +
        Array.from(labelText).reduce((sum, char) => {
          return sum + (/^[\x00-\x7F]$/.test(char) ? 9 : 18);
        }, 0),
    ),
  );
  return panel(
    {
      width: fixed(width),
      height: hug,
      padding: { x: 18, y: 8 },
      fill,
      line: stroke(`1px ${fill}`),
      borderRadius: 18,
    },
    tx(labelText, st({ fontSize: 17, bold: true, color, alignment: "center" }), { width: fillSize }),
  );
}

function card(title, body, opts = {}) {
  const color = opts.color ?? C.violet;
  const fill = opts.fill ?? C.white;
  return panel(
    {
      width: fillSize,
      height: opts.height ?? fillSize,
      padding: opts.padding ?? { x: 24, y: 20 },
      fill,
      line: stroke(`1.1px ${opts.line ?? C.line}`),
      borderRadius: 18,
    },
    column({ width: fillSize, height: hug, gap: 10 }, [
      opts.badge ? chip(opts.badge, color, opts.badgeFill ?? C.violet2) : tx(" ", T.small, { style: { fontSize: 2 } }),
      tx(title, st({ fontSize: opts.titleSize ?? 24, bold: true, color: opts.titleColor ?? C.ink, lineSpacing: 1.08 })),
      tx(body, st({ fontSize: opts.bodySize ?? 18, color: opts.bodyColor ?? C.slate, lineSpacing: 1.22 })),
    ]),
  );
}

function bulletList(items, opts = {}) {
  return column(
    { width: fillSize, height: hug, gap: opts.gap ?? 10 },
    items.map((item) =>
      row({ width: fillSize, height: hug, gap: 12, align: "start" }, [
        shape({ geometry: "ellipse", width: fixed(10), height: fixed(10), fill: opts.color ?? C.violet, line: stroke(`1px ${opts.color ?? C.violet}`) }),
        tx(item, st({ fontSize: opts.fontSize ?? 21, color: opts.textColor ?? C.ink, lineSpacing: 1.16 }), { width: fillSize }),
      ]),
    ),
  );
}

function footer(slideNo) {
  return row({ width: fillSize, height: hug, align: "center", justify: "between" }, [
    tx("비개발자를 위한 Codex 바이브 코딩 | 인터랙티브 HTML 강의 웹앱 기반 PPT", T.small, { width: fixed(900), style: { fontSize: 14 } }),
    tx(`${String(slideNo).padStart(2, "0")} / ${TOTAL}`, T.small, { width: fixed(90), style: { fontSize: 14, alignment: "right" } }),
  ]);
}

function baseContent(slide, slideNo, content, opts = {}) {
  const page = opts.page ?? shape({ width: fillSize, height: fillSize, fill: C.paper, line: stroke("0px #FFFFFF") });
  const deckSlide = opts.pres.slides.add();
  deckSlide.compose(
    layers({ width: fillSize, height: fillSize }, [
      page,
      column(
        {
          width: fillSize,
          height: fillSize,
          padding: { x: 78, y: 46 },
          gap: 14,
        },
        [
          column({ width: fillSize, height: hug, gap: 8 }, [
            row({ width: fillSize, height: hug, justify: "between", align: "center" }, [
              row({ width: hug, height: hug, gap: 10, align: "center" }, [chip(slide.number, C.violet, C.violet2), chip(slide.chapter, C.blue, C.blue2)]),
              chip("Codex 교육자료", C.emerald, C.emerald2),
            ]),
            tx(slide.title, T.title, { name: `slide-${slideNo}-title`, style: opts.titleStyle ?? {} }),
            slide.subtitle ? tx(slide.subtitle, T.subtitle, { name: `slide-${slideNo}-subtitle` }) : tx(" ", T.small, { style: { fontSize: 3 } }),
          ]),
          panel(
            {
              width: fillSize,
              height: hug,
              padding: { x: 20, y: 14 },
              fill: C.white,
              line: stroke(`1px ${C.line}`),
              borderRadius: 18,
            },
            tx(slide.coreMessage, st({ fontSize: 20, bold: true, color: C.violet, lineSpacing: 1.14 })),
          ),
          content,
          footer(slideNo),
        ],
      ),
    ]),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
}

function opening(pres, slide, slideNo) {
  const s = pres.slides.add();
  s.compose(
    layers({ width: fillSize, height: fillSize }, [
      shape({ width: fillSize, height: fillSize, fill: C.paper, line: stroke("0px #FFFFFF") }),
      shape({ width: fixed(720), height: fixed(720), fill: "#EDE7FF", line: stroke("0px #FFFFFF"), borderRadius: 360, left: 1140, top: -180 }),
      column(
        { width: fillSize, height: fillSize, padding: { x: 92, y: 84 }, gap: 28, justify: "center" },
        [
          chip("공무원 교육용 인터랙티브 강의", C.blue, C.blue2),
          tx("비개발자를 위한\nCodex 바이브 코딩", st({ fontSize: 78, bold: true, color: C.ink, lineSpacing: 1.02 }), { name: "cover-title" }),
          tx("학교 업무를 아는 사람이 Codex에게 일을 맡기고,\n검토하고, 안전하게 배포하는 방법을 배웁니다.", st({ fontSize: 31, bold: true, color: C.slate, lineSpacing: 1.2 }), {
            name: "cover-subtitle",
          }),
          row({ width: hug, height: hug, gap: 14 }, [chip("발표 모드", C.violet, C.violet2), chip("학습 모드", C.blue, C.blue2), chip("실습 데모", C.emerald, C.emerald2)]),
          footer(slideNo),
        ],
      ),
    ]),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
}

function hackathon(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1), fr(1)], columnGap: 20, alignItems: "stretch" }, [
      card("캘리포니아 상해 전문 변호사", "건축 허가/규정 자동 분석 도구. 건축 허가 신청 90%가 반려되는 문제를 해결하고 검토 시간을 몇 주에서 15분으로 단축했습니다.", {
        badge: "금상",
        color: C.amber,
        badgeFill: C.amber2,
        fill: C.white,
      }),
      card("벨기에 심장내과 과장", "진료 기록을 환자 맞춤 건강 안내로 변환. 환자가 진료 후 진단 내용을 이해하지 못하는 문제를 해결했습니다.", {
        badge: "동상",
        color: "#EA580C",
        badgeFill: "#FFEDD5",
        fill: C.white,
      }),
      card("우간다 인프라/도로 엔지니어", "차량 블랙박스 영상을 도로 인프라 투자 추천 보고서로 자동 변환했습니다.", {
        badge: "Keep Thinking 상",
        color: C.violet,
        badgeFill: C.violet2,
        fill: C.white,
      }),
    ]),
    { pres, titleStyle: { fontSize: 52 } },
  );
}

function domain(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fixed(80), fr(1)], columnGap: 18, alignItems: "center" }, [
      column({ width: fillSize, height: hug, gap: 14 }, [
        chip("외부 개발자", C.amber, C.amber2),
        card("양식이 왜 불편한지 추측", "문제와 사용자 맥락을 밖에서 이해해야 합니다.", { fill: C.amber2, line: "#F6D18B" }),
        card("현장 예외상황은 인터뷰 필요", "언어와 절차를 다시 번역해야 합니다.", { fill: C.amber2, line: "#F6D18B" }),
      ]),
      shape({ geometry: "rightArrow", width: fixed(72), height: fixed(44), fill: C.violet, line: stroke(`1px ${C.violet}`) }),
      column({ width: fillSize, height: hug, gap: 14 }, [
        chip("현장 공무원", C.emerald, C.emerald2),
        card("반복 업무를 직접 겪음", "도메인 전문성이 좋은 요구사항의 출발점입니다.", { fill: C.emerald2, line: "#9BE7C7" }),
        card("검토 기준과 예외를 알고 있음", "사용자 언어로 바로 설명할 수 있습니다.", { fill: C.emerald2, line: "#9BE7C7" }),
      ]),
    ]),
    { pres },
  );
}

function codexWhy(pres, slide, slideNo) {
  const terminal = panel(
    { width: fillSize, height: fixed(430), padding: { x: 24, y: 22 }, fill: C.dark, line: stroke(`1px ${C.dark}`), borderRadius: 20 },
    column({ width: fillSize, height: hug, gap: 9 }, [
      tx("CLI (명령줄) 작업", st({ fontSize: 22, bold: true, color: "#A7F3D0" })),
      tx(
        "$ codex\n/goal 학교 업무용 질문·투표 보드 만들기\n> Analyzing requirements...\n> Creating docs/SPEC.md\n> Creating src/components/QuestionBoard.tsx\n> Running tests...\n> npm run build\n✓ Build passed",
        st({ fontSize: 20, color: "#E5E7EB", lineSpacing: 1.18, typeface: "Consolas" }),
      ),
    ]),
  );
  const workspace = panel(
    { width: fillSize, height: fixed(430), padding: { x: 24, y: 22 }, fill: C.white, line: stroke(`1px ${C.line}`), borderRadius: 20 },
    column({ width: fillSize, height: hug, gap: 14 }, [
      chip("Codex 작업 공간", C.blue, C.blue2),
      tx("사용자: 학교 업무용 질문·투표 보드를 만들어줘.\nCodex: PM/UI/개발/리뷰/보안 관점에서 작업을 나누겠습니다.", st({ fontSize: 21, color: C.slate, lineSpacing: 1.2 })),
      grid({ width: fillSize, height: hug, columns: [fr(1), fr(1), fr(1)], columnGap: 10 }, [
        card("PM Agent", "SPEC.md", { height: fixed(110), bodySize: 16, color: C.emerald, fill: C.emerald2 }),
        card("Dev Agent", "React Components", { height: fixed(110), bodySize: 16, color: C.blue, fill: C.blue2 }),
        card("Security", "Security Check", { height: fixed(110), bodySize: 16, color: C.amber, fill: C.amber2 }),
      ]),
    ]),
  );
  baseContent(
    slide,
    slideNo,
    column({ width: fillSize, height: grow(1), gap: 18 }, [
      grid({ width: fillSize, height: hug, columns: [fr(1), fr(1)], columnGap: 18 }, [terminal, workspace]),
      grid({ width: fillSize, height: hug, columns: [fr(1), fr(1), fr(1)], columnGap: 14 }, [
        card("요구사항 구조화", "아이디어를 SPEC과 구현 계획으로 바꿉니다.", { height: fixed(120), fill: C.blue2, line: C.blue }),
        card("실제 코드 수정", "파일을 만들고 컴포넌트를 구현합니다.", { height: fixed(120), fill: C.violet2, line: C.violet }),
        card("검토와 테스트", "빌드와 보안 점검까지 이어집니다.", { height: fixed(120), fill: C.emerald2, line: C.emerald }),
      ]),
    ]),
    { pres, titleStyle: { fontSize: 52 } },
  );
}

function glossarySlide(pres, slide, slideNo) {
  const groups = glossaryCategoryOrder.map((category) => {
    const items = glossary.filter((item) => item.category === category);
    const style = glossaryCategoryStyles[category];
    const fill =
      category === "GitHub 용어" ? "#F1F5F9" : category === "프로그램/사이트" ? C.blue2 : category === "AI 협업 용어" ? C.violet2 : C.emerald2;
    const color = category === "GitHub 용어" ? C.dark2 : category === "프로그램/사이트" ? C.blue : category === "AI 협업 용어" ? C.violet : C.emerald;
    return panel(
      { width: fillSize, height: fillSize, padding: { x: 20, y: 16 }, fill, line: stroke(`1px ${fill}`), borderRadius: 18 },
      column({ width: fillSize, height: hug, gap: 8 }, [
        tx(category, st({ fontSize: 24, bold: true, color })),
        tx(style.short, st({ fontSize: 15, color: C.muted })),
        ...items.slice(0, 5).map((item) => tx(`${item.term}  |  ${item.easy}`, st({ fontSize: 17, bold: true, color: C.ink }))),
      ]),
    );
  });
  baseContent(slide, slideNo, grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1)], rows: [fr(1), fr(1)], columnGap: 16, rowGap: 16 }, groups), { pres });
}

function nodeEnv(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(0.9), fr(1.1)], columnGap: 24, alignItems: "center" }, [
      panel(
        { width: fillSize, height: fixed(480), padding: { x: 26, y: 24 }, fill: C.dark, line: stroke(`1px ${C.dark}`), borderRadius: 20 },
        tx("PS D:\\gpt\\edu> npm install\n+ 필요한 부품 설치 완료\n\nPS D:\\gpt\\edu> npm run dev\n+ http://localhost:5174\n\nPS D:\\gpt\\edu> npm run build\n+ dist 생성 완료", st({ fontSize: 23, color: "#DCFCE7", lineSpacing: 1.2, typeface: "Consolas" })),
      ),
      grid({ width: fillSize, height: hug, columns: [fr(1), fr(1)], rows: [auto, auto, auto], columnGap: 14, rowGap: 14 }, [
        card("Node.js", "내 컴퓨터에서 개발 도구를 실행하는 엔진입니다.", { fill: C.blue2, line: C.blue }),
        card("npm install", "프로젝트 부품을 내려받는 과정입니다.", { fill: C.blue2, line: C.blue }),
        card("npm run dev", "로컬 개발 서버를 띄워 화면을 확인합니다.", { fill: C.violet2, line: C.violet }),
        card("npm run build", "배포 가능한 dist 폴더를 만듭니다.", { fill: C.violet2, line: C.violet }),
        card("Env Variable", "비밀 설정을 코드 밖에 보관합니다.", { fill: C.emerald2, line: C.emerald }),
        card(".env.example", "실제 비밀값 없이 설정 이름만 안내합니다.", { fill: C.emerald2, line: C.emerald }),
      ]),
    ]),
    { pres },
  );
}

function mcp(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(0.95), fr(1.05)], columnGap: 32, alignItems: "center" }, [
      panel(
        { width: fillSize, height: fixed(520), padding: { x: 34, y: 32 }, fill: C.dark, line: stroke(`1px ${C.dark}`), borderRadius: 26 },
        column({ width: fillSize, height: hug, gap: 18, align: "center" }, [
          shape({ geometry: "ellipse", width: fixed(160), height: fixed(160), fill: C.violet, line: stroke(`1px ${C.violet}`) }),
          tx("AI 중심 허브", st({ fontSize: 36, bold: true, color: C.white, alignment: "center" })),
          tx("MCP는 여러 도구를 안전하게 연결하는 규약입니다.", st({ fontSize: 22, color: "#DDEBFF", alignment: "center" })),
        ]),
      ),
      grid({ width: fillSize, height: hug, columns: [fr(1), fr(1)], rows: [auto, auto, auto], columnGap: 14, rowGap: 14 }, [
        card("파일 읽기", "프로젝트 자료 확인", { fill: C.white }),
        card("GitHub 확인", "이슈와 변경 이력 조회", { fill: C.white }),
        card("DB 조회", "데이터 상태 확인", { fill: C.white }),
        card("브라우저 조작", "화면 검수", { fill: C.white }),
        card("문서 생성", "보고서/발표자료 작성", { fill: C.white }),
        card("배포 확인", "공개 URL 점검", { fill: C.white }),
      ]),
    ]),
    { pres },
  );
}

function api(pres, slide, slideNo) {
  flowSlide(pres, slide, slideNo, [
    ["요청서", "정해진 형식으로 보냄"],
    ["API 창구", "서비스가 이해하는 주소"],
    ["응답 문서", "결과 데이터가 돌아옴"],
  ]);
}

function skill(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(0.9), fr(1.1)], columnGap: 26, alignItems: "center" }, [
      panel(
        { width: fillSize, height: fixed(450), padding: { x: 34, y: 32 }, fill: C.violet, line: stroke(`1px ${C.violet}`), borderRadius: 24 },
        column({ width: fillSize, height: hug, gap: 18 }, [
          tx("Skill은 업무 매뉴얼", T.whiteTitle, { style: { fontSize: 42 } }),
          tx("신규 직원에게 절차서를 주듯, Codex에게 작업 방식을 알려줍니다.", T.whiteBody),
        ]),
      ),
      grid({ width: fillSize, height: hug, columns: [fr(1), fr(1)], rows: [auto, auto], columnGap: 16, rowGap: 16 }, [
        card("PPT 생성", "발표자료 구성과 검수"),
        card("PDF 요약", "자료 핵심 추출"),
        card("코드리뷰", "오류와 위험 확인"),
        card("테스트 생성", "검증 기준 작성"),
      ]),
    ]),
    { pres },
  );
}

function promptHarness(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(0.85), fr(1.15)], columnGap: 24, alignItems: "center" }, [
      card("나쁜 프롬프트", "“시간 관리 앱 만들어줘.”\n역할, 범위, 검토 기준, 보안 기준이 비어 있습니다.", { fill: C.rose2, line: C.rose, titleColor: C.rose, titleSize: 30, bodySize: 26 }),
      column({ width: fillSize, height: hug, gap: 16 }, [
        tx("하네스 블록으로 재조립", st({ fontSize: 34, bold: true, color: C.ink })),
        grid({ width: fillSize, height: hug, columns: [fr(1), fr(1), fr(1)], rows: [auto, auto], columnGap: 12, rowGap: 12 }, [
          card("역할", "PM/UI/Dev/Review/Security", { height: fixed(110), fill: C.violet2 }),
          card("업무배경", "학교 업무 맥락", { height: fixed(110), fill: C.blue2 }),
          card("기능범위", "무엇을 만들지", { height: fixed(110), fill: C.emerald2 }),
          card("제약조건", "하지 말아야 할 것", { height: fixed(110), fill: C.amber2 }),
          card("테스트", "통과 기준", { height: fixed(110), fill: C.blue2 }),
          card("보안기준", "개인정보/API Key 금지", { height: fixed(110), fill: C.rose2 }),
        ]),
      ]),
    ]),
    { pres },
  );
}

function harnessCore(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1)], columnGap: 24, alignItems: "center" }, [
      panel(
        { width: fillSize, height: fixed(470), padding: { x: 30, y: 28 }, fill: C.dark, line: stroke(`1px ${C.dark}`), borderRadius: 24 },
        column({ width: fillSize, height: hug, gap: 18 }, [
          tx("통제되지 않은 AI", st({ fontSize: 32, bold: true, color: "#FDA4AF" })),
          bulletList(["말이 달라짐", "범위가 커짐", "보안 기준 누락"], { color: C.rose, textColor: C.white, fontSize: 24, gap: 16 }),
        ]),
      ),
      column({ width: fillSize, height: hug, gap: 16 }, [
        tx("SPEC.md(프로젝트 명세서)가 기준점", st({ fontSize: 36, bold: true, color: C.ink, lineSpacing: 1.08 })),
        tx("요구사항, 테스트, 보안 기준이 먼저 고정되면 코드가 바뀌어도 검토 기준이 남습니다.", T.subtitle),
        bulletList(["요구사항", "구현 계획", "검수 기준"], { color: C.emerald, fontSize: 25 }),
      ]),
    ]),
    { pres },
  );
}

function plugin(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1), fr(1)], columnGap: 18, alignItems: "stretch" }, [
      card("Plugin", "Codex에게 특정 업무 능력과 외부 도구 연결을 붙여주는 확장 장치입니다.", { badge: "확장 장치", fill: C.violet2, line: C.violet }),
      card("Superpowers", "요구사항 정리, 하네스 프롬프트, 구현 계획 같은 앞단 작업을 더 구조화합니다.", { badge: "작업 흐름 강화", fill: C.emerald2, line: C.emerald }),
      card("GitHub Plugin", "저장소, 이슈, PR, 변경 이력을 Codex 작업 흐름과 연결합니다.", { badge: "협업 문서고 연결", fill: C.blue2, line: C.blue }),
    ]),
    { pres },
  );
}

function flowSlide(pres, slide, slideNo, steps) {
  baseContent(
    slide,
    slideNo,
    row(
      { width: fillSize, height: grow(1), gap: 14, align: "center" },
      steps.flatMap(([title, desc], i) => {
        const nodes = [card(title, desc, { height: fixed(230), fill: i % 2 ? C.violet2 : C.white, titleSize: 28, bodySize: 20 })];
        if (i < steps.length - 1) nodes.push(shape({ geometry: "rightArrow", width: fixed(60), height: fixed(36), fill: C.violet, line: stroke(`1px ${C.violet}`) }));
        return nodes;
      }),
    ),
    { pres },
  );
}

function github(pres, slide, slideNo) {
  flowSlide(pres, slide, slideNo, [
    ["Branch", "수정 작업본"],
    ["Commit", "중간 결재 기록"],
    ["Push", "문서고에 올리기"],
    ["Pull Request", "검토 요청"],
    ["Merge", "최종 반영"],
  ]);
}

function vercel(pres, slide, slideNo) {
  flowSlide(pres, slide, slideNo, [
    ["내 컴퓨터", "localhost 개발 화면"],
    ["GitHub", "소스코드 문서고"],
    ["Vercel", "웹 공개 게시대"],
    ["공개 URL", "동료가 접속 가능"],
  ]);
}

function supabase(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1)], columnGap: 24, alignItems: "center" }, [
      card("localStorage", "개인 브라우저 서랍. 연습과 오프라인 데모에 좋습니다.", { fill: C.emerald2, line: C.emerald, titleSize: 36, bodySize: 24 }),
      column({ width: fillSize, height: hug, gap: 16 }, [
        card("Supabase", "공유 DB, 로그인, 파일 저장, 실시간 갱신으로 확장할 수 있습니다.", { fill: C.blue2, line: C.blue, titleSize: 36, bodySize: 24 }),
        grid({ width: fillSize, height: hug, columns: [fr(1), fr(1)], columnGap: 12, rowGap: 12 }, [
          card("Database", "공유 DB", { height: fixed(100), bodySize: 16 }),
          card("Login/Auth", "로그인", { height: fixed(100), bodySize: 16 }),
          card("File Storage", "파일 저장", { height: fixed(100), bodySize: 16 }),
          card("Realtime", "실시간 갱신", { height: fixed(100), bodySize: 16 }),
        ]),
      ]),
    ]),
    { pres },
  );
}

function pipeline(pres, slide, slideNo) {
  const steps = ["아이디어", "브레인스토밍", "Spec", "구현 계획", "Codex 실행", "검토", "수정", "배포", "기록"];
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1), fr(1)], rows: [auto, auto, auto], columnGap: 14, rowGap: 14 }, steps.map((step, i) => card(`${i + 1}. ${step}`, "단계별로 통제하고 기록합니다.", { fill: i % 2 ? C.blue2 : C.white, height: fixed(125), bodySize: 16 }))),
    { pres },
  );
}

function questionBoard(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(0.88), fr(1.12)], columnGap: 24, alignItems: "center" }, [
      column({ width: fillSize, height: hug, gap: 14 }, [
        card("PM Agent", "요구사항 생성", { height: fixed(110), fill: C.emerald2 }),
        card("UI Agent", "입력창/투표/정렬 화면 설계", { height: fixed(110), fill: C.violet2 }),
        card("Dev Agent", "localStorage와 CSV 구현", { height: fixed(110), fill: C.blue2 }),
        card("Security Agent", "개인정보 금지 확인", { height: fixed(110), fill: C.amber2 }),
      ]),
      panel(
        { width: fillSize, height: fixed(500), padding: { x: 26, y: 24 }, fill: C.white, line: stroke(`1px ${C.line}`), borderRadius: 20 },
        column({ width: fillSize, height: hug, gap: 14 }, [
          tx("연수 질문·투표 보드", st({ fontSize: 32, bold: true, color: C.ink })),
          tx("질문 등록 | 공감 투표 | 답변 완료 | CSV | 파일 첨부", st({ fontSize: 22, bold: true, color: C.violet })),
          card("질문 예시", "Codex를 실제 업무에 적용할 때 가장 먼저 만들어 볼 만한 예제는 무엇인가요?   👍 28", { fill: C.paper2 }),
          card("보안 안내", "실제 학생, 학부모, 교직원 개인정보는 입력하지 않습니다.", { fill: C.rose2, line: C.rose }),
        ]),
      ),
    ]),
    { pres },
  );
}

function schoolToolsSlide(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid(
      { width: fillSize, height: grow(1), columns: [fr(1), fr(1)], rows: [auto, auto], columnGap: 16, rowGap: 16 },
      schoolTools.map((tool) => card(tool.title, `${tool.description}\n확장: ${tool.expansion.join(" · ")}`, { fill: C.white, height: fixed(190), bodySize: 19 })),
    ),
    { pres },
  );
}

function worktree(pres, slide, slideNo) {
  const branches = [
    ["PM Agent", "SPEC.md"],
    ["UI Agent", "DESIGN.md"],
    ["Dev Agent", "React Components"],
    ["Review Agent", "TEST_REPORT.md"],
    ["Security Agent", "SECURITY_CHECK.md"],
  ];
  baseContent(
    slide,
    slideNo,
    column({ width: fillSize, height: grow(1), gap: 26, justify: "center" }, [
      row({ width: fillSize, height: hug, gap: 14, align: "center" }, [chip("Main Agent", C.violet, C.violet2), shape({ geometry: "rightArrow", width: fixed(72), height: fixed(40), fill: C.violet, line: stroke(`1px ${C.violet}`) }), chip("병렬 작업", C.blue, C.blue2)]),
      grid({ width: fillSize, height: hug, columns: [fr(1), fr(1), fr(1), fr(1), fr(1)], columnGap: 12 }, branches.map(([a, b]) => card(a, b, { fill: C.white, height: fixed(170), bodySize: 18 }))),
      card("통합", "Main Agent가 결과를 병합하고 최종 기준으로 검토합니다.", { fill: C.emerald2, line: C.emerald, height: fixed(120) }),
    ]),
    { pres },
  );
}

function security(pres, slide, slideNo) {
  const checks = ["실제 개인정보 없음", "전화번호/주민번호/건강정보 없음", "API Key 없음", "더미 데이터 사용", "외부 서비스 규정 확인", "무료 서비스 위험 확인", "사람이 최종 검토"];
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(0.8), fr(1.2)], columnGap: 28, alignItems: "center" }, [
      panel(
        { width: fillSize, height: fixed(420), padding: { x: 28, y: 28 }, fill: C.dark, line: stroke(`1px ${C.dark}`), borderRadius: 24 },
        column({ width: fillSize, height: hug, gap: 18, align: "center" }, [
          shape({ geometry: "ellipse", width: fixed(160), height: fixed(160), fill: C.emerald, line: stroke(`1px ${C.emerald}`) }),
          tx("CSO PASS", st({ fontSize: 42, bold: true, color: C.white, alignment: "center" })),
        ]),
      ),
      grid({ width: fillSize, height: hug, columns: [fr(1), fr(1)], columnGap: 12, rowGap: 12 }, checks.map((check) => card(check, "통과 기준", { height: fixed(100), fill: C.emerald2, line: C.emerald, bodySize: 16 }))),
    ]),
    { pres },
  );
}

function setup(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1), fr(1)], rows: [auto, auto, auto], columnGap: 14, rowGap: 14 }, [
      ...slide.bullets.map((item) => card(item, "준비물 확인", { fill: C.white, height: fixed(120), bodySize: 16 })),
      card("복습 루틴", "아이디어 → SPEC → 구현 → 빌드 → 보안 점검 → 배포 전 검토", { fill: C.violet2, line: C.violet, height: fixed(120), columnSpan: 3 }),
    ]),
    { pres },
  );
}

function closing(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1)], columnGap: 28, alignItems: "center" }, [
      bulletList(["문제를 정의하십시오.", "Codex에게 구조적으로 맡기십시오.", "사람이 최종 검토하십시오."], { fontSize: 30, color: C.violet, gap: 22 }),
      panel(
        { width: fillSize, height: fixed(420), padding: { x: 32, y: 32 }, fill: C.dark, line: stroke(`1px ${C.dark}`), borderRadius: 26 },
        column({ width: fillSize, height: hug, gap: 18, align: "center" }, [
          tx("Tech Lead Mode Activated", st({ fontSize: 46, bold: true, color: C.white, alignment: "center" })),
          tx("AI를 통제하는 사람이 결과물을 만든다.", st({ fontSize: 30, bold: true, color: "#A7F3D0", alignment: "center" })),
        ]),
      ),
    ]),
    { pres },
  );
}

function generic(pres, slide, slideNo) {
  baseContent(
    slide,
    slideNo,
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1)], columnGap: 24, alignItems: "center" }, [
      bulletList(slide.bullets ?? [], { fontSize: 24, color: C.violet, gap: 16 }),
      card("발표자 노트 요약", slide.speakerNotes, { fill: C.white, bodySize: 19, titleSize: 28 }),
    ]),
    { pres },
  );
}

function makeDeck() {
  const pres = Presentation.create({ slideSize: { width: W, height: H } });
  slides.forEach((slide, idx) => {
    const slideNo = idx + 1;
    switch (slide.animationType) {
      case "opening":
        opening(pres, slide, slideNo);
        break;
      case "research":
        hackathon(pres, slide, slideNo);
        break;
      case "domain":
        domain(pres, slide, slideNo);
        break;
      case "codex-coding":
        codexWhy(pres, slide, slideNo);
        break;
      case "glossary":
        glossarySlide(pres, slide, slideNo);
        break;
      case "node-env":
        nodeEnv(pres, slide, slideNo);
        break;
      case "mcp":
        mcp(pres, slide, slideNo);
        break;
      case "api":
        api(pres, slide, slideNo);
        break;
      case "skill":
        skill(pres, slide, slideNo);
        break;
      case "prompt-harness":
        promptHarness(pres, slide, slideNo);
        break;
      case "harness-core":
        harnessCore(pres, slide, slideNo);
        break;
      case "plugin-arsenal":
        plugin(pres, slide, slideNo);
        break;
      case "github":
        github(pres, slide, slideNo);
        break;
      case "vercel":
        vercel(pres, slide, slideNo);
        break;
      case "supabase":
        supabase(pres, slide, slideNo);
        break;
      case "pipeline":
        pipeline(pres, slide, slideNo);
        break;
      case "question-board":
        questionBoard(pres, slide, slideNo);
        break;
      case "school-tools":
        schoolToolsSlide(pres, slide, slideNo);
        break;
      case "worktree":
        worktree(pres, slide, slideNo);
        break;
      case "security":
        security(pres, slide, slideNo);
        break;
      case "setup":
        setup(pres, slide, slideNo);
        break;
      case "closing":
        closing(pres, slide, slideNo);
        break;
      default:
        generic(pres, slide, slideNo);
    }
  });
  return pres;
}

async function renderDeck(pres, dir, prefix) {
  fs.mkdirSync(dir, { recursive: true });
  const paths = [];
  for (let i = 0; i < pres.slides.items.length; i += 1) {
    const canvas = new Canvas(W, H);
    const ctx = canvas.getContext("2d");
    await drawSlideToCtx(pres.slides.items[i], pres, ctx, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
      clearBeforeDraw: true,
    });
    const file = path.join(dir, `${prefix}_${String(i + 1).padStart(2, "0")}.png`);
    await canvas.toFile(file);
    paths.push(file);
  }
  return paths;
}

async function makeMontage(paths, outFile) {
  const thumbW = 480;
  const thumbH = 270;
  const cols = 4;
  const rows = Math.ceil(paths.length / cols);
  const canvas = new Canvas(thumbW * cols, thumbH * rows);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#F1F5F9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < paths.length; i += 1) {
    const img = await loadImage(paths[i]);
    const x = (i % cols) * thumbW;
    const y = Math.floor(i / cols) * thumbH;
    ctx.drawImage(img, x, y, thumbW, thumbH);
  }
  await canvas.toFile(outFile);
}

function parseInspect(ndjson) {
  return ndjson
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function runBasicQa(records) {
  const issues = [];
  for (const rec of records) {
    if (Array.isArray(rec.bbox)) {
      const [x, y, w, h] = rec.bbox;
      if (x < -1 || y < -1 || x + w > W + 1 || y + h > H + 1) {
        issues.push({ type: "off_slide_bbox", slide: rec.slide, id: rec.id, bbox: rec.bbox, text: rec.textPreview ?? rec.text });
      }
    }
    const preview = `${rec.textPreview ?? rec.text ?? ""}`;
    if (/Slide Number|sldNum|placeholder/i.test(preview)) {
      issues.push({ type: "placeholder_text", slide: rec.slide, id: rec.id, text: preview });
    }
  }
  return issues;
}

const pres = makeDeck();
const pptxBlob = await PresentationFile.exportPptx(pres);
await pptxBlob.save(outPptx);
fs.copyFileSync(outPptx, downloadsPptx);

let imported = null;
let pptxParityChecked = false;
try {
  const bytes = fs.readFileSync(outPptx);
  imported = await PresentationFile.importPptx(bytes);
  const inspected = await imported.inspect();
  fs.writeFileSync(inspectPath, inspected.ndjson, "utf8");
  const records = parseInspect(inspected.ndjson);
  const issues = runBasicQa(records);
  fs.writeFileSync(qaPath, JSON.stringify({ checkedAt: new Date().toISOString(), issueCount: issues.length, issues }, null, 2), "utf8");
  pptxParityChecked = true;
} catch (err) {
  fs.writeFileSync(qaPath, JSON.stringify({ checkedAt: new Date().toISOString(), pptxParityChecked: false, error: String(err?.stack ?? err) }, null, 2), "utf8");
}

const previewSource = imported ?? pres;
const previewPaths = await renderDeck(previewSource, PREVIEW_DIR, deckName);
await makeMontage(previewPaths, montagePath);

console.log(
  JSON.stringify(
    {
      outPptx,
      downloadsPptx,
      previewDir: PREVIEW_DIR,
      previewCount: previewPaths.length,
      montagePath,
      inspectPath,
      qaPath,
      pptxParityChecked,
    },
    null,
    2,
  ),
);
