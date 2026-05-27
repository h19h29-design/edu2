import fs from "node:fs";
import path from "node:path";
import { Canvas } from "file:///C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/node_modules/skia-canvas/lib/index.mjs";

const artifact = await import(
  "file:///C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs"
);
const jsx = await import(
  "file:///C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/presentation-jsx/index.mjs"
);

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
  wrap,
  grow,
  fr,
  auto,
  drawSlideToCtx,
} = artifact;
const { stroke } = jsx;

const OUT_DIR = "D:/gpt/edu/output/pptx";
const PREVIEW_DIR = "D:/gpt/edu/output/previews";
const REPORT_DIR = "D:/gpt/edu/output/reports";
const DOWNLOADS_DIR = "C:/Users/user/Downloads";
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(PREVIEW_DIR, { recursive: true });
fs.mkdirSync(REPORT_DIR, { recursive: true });

const W = 1920;
const H = 1080;
const deckName = "공무원_교육용_AI_하네스_엔지니어링";
const outPptx = path.join(OUT_DIR, `${deckName}.pptx`);
const downloadsPptx = path.join(DOWNLOADS_DIR, `${deckName}.pptx`);
const inspectPath = path.join(REPORT_DIR, `${deckName}_inspect.ndjson`);
const qaPath = path.join(REPORT_DIR, `${deckName}_qa.json`);

const C = {
  paper: "#F7F4EC",
  paper2: "#FFFDF7",
  ink: "#12263A",
  muted: "#486175",
  faint: "#D9D1C3",
  grid: "#E8E0D2",
  blue: "#1E5AA8",
  blue2: "#D8E7F8",
  orange: "#D86B22",
  orange2: "#F9E1D1",
  green: "#1D7A5C",
  green2: "#DCEFE7",
  red: "#B64632",
  red2: "#F5D8D2",
  slate: "#2E4457",
  white: "#FFFFFF",
};

const font = "Malgun Gothic";

function s(base, extra = {}) {
  return { typeface: font, color: C.ink, ...base, ...extra };
}

const ST = {
  eyebrow: s({ fontSize: 22, bold: true, color: C.orange }),
  title: s({ fontSize: 52, bold: true, color: C.ink, lineSpacing: 1.08 }),
  subtitle: s({ fontSize: 27, color: C.muted, lineSpacing: 1.18 }),
  body: s({ fontSize: 27, color: C.ink, lineSpacing: 1.2 }),
  small: s({ fontSize: 19, color: C.muted, lineSpacing: 1.15 }),
  label: s({ fontSize: 19, bold: true, color: C.blue }),
  metric: s({ fontSize: 72, bold: true, color: C.orange }),
  whiteTitle: s({ fontSize: 58, bold: true, color: C.white, lineSpacing: 1.05 }),
  whiteBody: s({ fontSize: 28, color: "#EAF2FA", lineSpacing: 1.18 }),
};

function tx(value, style = ST.body, opts = {}) {
  return text(value, {
    name: opts.name,
    width: opts.width ?? fillSize,
    height: opts.height ?? hug,
    columnSpan: opts.columnSpan,
    rowSpan: opts.rowSpan,
    style: { ...style, ...(opts.style ?? {}) },
  });
}

function chip(label, color = C.blue, fill = C.blue2) {
  return panel(
    {
      width: hug,
      height: hug,
      padding: { x: 18, y: 8 },
      fill,
      line: stroke(`1px ${color}`),
      borderRadius: 8,
    },
    tx(label, s({ fontSize: 18, bold: true, color }), { width: hug }),
  );
}

function bulletList(items, opts = {}) {
  const markerColor = opts.markerColor ?? C.orange;
  return column(
    { name: opts.name, width: fillSize, height: hug, gap: opts.gap ?? 14 },
    items.map((item) =>
      row({ width: fillSize, height: hug, gap: 14, align: "start" }, [
        tx(opts.marker ?? "•", s({ fontSize: 26, bold: true, color: markerColor }), {
          width: fixed(26),
        }),
        tx(item, opts.style ?? ST.body, { width: fillSize }),
      ]),
    ),
  );
}

function noteBox(title, body, color = C.blue, fill = C.blue2) {
  return panel(
    {
      width: fillSize,
      height: hug,
      padding: { x: 26, y: 20 },
      fill,
      line: stroke(`1.4px ${color}`),
      borderRadius: 8,
    },
    column({ width: fillSize, height: hug, gap: 6 }, [
      tx(title, s({ fontSize: 22, bold: true, color }), { width: fillSize }),
      tx(body, s({ fontSize: 21, color: C.ink, lineSpacing: 1.16 }), { width: fillSize }),
    ]),
  );
}

