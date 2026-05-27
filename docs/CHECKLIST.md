# CHECKLIST

## 구현 체크리스트

- [x] Vite React TypeScript 프로젝트 구성
- [x] Tailwind CSS 구성
- [x] `motion`, `lucide-react`, `canvas-confetti`, `clsx` 사용
- [x] 원본 PPTX를 `docs/source/`에 복사
- [x] 디자인 레퍼런스 이미지를 `public/assets/`에 보관
- [x] 슬라이드 데이터를 `src/data/slides.ts`로 분리
- [x] 신규 3.5 슬라이드 추가

## 슬라이드별 체크리스트

- [x] 원본 20장 흐름 반영
- [x] 3번과 4번 사이 `왜 Codex를 써야 하는가?` 삽입
- [x] 14번 뒤 `Node.js와 Env는 무엇인가` 삽입
- [x] MCP, API, Skill, GitHub, Vercel, Supabase 애니메이션 구현
- [x] 하네스 프롬프트 변환 시각화 구현
- [x] 서브에이전트/Worktree 병렬작업 시뮬레이션 구현
- [x] 보안 감사 및 CSO PASS 장면 구현
- [x] 마무리 Tech Lead 장면 구현

## 애니메이션 체크리스트

- [x] `AgentOrchestrator`
- [x] `AgentCallSequence`
- [x] `CliCodingAnimation`
- [x] `CodexWorkspaceAnimation`
- [x] `McpHub`
- [x] `ApiFlow`
- [x] `SkillManualAnimation`
- [x] `GithubFlow`
- [x] `VercelDeployAnimation`
- [x] `SupabaseExpansionAnimation`
- [x] `PromptToHarnessAnimation`
- [x] `PipelineTimeline`
- [x] `WorktreeSimulation`
- [x] `SecuritySweepAnimation`
- [x] `ClosingTechLeadAnimation`

## 데모 기능 체크리스트

- [x] 질문 등록
- [x] 파일 첨부
- [x] 작성자 선택 입력 및 익명 기본값
- [x] 빈 질문 등록 방지
- [x] 공감 투표
- [x] 답변 완료 체크
- [x] 인기순/최신순 정렬
- [x] CSV 다운로드
- [x] CSV에 첨부 파일명 포함
- [x] 더미 데이터 초기화
- [x] localStorage 저장
- [x] 개인정보 입력 금지 안내

## 용어집 체크리스트

- [x] 카테고리별 묶음
- [x] 비슷한 카테고리끼리 색상 구분
- [x] 초보자용 상세 설명
- [x] 업무 예시
- [x] 주의점

## 보안 체크리스트

- [x] 실제 개인정보 없음
- [x] 전화번호/주민번호/건강정보 없음
- [x] API Key 없음
- [x] 더미 데이터 사용
- [x] 외부 서비스는 애니메이션 설명으로만 처리
- [x] 사람이 최종 검토해야 한다는 메시지 포함

## 빌드 체크리스트

- [x] `npm run build` 성공
- [x] `dist/` 생성 확인
- [x] PowerShell 실행 흐름 문서화
