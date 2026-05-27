import { useMemo, useState } from "react";
import { ClipboardCopy, Wand2 } from "lucide-react";
import { promptExamples } from "../data/prompts";

export default function HarnessPromptLab() {
  const [input, setInput] = useState("학교 업무용 질문·투표 보드를 만들어줘.");
  const template = useMemo(() => {
    const example = promptExamples[0];
    return `역할: ${example.role}

업무배경: ${input || example.context}

기능범위: ${example.scope}

제약조건: ${example.constraints}

테스트 기준: ${example.tests}

보안 기준: ${example.security}

작업 순서: 먼저 docs/SPEC.md와 구현 계획을 작성하고, 그 다음 React 컴포넌트를 구현한 뒤 npm run build로 검증해줘.`;
  }, [input]);

  async function copyPrompt() {
    await navigator.clipboard?.writeText(template);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="glass-card rounded-[28px] p-5">
        <div className="mb-4 flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-violet-600" />
          <h2 className="text-xl font-black text-slate-900">하네스 프롬프트 변환 실습</h2>
        </div>
        <label className="text-sm font-black text-slate-700" htmlFor="bad-prompt">
          만들고 싶은 업무도구를 한 문장으로 적어보세요
        </label>
        <textarea
          id="bad-prompt"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="mt-3 min-h-36 w-full rounded-2xl border border-slate-200 bg-white p-4 text-base font-semibold text-slate-800 outline-none ring-violet-200 focus:ring-4"
          placeholder="예: 연수 질문을 모으고 투표하는 게시판"
        />
        <p className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
          실제 학생, 학부모, 교직원 개인정보는 입력하지 마세요.
        </p>
      </div>
      <div className="glass-card rounded-[28px] p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-lg font-black text-slate-900">생성된 하네스 프롬프트</h3>
          <button
            type="button"
            onClick={copyPrompt}
            className="flex items-center gap-2 rounded-2xl bg-violet-600 px-4 py-2 text-sm font-black text-white shadow-glow"
          >
            <ClipboardCopy className="h-4 w-4" />
            복사
          </button>
        </div>
        <pre className="scrollbar-soft max-h-[520px] overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-emerald-100">
          {template}
        </pre>
      </div>
    </div>
  );
}
