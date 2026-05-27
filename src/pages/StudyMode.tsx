import { ListChecks } from "lucide-react";
import { useMemo } from "react";
import DeckShell from "../components/DeckShell";
import PresenterNotes from "../components/PresenterNotes";
import { chapters, slides } from "../data/slides";

export default function StudyMode() {
  const grouped = useMemo(
    () =>
      chapters.map((chapter) => ({
        chapter,
        slides: slides.filter((slide) => slide.chapter === chapter),
      })),
    [],
  );

  return (
    <DeckShell mode="study" progress={100}>
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="glass-card sticky top-28 h-fit rounded-[28px] p-5">
          <p className="text-xl font-black text-slate-950">챕터 목차</p>
          <div className="mt-4 space-y-2">
            {slides.map((slide) => (
              <a key={slide.id} href={`#${slide.id}`} className="block rounded-2xl px-3 py-2 text-sm font-bold text-slate-600 hover:bg-white hover:text-violet-700">
                {slide.number}. {slide.title}
              </a>
            ))}
          </div>
        </aside>
        <div className="space-y-7">
          {grouped.map((group) => (
            <section key={group.chapter} className="space-y-4">
              <div className="flex items-center gap-3">
                <ListChecks className="h-6 w-6 text-violet-600" />
                <h1 className="text-3xl font-black text-slate-950">{group.chapter}</h1>
              </div>
              {group.slides.map((slide) => (
                <article id={slide.id} key={slide.id} className="glass-card scroll-mt-28 rounded-[30px] p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-black text-violet-700">{slide.number}</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-black text-blue-700">{slide.chapter}</span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-950">{slide.title}</h2>
                  {slide.subtitle ? <p className="mt-2 text-lg font-bold text-slate-600">{slide.subtitle}</p> : null}
                  <p className="mt-4 rounded-[22px] bg-white/82 px-5 py-4 text-lg font-black leading-8 text-violet-900">{slide.coreMessage}</p>
                  {slide.bullets?.length ? (
                    <ul className="mt-4 grid gap-3 md:grid-cols-3">
                      {slide.bullets.map((bullet) => (
                        <li key={bullet} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-4">
                    <PresenterNotes slide={slide} />
                  </div>
                </article>
              ))}
            </section>
          ))}
        </div>
      </div>
    </DeckShell>
  );
}
