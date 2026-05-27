# AGENT ANIMATION PLAN

## AgentOrchestrator 설계

`AgentOrchestrator`는 현재 슬라이드의 `agents` 데이터를 받아 활성 에이전트를 표시한다. 실제 외부 에이전트를 호출하지 않고, 교육용 시뮬레이션으로 상태와 진행률만 보여준다.

## 에이전트 목록

- Main Agent: 전체 방향 결정, 최종 통합
- PM Agent: 요구사항 정리, Spec 작성
- UI/UX Agent: 화면 설계, 사용자 경험 검토
- Dev Agent: 코드 구현
- Review Agent: 오류 검토, 테스트 기준 확인
- Security Agent: 개인정보/API Key 점검
- Deploy Agent: 배포 준비, URL 공개 흐름 설명
- Research Agent: 사례/자료 정리
- Glossary Agent: 개발 용어를 행정업무 비유로 변환
- Tool Agent: MCP/API/외부 도구 연결 설명
- Database Agent: Supabase/localStorage 차이 설명

## 상태 정의

- 대기 중
- 호출됨
- 분석 중
- 설계 중
- 구현 중
- 검토 중
- 보안 점검 중
- 완료

## 슬라이드별 호출 원칙

- 오프닝: Main Agent
- 사례/도메인: Research Agent, PM Agent
- 용어/MCP/API/Skill: Glossary Agent, Tool Agent
- Node.js/Env: Tool Agent, Security Agent
- 하네스/프롬프트: PM, UI, Dev, Review, Security
- GitHub/Vercel/Supabase: Dev, Review, Deploy, Database, Security
- 실습/보안/마무리: 전체 개발팀 시뮬레이션

## 3.5 슬라이드 상세

`codex-why`에서는 `CliCodingAnimation`과 `CodexWorkspaceAnimation`을 함께 보여준다.

- CLI: `codex`, `/goal`, 파일 생성, 테스트, `npm run build`, Build passed
- 작업공간: 파일 트리, 사용자 요청, Codex 응답, 계획 카드, diff preview
- 에이전트: PM, UI, Dev, Review, Security가 순서대로 산출물을 만든다.
