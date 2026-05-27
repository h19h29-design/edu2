import { RefreshCw, Send, ShieldCheck, Trash2, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAdminUnlock } from "../hooks/useAdminUnlock";

const STORAGE_KEY = "codex-training-intro-board";

const workplaces = ["본청", "지역청", "직속기관", "학교", "기타"] as const;
const experiences = ["상", "중", "하"] as const;
const plans = ["무료", "플러스", "프로"] as const;

type Workplace = (typeof workplaces)[number];
type Experience = (typeof experiences)[number];
type GptPlan = (typeof plans)[number];

type IntroEntry = {
  id: string;
  nickname: string;
  workplace: Workplace;
  experience: Experience;
  plan: GptPlan;
  createdAt: string;
};

const demoEntries: IntroEntry[] = [
  { id: "intro-1", nickname: "업무메이커", workplace: "학교", experience: "중", plan: "플러스", createdAt: "2026-05-26T09:00:00.000Z" },
  { id: "intro-2", nickname: "하네스러너", workplace: "지역청", experience: "하", plan: "무료", createdAt: "2026-05-26T09:03:00.000Z" },
  { id: "intro-3", nickname: "자동화연습생", workplace: "본청", experience: "상", plan: "프로", createdAt: "2026-05-26T09:06:00.000Z" },
];

function loadEntries() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return demoEntries;
    const parsed = JSON.parse(stored) as IntroEntry[];
    return Array.isArray(parsed) ? parsed : demoEntries;
  } catch {
    return demoEntries;
  }
}

function countBy<T extends string>(entries: IntroEntry[], options: readonly T[], getValue: (entry: IntroEntry) => T) {
  return options.map((option) => ({
    label: option,
    count: entries.filter((entry) => getValue(entry) === option).length,
  }));
}

