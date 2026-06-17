import { BookOpenCheck, Download, ExternalLink, ImageDown, LayoutPanelTop, MonitorPlay } from "lucide-react";
import DeckShell from "../components/DeckShell";
import {
  COMMUNITY_PRACTICE_HTML_PATH,
  COMMUNITY_PRACTICE_IMAGE_DOWNLOAD_NAME,
  COMMUNITY_PRACTICE_IMAGE_PATH,
} from "../lib/practiceAssets";

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
              <p className="mt-3 max-w-3xl text-sm font-bold leading-6 text-slate-600">
                첨부한 독서커뮤니티 실습 HTML을 그대로 실행합니다. iframe 안에서 <strong>1015</strong>를 누르면 프롬프트 수정 버튼이 열리고,
                저장한 내용은 브라우저 localStorage에 유지됩니다.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={COMMUNITY_PRACTICE_HTML_PATH}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-card"
                >
                  <ExternalLink className="h-4 w-4" />
                  새 창으로 열기
                </a>
                <a
                  href={COMMUNITY_PRACTICE_HTML_PATH}
                  download="reading-community-codex-practice-5-4mini.html"
                  className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-card"
                >
                  <Download className="h-4 w-4" />
                  HTML 다운로드
                </a>
                <a
                  href={COMMUNITY_PRACTICE_IMAGE_PATH}
                  download={COMMUNITY_PRACTICE_IMAGE_DOWNLOAD_NAME}
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-card"
                >
                  <ImageDown className="h-4 w-4" />
                  이미지 다운로드
                </a>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/70 bg-white/80 p-4 shadow-card">
              <div className="mb-3 inline-flex items-center gap-2 rounded-2xl bg-amber-100 px-4 py-2 text-sm font-black text-amber-700">
                <LayoutPanelTop className="h-4 w-4" />
                실습모드 안내
              </div>
              <ul className="space-y-3 text-sm font-bold leading-6 text-slate-600">
                <li>방향키, Space, Home, End로 단계 페이지처럼 넘길 수 있습니다.</li>
                <li>전체화면 모드는 실습 HTML 안에서 별도로 동작합니다.</li>
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
              <p className="text-2xl font-black text-slate-950">독서커뮤니티 웹앱 개발 실습 자료</p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
                강의용 커뮤니티 허브와 분리해 두어서 실습 자료의 단축키, 편집 저장, 다운로드 기능이 충돌 없이 유지됩니다.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-card">
            <iframe
              title="독서커뮤니티 실습 모드"
              src={COMMUNITY_PRACTICE_HTML_PATH}
              className="h-[820px] w-full bg-white"
              allowFullScreen
            />
          </div>
        </section>
      </div>
    </DeckShell>
  );
}
