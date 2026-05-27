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