function ChartGroup({ title, rows, tone }: { title: string; rows: { label: string; count: number }[]; tone: "violet" | "blue" | "emerald" }) {
  const max = Math.max(1, ...rows.map((row) => row.count));
  const color = tone === "violet" ? "bg-violet-500" : tone === "blue" ? "bg-blue-500" : "bg-emerald-500";
  const labelColor = tone === "violet" ? "text-violet-700" : tone === "blue" ? "text-blue-700" : "text-emerald-700";

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white/88 p-4 shadow-sm">
      <p className={`mb-3 text-sm font-black ${labelColor}`}>{title}</p>
      <div className="space-y-3">
        {rows.map((row) => {
          const width = `${Math.max(8, Math.round((row.count / max) * 100))}%`;
          return (
            <div key={row.label}>
              <div className="mb-1 flex items-center justify-between text-xs font-black text-slate-600">
                <span>{row.label}</span>
                <span>{row.count}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${color}`} style={{ width }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TrainingIntroBoard() {
  const { isAdmin, lockAdmin } = useAdminUnlock();
  const [entries, setEntries] = useState<IntroEntry[]>(loadEntries);
  const [nickname, setNickname] = useState("");
  const [workplace, setWorkplace] = useState<Workplace>("학교");
  const [experience, setExperience] = useState<Experience>("하");
  const [plan, setPlan] = useState<GptPlan>("무료");
  const [storageMessage, setStorageMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      setStorageMessage(`저장됨 ${new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`);
    } catch {
      setStorageMessage("저장 실패: 브라우저 저장 공간이 부족합니다.");
    }
  }, [entries]);

  const dashboard = useMemo(
    () => ({
      workplace: countBy(entries, workplaces, (entry) => entry.workplace),
      experience: countBy(entries, experiences, (entry) => entry.experience),
      plan: countBy(entries, plans, (entry) => entry.plan),
    }),
    [entries],
  );

  function addEntry() {
    const name = nickname.trim();
    if (!name) return;
    setEntries((current) => [
      {
        id: `intro-${Date.now()}`,
        nickname: name,
        workplace,
        experience,
        plan,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
    setNickname("");
  }

  function deleteEntry(id: string) {
    if (!isAdmin) return;
    setEntries((current) => current.filter((entry) => entry.id !== id));
  }

  function resetDemo() {
    setEntries(demoEntries);
    setNickname("");
    setWorkplace("학교");
    setExperience("하");
    setPlan("무료");
  }

  return (
    <section id="intro-board" className="glass-card rounded-[30px] p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-black text-slate-950">자기소개 게시판</h2>
            {isAdmin ? (
              <span className="inline-flex items-center gap-1 rounded-2xl bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                관리 모드
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm font-bold text-slate-600">닉네임과 선택값만 받습니다. 실제 이름이나 개인정보는 입력하지 마세요.</p>
          {storageMessage ? (
            <p className={`mt-1 text-xs font-black ${storageMessage.startsWith("저장 실패") ? "text-rose-600" : "text-emerald-600"}`}>{storageMessage}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={resetDemo} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-600">
            <RefreshCw className="h-4 w-4" />
            초기화
          </button>
          {isAdmin ? (
            <button type="button" onClick={lockAdmin} className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-black text-white">
              관리 종료
            </button>
          ) : null}
        </div>
      </div>

      <div className="mb-5 grid gap-4 lg:grid-cols-[0.85fr_1fr_1fr_1fr]">
        <div className="rounded-[24px] border border-violet-200 bg-violet-50/80 p-4">
          <p className="text-sm font-black text-violet-700">참여 현황</p>
          <p className="mt-4 text-5xl font-black text-slate-950">{entries.length}</p>
          <p className="mt-2 text-sm font-bold text-slate-500">명 참여</p>
        </div>
        <ChartGroup title="근무지" rows={dashboard.workplace} tone="blue" />
        <ChartGroup title="바이브코딩 경험" rows={dashboard.experience} tone="violet" />
        <ChartGroup title="GPT 요금제" rows={dashboard.plan} tone="emerald" />
      </div>

      <div className="grid gap-3 rounded-[24px] bg-white/72 p-4 lg:grid-cols-[1fr_180px_180px_180px_auto]">
        <input
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addEntry();
          }}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold outline-none ring-violet-200 focus:ring-4"
          placeholder="닉네임"
        />
        <select value={workplace} onChange={(event) => setWorkplace(event.target.value as Workplace)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black outline-none ring-violet-200 focus:ring-4">
          {workplaces.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select value={experience} onChange={(event) => setExperience(event.target.value as Experience)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black outline-none ring-violet-200 focus:ring-4">
          {experiences.map((item) => (
            <option key={item} value={item}>
              경험 {item}
            </option>
          ))}
        </select>
        <select value={plan} onChange={(event) => setPlan(event.target.value as GptPlan)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black outline-none ring-violet-200 focus:ring-4">
          {plans.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button type="button" onClick={addEntry} disabled={!nickname.trim()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300">
          <Send className="h-4 w-4" />
          등록
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {entries.map((entry) => (
          <article key={entry.id} className="rounded-[24px] border border-slate-200 bg-white/86 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <UserRound className="h-5 w-5" />
                </div>
                <p className="text-lg font-black text-slate-950">{entry.nickname}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-black">
                  <span className="rounded-2xl bg-blue-100 px-3 py-1 text-blue-700">{entry.workplace}</span>
                  <span className="rounded-2xl bg-violet-100 px-3 py-1 text-violet-700">경험 {entry.experience}</span>
                  <span className="rounded-2xl bg-emerald-100 px-3 py-1 text-emerald-700">{entry.plan}</span>
                </div>
                <p className="mt-3 text-xs font-bold text-slate-400">{new Date(entry.createdAt).toLocaleString("ko-KR")}</p>
              </div>
              {isAdmin ? (
                <button type="button" onClick={() => deleteEntry(entry.id)} className="inline-flex items-center gap-1 rounded-2xl bg-slate-900 px-3 py-2 text-xs font-black text-white">
                  <Trash2 className="h-4 w-4" />
                  삭제
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
