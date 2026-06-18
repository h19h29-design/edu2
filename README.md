# Codex 바이브 하네스 교육 웹앱

공무원 연수용 Codex 바이브 코딩 강의를 위한 React + TypeScript + Vite 기반 인터랙티브 HTML 웹앱입니다. 원본 PPT의 20장 흐름을 반영하고, 3번과 4번 사이에 신규 3.5 슬라이드 `왜 Codex를 써야 하는가?`, 14번 뒤에 `Node.js와 Env는 무엇인가` 슬라이드를 추가했습니다.

## 실행 방법

PowerShell 기준:

```powershell
cd D:\gpt\edu
npm install
npm install motion lucide-react canvas-confetti clsx
npm run dev
npm run build
```

## 경로

- `/`: 랜딩 페이지
- `/slide`: 발표 모드
- `/study`: 학습 모드
- `/glossary`: 용어집
- `/prompt`: 하네스 프롬프트 변환 실습
- `/demo`: 연수 질문·투표 보드 실습, 로컬 파일 첨부
- `/practice-mode`: 실습 HTML 실행 화면
- `/practice/reading-community-codex-practice-5-4mini.html`: 독서커뮤니티 실습 자료 원본 HTML

## 발표 방법

`/slide`에서 사용합니다.

- ArrowRight 또는 Space: 다음 슬라이드
- ArrowLeft: 이전 슬라이드
- F: 전체화면 토글
- M: 목차 토글
- N: 발표자 노트 토글
- D: 관련 데모 열기
- Esc: 패널 닫기

## 보안 주의사항

이 강의 데모는 교육용이며 실제 학생, 학부모, 교직원 개인정보를 입력하지 않습니다. 외부 서비스 연결 전에는 기관 내부 규정, 계정 소유권, 보존기간, 요금, 장애 가능성을 반드시 확인해야 합니다.

데모는 외부 API를 호출하지 않고 더미 데이터와 localStorage만 사용합니다. API Key, Token, 비밀번호를 코드에 넣지 않았습니다.

파일 첨부 기능도 교육용 로컬 데모입니다. 첨부 파일은 외부 서버로 업로드되지 않으며 브라우저 localStorage에 저장됩니다. 실제 개인정보나 민감정보가 포함된 파일은 첨부하지 않습니다.

## 강사화면 따라보기

강의 웹앱 전체는 Supabase Realtime Broadcast를 사용해 수강생이 원할 때만 강사 화면을 따라볼 수 있습니다. 일반 접속자는 자유롭게 자료를 보며, 우측 하단 `강사화면 보기` 버튼을 누른 수강생만 강사의 현재 페이지나 섹션으로 이동합니다. 독립 실습 HTML에도 같은 방식의 따라보기 버튼이 유지됩니다.

### 사용 방법

- 수강생 URL: `https://edu2.h19h19.com/`
- 강사용 URL: `https://edu2.h19h19.com/?room=codex-class`
- 독립 실습 HTML 강사용 URL: `https://edu2.h19h19.com/practice/reading-community-codex-practice-5-4mini.html?room=codex-class`
- 수강생은 우측 하단 `강사화면 보기` 버튼을 누르면 ON, 다시 누르면 `자유보기` 상태가 됩니다.
- 강사는 같은 URL에서 강사용 비공개 단축키로 관리자 패널을 열고 `강사모드 켜기`를 눌러야 송출을 시작합니다.
- 송출 데이터는 현재 `pageId`, `seq`, `timestamp` 중심으로 유지하며, `scrollY`는 대상 섹션을 찾지 못할 때만 fallback으로 사용합니다.

### Supabase 설정 방법

1. Supabase 프로젝트를 생성합니다.
2. Project URL과 client-side 공개 키를 확인합니다. 새 프로젝트는 publishable key, 기존 프로젝트는 legacy anon key를 사용할 수 있습니다.
3. `public/practice/realtime-config.js`의 `supabaseUrl`, `supabaseAnonKey` 값을 채웁니다.
4. `service_role` 또는 secret key는 절대 브라우저 코드에 넣지 않습니다.
5. Broadcast는 public channel로 사용하므로 개인정보를 payload에 넣지 않습니다. 현재 payload는 `type`, `room`, `pageId`, `seq`, `timestamp`, fallback용 `scrollY`만 보냅니다.
6. Vercel에 배포한 뒤 강사용 URL과 수강생 URL을 각각 다른 브라우저에서 열어 테스트합니다.

설정 파일 예시:

```js
window.EDU2_REALTIME_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_PUBLISHABLE_OR_ANON_KEY",
  defaultRoom: "codex-class",
};
```

Supabase 설정값이 비어 있거나 네트워크가 끊겨도 기존 HTML 자료와 복사 버튼은 계속 사용할 수 있습니다.

### 테스트 방법

1. `npm run dev` 실행 후 수강생 화면을 엽니다.
2. `http://localhost:5173/` 접속
3. 다른 브라우저나 탭에서 강사 화면을 엽니다.
4. `http://localhost:5173/?room=codex-class` 접속
5. 강사 화면에서 강사용 비공개 단축키로 관리자 패널을 열고 `강사모드 켜기`를 누릅니다.
6. 수강생 화면에서 `강사화면 보기`를 누른 뒤 강사 화면에서 페이지나 섹션을 이동합니다.
7. 수강생 화면에서 `자유보기`를 누르면 더 이상 이동하지 않는지 확인합니다.

## 주요 파일

- `docs/source/codex_vibe_harness_교육자료.pptx`
- `src/data/slides.ts`
- `src/components/SlideFrame.tsx`
- `src/components/CliCodingAnimation.tsx`
- `src/components/CodexWorkspaceAnimation.tsx`
- `src/components/TrainingQuestionBoard.tsx`
- `src/pages/SlideMode.tsx`
- `src/pages/StudyMode.tsx`

## 배포 방법

정적 배포는 다음 명령으로 생성한 `dist/` 폴더를 사용합니다.

```powershell
npm run build
```

Vercel, NAS, 기관 내부 정적 웹 서버에 올릴 수 있습니다. 다만 실제 외부 공개 전에는 개인정보, 계정 소유권, 기관 내부 규정, 요금, 장애 가능성을 확인해야 합니다.

## 배포 파일

- Vercel에 소스 프로젝트를 올릴 때는 이 프로젝트 루트 전체를 사용합니다. `vercel.json`이 `/slide`, `/study`, `/demo` 같은 직접 접속 경로를 `index.html`로 연결합니다.
- Netlify에 정적 배포할 때는 `dist/`를 업로드합니다. `public/_redirects`가 빌드 결과에 포함되어 SPA 라우팅을 처리합니다.
- NAS나 일반 정적 서버에서는 `dist/` 내용을 업로드하고, 직접 경로 접속이 필요하면 서버에서 모든 경로를 `index.html`로 돌리도록 설정합니다.
