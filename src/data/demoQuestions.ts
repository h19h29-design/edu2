export type TrainingAttachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
};

export type TrainingReply = {
  id: string;
  content: string;
  createdAt: string;
};

export type TrainingQuestion = {
  id: string;
  question: string;
  author: string;
  votes: number;
  dislikes?: number;
  answered: boolean;
  createdAt: string;
  attachments?: TrainingAttachment[];
  replies?: TrainingReply[];
};

export const demoQuestions: TrainingQuestion[] = [
  {
    id: "q-1",
    question: "Codex를 실제 업무에 적용할 때 가장 먼저 만들어 볼 만한 예제는 무엇인가요?",
    author: "익명",
    votes: 28,
    dislikes: 1,
    answered: false,
    createdAt: "2026-05-23T09:00:00.000Z",
    replies: [],
  },
  {
    id: "q-2",
    question: "외부 서비스 연결 없이도 실습이 가능한 이유가 궁금합니다.",
    author: "익명",
    votes: 19,
    dislikes: 0,
    answered: false,
    createdAt: "2026-05-23T09:04:00.000Z",
    replies: [],
  },
  {
    id: "q-3",
    question: "GitHub와 Vercel은 어떤 순서로 연결하면 좋나요?",
    author: "익명",
    votes: 12,
    dislikes: 0,
    answered: true,
    createdAt: "2026-05-23T09:08:00.000Z",
    replies: [
      {
        id: "r-3-1",
        content: "GitHub에 소스코드를 올린 뒤 Vercel에서 해당 저장소를 연결하면 됩니다. 먼저 로컬에서 빌드가 통과하는지 확인하세요.",
        createdAt: "2026-05-23T09:12:00.000Z",
      },
    ],
  },
];