function cell(textValue, opts = {}) {
  return panel(
    {
      width: fillSize,
      height: opts.height ?? hug,
      padding: opts.padding ?? { x: 20, y: 14 },
      fill: opts.fill ?? C.white,
      line: stroke(`1px ${opts.line ?? C.faint}`),
      borderRadius: opts.radius ?? 0,
    },
    tx(textValue, opts.style ?? s({ fontSize: 22, color: C.ink, lineSpacing: 1.14 }), {
      width: fillSize,
    }),
  );
}

function footer(slideNo) {
  return row({ width: fillSize, height: hug, align: "center", justify: "between" }, [
    tx("공공부문 생성형 AI 활용 교육", ST.small, { width: wrap(520), style: { fontSize: 15 } }),
    tx(`${String(slideNo).padStart(2, "0")} / 20`, ST.small, {
      width: fixed(90),
      style: { fontSize: 15, alignment: "right" },
    }),
  ]);
}

function standardSlide(pres, slideNo, eyebrow, title, subtitle, content) {
  const slide = pres.slides.add();
  slide.compose(
    column(
      {
        name: `slide-${slideNo}-root`,
        width: fillSize,
        height: fillSize,
        padding: { x: 92, y: 58 },
        gap: 22,
      },
      [
        column({ width: fillSize, height: hug, gap: 10 }, [
          eyebrow ? tx(eyebrow, ST.eyebrow, { name: `slide-${slideNo}-eyebrow` }) : tx(" ", ST.eyebrow),
          tx(title, ST.title, { name: `slide-${slideNo}-title` }),
          subtitle ? tx(subtitle, ST.subtitle, { name: `slide-${slideNo}-subtitle` }) : tx(" ", ST.subtitle, { style: { fontSize: 4 } }),
        ]),
        content,
        footer(slideNo),
      ],
    ),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
}

function arrow(color = C.orange) {
  return shape({ geometry: "rightArrow", width: fixed(68), height: fixed(34), fill: color, line: stroke(`1px ${color}`) });
}

function processStep(num, title, desc, color = C.blue) {
  return column({ width: fillSize, height: hug, gap: 12, align: "center" }, [
    panel(
      {
        width: fixed(78),
        height: fixed(78),
        padding: 0,
        fill: color,
        line: stroke(`1px ${color}`),
        borderRadius: 8,
        align: "center",
        justify: "center",
      },
      tx(String(num), s({ fontSize: 34, bold: true, color: C.white }), {
        width: fixed(60),
        style: { alignment: "center" },
      }),
    ),
    tx(title, s({ fontSize: 23, bold: true, color: C.ink, alignment: "center" }), { width: fillSize }),
    tx(desc, s({ fontSize: 18, color: C.muted, lineSpacing: 1.14, alignment: "center" }), { width: fillSize }),
  ]);
}

function miniCard(title, body, color = C.blue, fill = C.white) {
  return panel(
    {
      width: fillSize,
      height: fillSize,
      padding: { x: 22, y: 18 },
      fill,
      line: stroke(`1.2px ${color}`),
      borderRadius: 8,
    },
    column({ width: fillSize, height: hug, gap: 8 }, [
      tx(title, s({ fontSize: 22, bold: true, color }), { width: fillSize }),
      tx(body, s({ fontSize: 20, color: C.ink, lineSpacing: 1.14 }), { width: fillSize }),
    ]),
  );
}

function makeDeck() {
  const pres = Presentation.create({ slideSize: { width: W, height: H } });

  // 1. Cover
  {
    const slide = pres.slides.add();
    slide.compose(
      layers({ width: fillSize, height: fillSize }, [
        shape({ width: fillSize, height: fillSize, fill: C.paper, line: stroke("0px #FFFFFF") }),
        grid(
          {
            width: fillSize,
            height: fillSize,
            columns: [fr(1.08), fr(0.92)],
            rows: [fr(1)],
            columnGap: 46,
            padding: { x: 94, y: 78 },
          },
          [
            column({ width: fillSize, height: fillSize, gap: 28, justify: "center" }, [
              chip("공무원 교육용", C.orange, C.orange2),
              tx("AI 업무 하네스\n엔지니어링", s({ fontSize: 76, bold: true, color: C.ink, lineSpacing: 1.03 }), {
                name: "cover-title",
              }),
              rule({ width: fixed(420), stroke: C.orange, weight: 8 }),
              tx("생성형 AI를 안전하게 맡기기 위한\n통제, 검증, 기록의 실무 체계", s({ fontSize: 34, color: C.muted, lineSpacing: 1.18 }), {
                name: "cover-subtitle",
              }),
              tx("자료 통합: Harness Engineering Mastery + Mastering Harness Engineering", ST.small, {
                style: { fontSize: 18 },
              }),
            ]),
            column({ width: fillSize, height: fillSize, gap: 26, justify: "center" }, [
              panel(
                {
                  width: fillSize,
                  height: fixed(114),
                  padding: { x: 28, y: 22 },
                  fill: C.ink,
                  line: stroke(`1px ${C.ink}`),
                  borderRadius: 8,
                },
                tx("프롬프트는 요청이고,\n하네스는 업무 시스템입니다.", ST.whiteBody, {
                  style: { fontSize: 30, bold: true },
                }),
              ),
              row({ width: fillSize, height: hug, gap: 16, align: "center" }, [
                chip("명세", C.blue, C.blue2),
                arrow(C.orange),
                chip("실행", C.green, C.green2),
                arrow(C.orange),
                chip("검증", C.red, C.red2),
                arrow(C.orange),
                chip("기록", C.slate, "#E7ECF0"),
              ]),
              grid(
                { width: fillSize, height: fixed(380), columns: [fr(1), fr(1)], rows: [fr(1), fr(1)], columnGap: 18, rowGap: 18 },
                [
                  miniCard("통제", "목표, 범위, 금지사항을 먼저 정합니다.", C.blue, C.blue2),
                  miniCard("책임", "역할과 승인 게이트를 분리합니다.", C.green, C.green2),
                  miniCard("보안", "개인정보와 권한을 별도 점검합니다.", C.red, C.red2),
                  miniCard("학습", "실패 사유를 다음 체크리스트로 남깁니다.", C.orange, C.orange2),
                ],
              ),
            ]),
          ],
        ),
      ]),
      { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
    );
  }

  // 2. Thesis
  standardSlide(
    pres,
    2,
    "핵심 전환",
    "AI 활용 교육의 중심은 '문장'이 아니라 '업무 절차'입니다",
    "하네스 엔지니어링은 AI의 창의성을 없애는 것이 아니라, 공공업무가 요구하는 예측 가능성과 책임성을 씌우는 방법입니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fixed(96), fr(1)], columnGap: 24, alignItems: "center" }, [
      column({ width: fillSize, height: hug, gap: 18 }, [
        tx("단순 프롬프팅", s({ fontSize: 36, bold: true, color: C.red })),
        bulletList(["모호한 요청에서 바로 결과 생성", "결과가 매번 달라질 수 있음", "검토 기준과 책임 소재가 흐림"], {
          markerColor: C.red,
        }),
      ]),
      column({ width: fillSize, height: hug, gap: 16, align: "center" }, [
        shape({ geometry: "rightArrow", width: fixed(86), height: fixed(48), fill: C.orange, line: stroke(`1px ${C.orange}`) }),
        tx("전환", s({ fontSize: 18, bold: true, color: C.orange, alignment: "center" }), { width: fillSize }),
      ]),
      column({ width: fillSize, height: hug, gap: 18 }, [
        tx("하네스 엔지니어링", s({ fontSize: 36, bold: true, color: C.blue })),
        bulletList(["명세, 제약, 검토, 기록으로 AI를 통제", "업무 위험도에 맞게 승인 게이트 배치", "실패를 다음 업무의 자산으로 축적"], {
          markerColor: C.blue,
        }),
      ]),
    ]),
  );

  // 3. Learning outcomes
  standardSlide(
    pres,
    3,
    "교육 목표",
    "수강 후에는 AI에게 일을 '시키는 법'보다 '맡기는 구조'를 설계할 수 있어야 합니다",
    "공공업무 맥락에서는 편의성보다 책임성, 재현성, 감사 가능성이 우선입니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1)], rows: [auto, auto, auto], columnGap: 24, rowGap: 18 }, [
      miniCard("1. 하네스 개념 설명", "AI를 통제하는 명세, 제약, 검토, 기록 구조를 설명합니다.", C.blue, C.white),
      miniCard("2. 요청을 명세로 전환", "목표, 데이터, 예외, 성공 기준이 있는 Spec으로 바꿉니다.", C.green, C.white),
      miniCard("3. 역할과 책임 분리", "기획자, 실행자, 리뷰어, 보안책임자의 역할을 나눕니다.", C.orange, C.white),
      miniCard("4. 품질·보안 리스크 식별", "개인정보, 권한, 오류, 환각, 기록 누락 위험을 찾습니다.", C.red, C.white),
      miniCard("5. 위험도별 프로세스 선택", "경량, 표준, 고위험 하네스를 업무별로 구분합니다.", C.slate, C.white),
      miniCard("6. 평가 체크리스트 작성", "승인, 반려, 재작업 기준을 체크리스트로 만듭니다.", C.blue, C.white),
    ]),
  );

  // 4. Public risks
  standardSlide(
    pres,
    4,
    "왜 공공부문에 필요한가",
    "통제되지 않은 AI는 빠르지만, 공공업무에는 빠른 오류도 위험합니다",
    "AI의 불확실성은 기술 문제가 아니라 행정 책임, 정보보호, 신뢰의 문제로 이어집니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1.08), fr(0.92)], columnGap: 38, alignItems: "center" }, [
      column({ width: fillSize, height: hug, gap: 20 }, [
        tx("대표 리스크", s({ fontSize: 34, bold: true, color: C.ink })),
        bulletList([
          "민원 답변 초안의 사실 오류와 과도한 단정",
          "개인정보, 내부문서, API Key의 외부 노출",
          "예산·계약·감사 자료의 근거 누락",
          "누가 승인했는지 남지 않는 책임 공백",
          "긴 작업 중 맥락 압축으로 핵심 조건 손실",
        ]),
      ]),
      panel(
        {
          width: fillSize,
          height: fixed(450),
          padding: { x: 32, y: 32 },
          fill: C.ink,
          line: stroke(`1px ${C.ink}`),
          borderRadius: 8,
          justify: "center",
        },
        column({ width: fillSize, height: hug, gap: 18 }, [
          tx("공공기관의 AI 활용 원칙", ST.whiteTitle, { style: { fontSize: 40 } }),
          tx("자동화는 가능하지만,\n최종 책임은 사람의 승인 게이트에 남아야 합니다.", ST.whiteBody),
          rule({ width: fixed(280), stroke: C.orange, weight: 6 }),
          tx("빠른 산출보다 중요한 것은 재현 가능한 판단 과정입니다.", s({ fontSize: 23, color: "#CFE1F2" })),
        ]),
      ),
    ]),
  );

  // 5. Definition
  standardSlide(
    pres,
    5,
    "정의",
    "하네스 엔지니어링은 AI가 마음대로 뛰지 못하게 묶는 업무 설계입니다",
    "핵심은 더 긴 프롬프트가 아니라 AI가 따라야 할 레일을 명확히 놓는 것입니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1), fr(1), fr(1)], columnGap: 18, alignItems: "center" }, [
      processStep("1", "명세", "목표, 범위, 데이터, 성공 기준", C.blue),
      processStep("2", "제약", "금지사항, 권한, 예외처리", C.orange),
      processStep("3", "검증", "테스트, 리뷰, 승인·반려", C.green),
      processStep("4", "기록", "결정, 실패, Lessons Learned", C.slate),
    ]),
  );

  // 6. Comparison table
  standardSlide(
    pres,
    6,
    "비교",
    "아마추어 프롬프팅과 프로 하네스 엔지니어링의 차이",
    "공공업무에서는 결과물뿐 아니라 결과가 만들어진 절차까지 설명 가능해야 합니다.",
    column({ width: fillSize, height: grow(1), gap: 0, justify: "center" }, [
      grid({ width: fillSize, height: hug, columns: [fr(0.72), fr(1), fr(1)], rows: [auto, auto, auto, auto, auto], columnGap: 0, rowGap: 0 }, [
        cell("구분", { fill: C.ink, line: C.ink, style: s({ fontSize: 22, bold: true, color: C.white, alignment: "center" }) }),
        cell("단순 프롬프팅", { fill: C.red, line: C.red, style: s({ fontSize: 22, bold: true, color: C.white, alignment: "center" }) }),
        cell("하네스 엔지니어링", { fill: C.blue, line: C.blue, style: s({ fontSize: 22, bold: true, color: C.white, alignment: "center" }) }),
        cell("시작점", { fill: C.paper2, style: s({ fontSize: 21, bold: true, color: C.ink }) }),
        cell("대략적인 자연어 요청", {}),
        cell("목표와 승인 기준이 있는 명세", {}),
        cell("오류 처리", { fill: C.paper2, style: s({ fontSize: 21, bold: true, color: C.ink }) }),
        cell("사람이 나중에 발견", {}),
        cell("검토 루프와 반려 기준을 사전에 설계", {}),
        cell("책임 소재", { fill: C.paper2, style: s({ fontSize: 21, bold: true, color: C.ink }) }),
        cell("요청자와 AI 사이에 흐림", {}),
        cell("기획, 실행, 리뷰, 보안, 승인으로 분리", {}),
        cell("기록", { fill: C.paper2, style: s({ fontSize: 21, bold: true, color: C.ink }) }),
        cell("결과만 남음", {}),
        cell("결정과 실패 사유까지 재사용 가능", {}),
      ]),
    ]),
  );

  // 7. Operating model
  standardSlide(
    pres,
    7,
    "운영 모델",
    "공공업무용 AI 하네스는 요청부터 기록까지 하나의 파이프라인으로 봅니다",
    "각 단계는 다음 단계의 입력이자, 나중에 감사할 수 있는 기록입니다.",
    column({ width: fillSize, height: grow(1), gap: 34, justify: "center" }, [
      row({ width: fillSize, height: hug, gap: 12, align: "center" }, [
        processStep("1", "요청", "업무 목적", C.slate),
        arrow(C.orange),
        processStep("2", "명세", "요건·제약", C.blue),
        arrow(C.orange),
        processStep("3", "계획", "역할·검증", C.green),
        arrow(C.orange),
        processStep("4", "실행", "AI 작업", C.orange),
      ]),
      row({ width: fillSize, height: hug, gap: 12, align: "center" }, [
        processStep("5", "리뷰", "품질 점검", C.blue),
        arrow(C.orange),
        processStep("6", "보안", "민감정보·권한", C.red),
        arrow(C.orange),
        processStep("7", "승인", "사람의 판단", C.green),
        arrow(C.orange),
        processStep("8", "학습", "실패 기록", C.slate),
      ]),
    ]),
  );

  // 8. Roles
  standardSlide(
    pres,
    8,
    "역할 분리",
    "AI가 여러 역할을 흉내 낼 수 있어도 책임은 역할별로 분리해야 합니다",
    "역할 분리는 속도를 늦추기 위한 장치가 아니라, 오류가 어디서 발생했는지 알기 위한 구조입니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1), fr(1)], rows: [fr(1), fr(1)], columnGap: 20, rowGap: 20 }, [
      miniCard("요청자", "업무 목적, 대상, 기대 산출물을 제시합니다.", C.slate, C.white),
      miniCard("PM / 기획자", "모호한 요청을 Spec과 승인 기준으로 바꿉니다.", C.blue, C.white),
      miniCard("Tech Lead", "실행 계획, 파일 범위, 검증 방식을 설계합니다.", C.green, C.white),
      miniCard("실행 에이전트", "분리된 범위에서 산출물을 작성합니다.", C.orange, C.white),
      miniCard("리뷰어", "기준 충족, 오류, 누락, 테스트 결과를 확인합니다.", C.blue, C.white),
      miniCard("보안책임자", "개인정보, 권한, 외부 전송, 기록 보존을 점검합니다.", C.red, C.white),
    ]),
  );

  // 9. Spec
  standardSlide(
    pres,
    9,
    "Step 1",
    "모호한 요청을 견고한 명세로 바꾸십시오",
    "AI에게 바로 실행을 맡기기 전에, 업무의 성공 조건을 사람이 먼저 결정해야 합니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1.1), fr(0.9)], columnGap: 32, alignItems: "center" }, [
      column({ width: fillSize, height: hug, gap: 18 }, [
        tx("좋은 Spec에 들어갈 항목", s({ fontSize: 34, bold: true, color: C.ink })),
        bulletList([
          "목적: 이 작업이 해결해야 할 행정 문제",
          "대상: 시민, 내부 직원, 관리자 등 실제 사용자",
          "입력: 사용할 수 있는 자료와 금지된 자료",
          "예외: 실패, 누락, 민감정보 발생 시 처리",
          "승인 기준: 완료 판정과 반려 기준",
        ]),
      ]),
      noteBox(
        "교육 실습 문장",
        "'민원 답변 만들어줘'를 '관련 법령 근거, 개인정보 비식별, 승인 전 초안 표시, 반려 기준 포함' 명세로 바꿔봅니다.",
        C.orange,
        C.orange2,
      ),
    ]),
  );

  // 10. Blueprint
  standardSlide(
    pres,
    10,
    "Step 2",
    "Blueprint를 단일 진실 원장으로 삼으십시오",
    "AI가 만든 코드나 문장보다 앞서는 기준은 명세와 계획 문서입니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1)], columnGap: 28, alignItems: "center" }, [
      panel(
        { width: fillSize, height: fixed(500), padding: { x: 30, y: 28 }, fill: C.paper2, line: stroke(`1.5px ${C.faint}`), borderRadius: 8 },
        column({ width: fillSize, height: hug, gap: 18 }, [
          tx("Blueprint에 남길 것", s({ fontSize: 31, bold: true, color: C.blue })),
          bulletList(["범위와 제외 범위", "처리 순서와 역할", "테스트·검토 기준", "보안 점검 항목", "변경 이력과 결정 이유"], {
            style: s({ fontSize: 23, color: C.ink, lineSpacing: 1.16 }),
          }),
        ]),
      ),
      column({ width: fillSize, height: hug, gap: 20 }, [
        tx("원칙", s({ fontSize: 34, bold: true, color: C.ink })),
        tx("대화창은 작업 공간일 뿐,\n진실의 원장은 문서여야 합니다.", s({ fontSize: 43, bold: true, color: C.ink, lineSpacing: 1.12 })),
        rule({ width: fixed(260), stroke: C.orange, weight: 6 }),
        tx("긴 작업에서는 컨텍스트 압축이나 기억 누락이 발생할 수 있으므로 핵심 결정은 외부 문서에 고정합니다.", ST.subtitle),
      ]),
    ]),
  );

  // 11. Delegation
  standardSlide(
    pres,
    11,
    "Step 3",
    "병렬 실행은 효율적이지만, 분리된 책임 범위가 먼저입니다",
    "서브에이전트와 작업공간 분리는 속도보다 충돌 방지와 책임 추적을 위해 필요합니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1.18), fr(0.82)], columnGap: 34, alignItems: "center" }, [
      column({ width: fillSize, height: hug, gap: 22 }, [
        row({ width: fillSize, height: hug, gap: 16, align: "center" }, [
          chip("Main Agent", C.blue, C.blue2),
          arrow(C.orange),
          chip("Sub-Agent A", C.green, C.green2),
          chip("Sub-Agent B", C.green, C.green2),
          chip("Sub-Agent C", C.green, C.green2),
        ]),
        row({ width: fillSize, height: hug, gap: 16, align: "center" }, [
          chip("Worktree A", C.slate, "#E7ECF0"),
          chip("Worktree B", C.slate, "#E7ECF0"),
          chip("Worktree C", C.slate, "#E7ECF0"),
          arrow(C.orange),
          chip("Review & Merge", C.orange, C.orange2),
        ]),
        noteBox("위임 전 확인", "파일 소유권, 산출물 형식, 검증 명령, 병합 책임자를 명확히 지정합니다.", C.blue, C.blue2),
      ]),
      bulletList([
        "독립적인 탐색과 테스트 위치 파악은 병렬화에 적합",
        "바로 다음 단계가 막히는 핵심 판단은 직접 처리",
        "같은 파일을 여러 작업자가 동시에 고치지 않도록 분리",
        "충돌이 나면 최종 통합자가 기준 문서와 테스트로 판단",
      ], { markerColor: C.green }),
    ]),
  );

  // 12. Review loop
  standardSlide(
    pres,
    12,
    "Step 4",
    "검토 루프는 AI 산출물의 품질 안전벨트입니다",
    "승인과 반려 기준이 없으면 자동화는 검토되지 않은 초안 생산에 머뭅니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1)], columnGap: 30, alignItems: "center" }, [
      column({ width: fillSize, height: hug, gap: 12, align: "center" }, [
        processStep("A", "구현", "AI가 초안 작성", C.orange),
        arrow(C.orange),
        processStep("B", "테스트", "기준 충족 확인", C.blue),
        arrow(C.orange),
        processStep("C", "리뷰", "사람 또는 리뷰어 점검", C.green),
        arrow(C.orange),
        processStep("D", "승인/반려", "수정 루프 결정", C.red),
      ]),
      column({ width: fillSize, height: hug, gap: 18 }, [
        tx("반려 사유를 버리지 마십시오", s({ fontSize: 38, bold: true, color: C.ink })),
        bulletList([
          "반려는 실패가 아니라 품질 신호입니다.",
          "재작업 명령에는 원인과 수정 기준이 있어야 합니다.",
          "반복되는 오류는 다음 명세의 체크리스트가 됩니다.",
        ]),
      ]),
    ]),
  );

  // 13. Security
  standardSlide(
    pres,
    13,
    "Step 5",
    "보안 검토는 기능 검토와 다른 게이트입니다",
    "개인정보, 권한, 외부 연동, 삭제 작업은 별도의 CSO 관점으로 봐야 합니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1)], rows: [auto, auto, auto], columnGap: 20, rowGap: 18 }, [
      miniCard("개인정보", "주민번호, 연락처, 민원 내용, 내부 식별자를 비식별 처리했는가?", C.red, C.red2),
      miniCard("권한", "AI가 파일 삭제, DB 변경, 배포, 메일 발송 권한을 갖는가?", C.orange, C.orange2),
      miniCard("외부 전송", "내부 자료가 외부 모델, 플러그인, 저장소로 나가는가?", C.red, C.red2),
      miniCard("비밀 정보", "API Key, 접속 정보, 계약 자료가 프롬프트에 포함되는가?", C.slate, "#E7ECF0"),
      miniCard("감사 기록", "누가 승인했고 무엇을 근거로 반려·승인했는가?", C.blue, C.blue2),
      miniCard("복구 가능성", "오류 발생 시 되돌릴 수 있는 백업과 절차가 있는가?", C.green, C.green2),
    ]),
  );

  // 14. Context compression
  standardSlide(
    pres,
    14,
    "위험 구간",
    "긴 작업에서는 AI의 맥락이 압축되며 조건이 사라질 수 있습니다",
    "중요한 요구사항은 대화창 안에만 두지 말고 문서와 체크리스트로 고정해야 합니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1.15), fr(0.85)], columnGap: 34, alignItems: "center" }, [
      column({ width: fillSize, height: hug, gap: 16 }, [
        tx("맥락 손실이 자주 일어나는 지점", s({ fontSize: 34, bold: true, color: C.ink })),
        bulletList(["슬라이드, 보고서, 코드처럼 장시간 이어지는 작업", "중간에 요구사항이 여러 번 바뀐 작업", "예외 조건과 금지사항이 많은 작업", "서브에이전트가 여러 갈래로 병렬 작업한 경우"]),
      ]),
      panel(
        { width: fillSize, height: fixed(430), padding: { x: 28, y: 28 }, fill: C.paper2, line: stroke(`1.5px ${C.orange}`), borderRadius: 8 },
        column({ width: fillSize, height: hug, gap: 16 }, [
          tx("대응 방법", s({ fontSize: 32, bold: true, color: C.orange })),
          tx("핵심 결정, 금지사항, 승인 기준, 변경 이력을 별도 문서에 적고 다음 단계 전에 다시 읽게 합니다.", s({ fontSize: 28, color: C.ink, lineSpacing: 1.18 })),
          rule({ width: fillSize, stroke: C.faint, weight: 2 }),
          tx("대화 기록은 증거가 될 수 있지만, 업무 기준서의 대체물은 아닙니다.", ST.small, { style: { fontSize: 21 } }),
        ]),
      ),
    ]),
  );

  // 15. Compound engineering
  standardSlide(
    pres,
    15,
    "복합 엔지니어링",
    "실패를 문서화하면 다음 작업의 품질 자산이 됩니다",
    "좋은 하네스는 한 번의 성공보다 반복되는 실수를 줄이는 구조를 만듭니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fixed(90), fr(1)], columnGap: 20, alignItems: "center" }, [
      column({ width: fillSize, height: hug, gap: 16 }, [
        tx("작업 중", s({ fontSize: 34, bold: true, color: C.blue })),
        bulletList(["오류 발생", "리뷰 반려", "보안 지적", "사용자 피드백"], { markerColor: C.blue }),
      ]),
      column({ width: fillSize, height: hug, gap: 8, align: "center" }, [arrow(C.orange), arrow(C.orange), arrow(C.orange)]),
      column({ width: fillSize, height: hug, gap: 16 }, [
        tx("다음 작업 전", s({ fontSize: 34, bold: true, color: C.green })),
        bulletList(["Lessons Learned 확인", "금지사항 업데이트", "체크리스트 재사용", "명세 템플릿 개선"], { markerColor: C.green }),
      ]),
    ]),
  );

  // 16. Risk-based matrix
  standardSlide(
    pres,
    16,
    "위험도별 적용",
    "모든 업무에 같은 무게의 하네스를 씌우지 마십시오",
    "업무 영향과 데이터 민감도에 따라 절차의 강도를 조정해야 합니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1), fr(1)], columnGap: 20, alignItems: "stretch" }, [
      miniCard("경량 하네스", "공개자료 요약, 내부 아이디어 정리\n\n필수: 목적, 출처, 사람 검토", C.green, C.green2),
      miniCard("표준 하네스", "민원 답변 초안, 보고서 초안, 업무 자동화\n\n필수: Spec, 리뷰, 변경 기록", C.blue, C.blue2),
      miniCard("고위험 하네스", "개인정보, DB 변경, 외부 발송, 예산·계약\n\n필수: 보안 게이트, 승인 로그, 복구 계획", C.red, C.red2),
    ]),
  );

  // 17. Training exercise
  standardSlide(
    pres,
    17,
    "실습 과제",
    "민원 FAQ 초안 작성 하네스를 설계해 봅니다",
    "이 실습은 Time Manager MVP 사례처럼 작은 기능을 끝까지 통제된 파이프라인으로 통과시키는 연습입니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(0.9), fr(1.1)], columnGap: 30, alignItems: "center" }, [
      panel(
        { width: fillSize, height: fixed(490), padding: { x: 28, y: 28 }, fill: C.ink, line: stroke(`1px ${C.ink}`), borderRadius: 8 },
        column({ width: fillSize, height: hug, gap: 16 }, [
          tx("상황", ST.whiteTitle, { style: { fontSize: 38 } }),
          tx("부서 홈페이지의 공개 고시문을 바탕으로 시민용 FAQ 초안을 만들고 싶습니다.", ST.whiteBody),
          rule({ width: fixed(260), stroke: C.orange, weight: 5 }),
          tx("단, 개인정보와 법률 단정 표현은 피해야 합니다.", ST.whiteBody, { style: { fontSize: 25 } }),
        ]),
      ),
      column({ width: fillSize, height: hug, gap: 14 }, [
        tx("작성해야 할 산출물", s({ fontSize: 34, bold: true, color: C.ink })),
        bulletList([
          "Spec: 목적, 대상 시민, 입력자료, 금지 표현",
          "검토 기준: 근거 표시, 쉬운 말, 불확실성 표기",
          "보안 기준: 개인정보 입력 금지, 내부문서 제외",
          "승인 기준: 담당자 검토 후 게시 가능",
          "Lessons Learned: 반려 사유와 개선 문장 기록",
        ]),
      ]),
    ]),
  );

  // 18. Checklist
  standardSlide(
    pres,
    18,
    "현장 체크리스트",
    "AI에게 맡기기 전, 실행 중, 완료 후 확인할 것",
    "이 체크리스트는 팀의 업무 특성에 맞게 계속 바꾸는 살아있는 문서여야 합니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1), fr(1)], columnGap: 20, alignItems: "stretch" }, [
      miniCard("시작 전", "목적이 분명한가?\n사용해도 되는 자료인가?\n금지사항이 적혀 있는가?\n승인 기준이 있는가?", C.blue, C.blue2),
      miniCard("실행 중", "역할과 파일 범위가 분리됐는가?\n중간 결정이 기록되는가?\n테스트와 리뷰가 진행되는가?", C.orange, C.orange2),
      miniCard("완료 후", "사람이 최종 승인했는가?\n보안 점검이 남았는가?\n반려·수정 사유가 문서화됐는가?", C.green, C.green2),
    ]),
  );

  // 19. Evaluation
  standardSlide(
    pres,
    19,
    "교육 평가",
    "평가는 프롬프트 문장보다 통제 설계 능력을 봅니다",
    "수강자가 AI를 얼마나 잘 조종했는지가 아니라, 위험과 책임을 얼마나 잘 구조화했는지를 확인합니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1), fr(1)], rows: [auto, auto], columnGap: 22, rowGap: 20, alignItems: "stretch" }, [
      miniCard("개념 이해", "하네스를 명세, 제약, 검토, 기록으로 설명할 수 있는가?", C.blue, C.white),
      miniCard("명세 작성", "모호한 요청을 목표, 입력, 예외, 승인 기준이 있는 Spec으로 바꾸는가?", C.green, C.white),
      miniCard("리스크 식별", "개인정보, 권한, 오류, 기록 누락 위험을 찾아내는가?", C.red, C.white),
      miniCard("프로세스 선택", "업무 위험도에 맞춰 경량, 표준, 고위험 하네스를 고르는가?", C.orange, C.white),
    ]),
  );

  // 20. Closing
  standardSlide(
    pres,
    20,
    "마무리",
    "당신은 더 이상 단순 사용자가 아니라 AI 업무팀의 Tech Lead입니다",
    "좋은 하네스는 AI가 잘못된 방향으로 빠르게 달리는 것을 막고, 사람이 책임질 수 있는 결과만 통과시킵니다.",
    grid({ width: fillSize, height: grow(1), columns: [fr(1.08), fr(0.92)], columnGap: 34, alignItems: "center" }, [
      column({ width: fillSize, height: hug, gap: 18 }, [
        tx("기억할 세 문장", s({ fontSize: 36, bold: true, color: C.ink })),
        bulletList([
          "프롬프트는 요청이고, 하네스는 업무 시스템입니다.",
          "코드나 초안보다 명세와 승인 기준이 먼저입니다.",
          "AI의 속도는 사람의 책임 게이트 안에서만 가치가 있습니다.",
        ]),
      ]),
      panel(
        { width: fillSize, height: fixed(450), padding: { x: 30, y: 30 }, fill: C.paper2, line: stroke(`1.5px ${C.faint}`), borderRadius: 8 },
        column({ width: fillSize, height: hug, gap: 16 }, [
          tx("원자료", s({ fontSize: 30, bold: true, color: C.blue })),
          tx("Harness_Engineering_Mastery.pdf\nMastering_Harness_Engineering.pdf", s({ fontSize: 24, color: C.ink, lineSpacing: 1.2 })),
          rule({ width: fillSize, stroke: C.faint, weight: 2 }),
          tx("본 교육자료는 두 PDF의 핵심 메시지를 공공부문 AI 활용 절차 교육용으로 재구성했습니다.", ST.small, {
            style: { fontSize: 20 },
          }),
        ]),
      ),
    ]),
  );

  return pres;
}

