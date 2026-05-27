import DeckShell from "../components/DeckShell";
import HarnessPromptLab from "../components/HarnessPromptLab";
import PromptMemoBoard from "../components/PromptMemoBoard";
import PromptToHarnessAnimation from "../components/PromptToHarnessAnimation";

export default function PromptLabPage() {
  return (
    <DeckShell mode="prompt" progress={100}>
      <div className="space-y-5">
        <div className="glass-card rounded-[30px] p-6">
          <h1 className="text-4xl font-black text-slate-950">하네스 프롬프트 변환 실습</h1>
          <p className="mt-2 text-lg font-bold text-slate-600">나쁜 프롬프트를 역할, 배경, 범위, 제약, 테스트, 보안 기준으로 다시 조립합니다.</p>
        </div>
        <PromptToHarnessAnimation />
        <HarnessPromptLab />
        <PromptMemoBoard />
      </div>
    </DeckShell>
  );
}
