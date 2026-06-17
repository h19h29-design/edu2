import { BookOpenCheck, Download, ExternalLink, ImageDown, LayoutPanelTop, MonitorPlay } from "lucide-react";
import DeckShell from "../components/DeckShell";
import {
  COMMUNITY_PRACTICE_HTML_FILE_NAME,
  COMMUNITY_PRACTICE_HTML_PATH,
  COMMUNITY_PRACTICE_IFRAME_TITLE,
  COMMUNITY_PRACTICE_IMAGE_DOWNLOAD_NAME,
  COMMUNITY_PRACTICE_IMAGE_PATH,
} from "../lib/practiceAssets";

type PracticeAction = {
  href: string;
  label: string;
  icon: typeof ExternalLink;
  className: string;
  download?: string;
  rel?: string;
  target?: "_blank";
};

// These arrays keep the page editable for future lecture-material swaps.
// To add/remove CTA buttons or guide bullets, edit the objects below first.
const practiceActions: PracticeAction[] = [
  {
    href: COMMUNITY_PRACTICE_HTML_PATH,
    label: "새 창으로 열기",
    icon: ExternalLink,
    className: "bg-slate-950",
    target: "_blank",
    rel: "noreferrer",
  },
  {
    href: COMMUNITY_PRACTICE_HTML_PATH,
    label: "HTML 다운로드",
    icon: Download,
    className: "bg-blue-600",
    download: COMMUNITY_PRACTICE_HTML_FILE_NAME,
  },
  {
    href: COMMUNITY_PRACTICE_IMAGE_PATH,
    label: "이미지 다운로드",
    icon: ImageDown,
    className: "bg-emerald-500",
    download: COMMUNITY_PRACTICE_IMAGE_DOWNLOAD_NAME,
  },
];

const practiceTips = [
  "방향키, Space, Home, End로 단계 페이지처럼 넘길 수 있습니다.",
  "전체화면 모드는 실습 HTML 안에서 별도로 동작합니다.",
  "실습 HTML 자체를 바꾸려면 public/practice 파일과 practiceAssets 상수를 함께 수정하면 됩니다.",
] as const;

export default function PracticeModePage() {
  return (
    <DeckShell mode="practice" progress={100}>
      <div className="space-y-5">
        <section className="glass-card overflow-hidden rounded-[30px] p-6">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <MonitorPlay className="h-6 w-6" />
              </div>
              <p className="text-3xl font-black text-slate-950">독서커뮤니티 실습 모드</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {practiceActions.map(({ href, label, icon: Icon, className, download, rel, target }) => (
                  <a
                    key={label}
                    href={href}
                    target={target}
                    rel={rel}
                    download={download}
                    className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-black text-white shadow-card ${className}`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-white/70 bg-white/80 p-4 shadow-card">
              <div className="mb-3 inline-flex items-center gap-2 rounded-2xl bg-amber-100 px-4 py-2 text-sm font-black text-amber-700">
                <LayoutPanelTop className="h-4 w-4" />
                실습모드 안내
              </div>
              <ul className="space-y-3 text-sm font-bold leading-6 text-slate-600">
                {practiceTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="glass-card rounded-[30px] p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-2xl bg-blue-100 px-4 py-2 text-sm font-black text-blue-700">
                <BookOpenCheck className="h-4 w-4" />
                실습 HTML 실행 화면
              </div>
              <p className="text-2xl font-black leading-tight text-slate-950">
                독서커뮤니티
                <br />
                웹앱 개발
                <br />
                실습 자료
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-card">
            <iframe
              title={COMMUNITY_PRACTICE_IFRAME_TITLE}
              src={COMMUNITY_PRACTICE_HTML_PATH}
              className="h-[820px] w-full bg-white"
              loading="lazy"
              allowFullScreen
            />
          </div>
          <div className="mt-4 rounded-[24px] border border-dashed border-slate-300 bg-slate-50/90 p-4 text-sm font-bold leading-6 text-slate-600">
            <p className="text-slate-900">빠른 수정 포인트</p>
            <p className="mt-1">
              화면 문구와 버튼 구성은 <code>PracticeModePage.tsx</code>에서, 실제 실습 자료 파일명은 <code>practiceAssets.ts</code>와
              <code className="ml-1 rounded bg-white px-1.5 py-0.5 text-xs font-black text-slate-700">public/practice</code>
              폴더에서 같이 맞추면 됩니다.
            </p>
          </div>
        </section>
      </div>
    </DeckShell>
  );
}