async function renderDeck(pres, dir, prefix) {
  fs.mkdirSync(dir, { recursive: true });
  const paths = [];
  for (let i = 0; i < pres.slides.items.length; i += 1) {
    const canvas = new Canvas(W, H);
    const ctx = canvas.getContext("2d");
    await drawSlideToCtx(
      pres.slides.items[i],
      pres,
      ctx,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      { clearBeforeDraw: true },
    );
    const file = path.join(dir, `${prefix}_${String(i + 1).padStart(2, "0")}.png`);
    await canvas.toFile(file);
    paths.push(file);
  }
  return paths;
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
  fs.writeFileSync(
    qaPath,
    JSON.stringify({ checkedAt: new Date().toISOString(), issueCount: issues.length, issues }, null, 2),
    "utf8",
  );
  pptxParityChecked = true;
} catch (err) {
  fs.writeFileSync(
    qaPath,
    JSON.stringify({ checkedAt: new Date().toISOString(), pptxParityChecked: false, error: String(err?.stack ?? err) }, null, 2),
    "utf8",
  );
}

const previewSource = imported ?? pres;
const previewPaths = await renderDeck(previewSource, PREVIEW_DIR, deckName);

console.log(
  JSON.stringify(
    {
      outPptx,
      downloadsPptx,
      previewDir: PREVIEW_DIR,
      previewCount: previewPaths.length,
      inspectPath,
      qaPath,
      pptxParityChecked,
    },
    null,
    2,
  ),
);
