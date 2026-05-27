export type PromptMemo = {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  updatedAt: string;
};

export const defaultPromptMemos: PromptMemo[] = [
  {
    id: "memo-question-board",
    title: "연수 질문·투표 보드 만들기",
    category: "실습",
    description: "질문 등록, 좋아요/싫어요, 파일첨부, CSV 다운로드까지 포함한 기본 하네스 프롬프트입니다.",
    updatedAt: "2026-05-26T09:00:00.000Z",
    content: `너는 PM Agent, UI/UX Agent, Dev Agent, Review Agent, Security Agent 역할을 순서대로 수행한다.

목표:
학교 연수에서 사용할 질문·투표 보드를 React + TypeScript로 만든다.

기능:
- 질문 등록
- 작성자명 선택 입력, 기본값은 익명
- 이미지/파일 첨부
- 좋아요/싫어요 버튼
- 인기순/최신순 정렬
- 답변 완료 체크
- CSV 다운로드
- localStorage 저장

제약:
- 실제 학생, 학부모, 교직원 개인정보를 입력하지 않는다.
- 외부 API Key나 비밀번호를 코드에 넣지 않는다.
- 오프라인 발표 환경에서도 동작해야 한다.

검수:
- 빈 질문은 등록되지 않아야 한다.
- 좋아요/싫어요 숫자가 각각 증가해야 한다.
- 첨부 파일명이 목록에 보여야 한다.
- CSV 다운로드가 동작해야 한다.
- npm run build를 통과해야 한다.`,
  },
  {
    id: "memo-school-tool",
    title: "학교 업무도구 기획 요청",
    category: "기획",
    description: "아이디어를 SPEC, 화면 구성, 구현 계획으로 나누어 달라고 요청하는 프롬프트입니다.",
    updatedAt: "2026-05-26T09:10:00.000Z",
    content: `학교 행정업무를 줄이는 웹도구를 만들고 싶다.

먼저 바로 코딩하지 말고 아래 순서로 진행해줘.

1. PM Agent 관점에서 문제 정의와 사용자 흐름을 정리한다.
2. UI/UX Agent 관점에서 화면 구성을 제안한다.
3. Dev Agent 관점에서 React 컴포넌트 구조와 데이터 구조를 설계한다.
4. Review Agent 관점에서 테스트 체크리스트를 만든다.
5. Security Agent 관점에서 개인정보, API Key, 외부 서비스 위험을 점검한다.

산출물:
- docs/SPEC.md
- docs/DESIGN.md
- 구현 계획
- 보안 체크리스트

주의:
실제 개인정보는 사용하지 말고 더미 데이터와 localStorage로 먼저 구현한다.`,
  },
];
