import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import DeckShell from "../components/DeckShell";
import { glossary, glossaryCategoryOrder, glossaryCategoryStyles } from "../data/glossary";

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    if (!lower) return glossary;
    return glossary.filter((item) => [item.term, item.easy, item.analogy, item.description, item.beginner, item.example, item.caution, item.category].join(" ").toLowerCase().includes(lower));
  }, [query]);
  const grouped = useMemo(
    () =>
      glossaryCategoryOrder
        .map((category) => ({
          category,
          items: filtered.filter((item) => item.category === category),
        }))
        .filter((group) => group.items.length > 0),
    [filtered],
  );

  return (
    <DeckShell mode="glossary" progress={100}>
      <div className="mb-5 glass-card rounded-[30px] p-6">
        <h1 className="text-4xl font-black text-slate-950">용어집</h1>
        <p className="mt-2 text-lg font-bold text-slate-600">GitHub 용어, 프로그램/사이트, AI 협업 용어, 기술/설정으로 묶어서 읽습니다.</p>
        <div className="mt-5 flex items-center gap-3 rounded-[22px] bg-white px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-violet-600" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-lg font-semibold outline-none" placeholder="Codex, API, MCP, 출입증..." />
        </div>
      </div>
      <div className="space-y-5">
        {grouped.map((group) => {
          const style = glossaryCategoryStyles[group.category];
          return (
            <section key={group.category} className={`rounded-[30px] border p-5 shadow-card ${style.shell}`}>
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${style.dot}`} />
                    <h2 className="text-2xl font-black text-slate-950">{group.category}</h2>
                  </div>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{style.description}</p>
                </div>
                <span className={`rounded-full px-4 py-2 text-sm font-black ${style.badge}`}>{group.items.length}개 용어</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item) => (
                  <article key={item.term} className="group rounded-[24px] border border-white/80 bg-white/88 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
                    <div className="mb-4 flex items-center justify-between">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${style.chip}`}>{item.category}</span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500">행정업무 비유</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-950">{item.term}</h3>
                    <p className="mt-3 text-xl font-black text-violet-700">{item.easy}</p>
                    <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-base font-bold leading-7 text-slate-700">{item.analogy}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-500">{item.description}</p>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-xs font-black text-slate-500">처음 이해하기</p>
                        <p className="mt-1 text-sm leading-6 text-slate-700">{item.beginner}</p>
                      </div>
                      <div className="rounded-2xl bg-blue-50 px-4 py-3">
                        <p className="text-xs font-black text-blue-600">업무 예시</p>
                        <p className="mt-1 text-sm leading-6 text-blue-900">{item.example}</p>
                      </div>
                      <div className="rounded-2xl bg-amber-50 px-4 py-3">
                        <p className="text-xs font-black text-amber-700">주의점</p>
                        <p className="mt-1 text-sm leading-6 text-amber-900">{item.caution}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </DeckShell>
  );
}
