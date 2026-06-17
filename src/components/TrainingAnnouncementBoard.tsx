import { Eraser, Image as ImageIcon, Lock, Paperclip, Send, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdminUnlock } from "../hooks/useAdminUnlock";

const STORAGE_KEY = "codex-training-announcement-board";
const MAX_IMAGES = 4;
const MAX_IMAGE_BYTES = 1.2 * 1024 * 1024;

type AnnouncementImage = {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
};

type AnnouncementBoardState = {
  title: string;
  message: string;
  images: AnnouncementImage[];
  updatedAt: string;
};

const defaultBoard: AnnouncementBoardState = {
  title: "전달용 게시판",
  message: "강의 핵심 문장을 크게 적어 두고,\n질문이 들어오면 여기 내용을 바로 고쳐서 다시 보여줄 수 있습니다.",
  images: [],
  updatedAt: new Date("2026-06-17T09:00:00.000Z").toISOString(),
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 102.4) / 10}KB`;
  return `${Math.round(bytes / 1024 / 102.4) / 10}MB`;
}

function loadBoard() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultBoard;
    const parsed = JSON.parse(stored) as Partial<AnnouncementBoardState>;
    return {
      title: parsed.title?.trim() ? parsed.title : defaultBoard.title,
      message: typeof parsed.message === "string" ? parsed.message : defaultBoard.message,
      images: Array.isArray(parsed.images) ? parsed.images : [],
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : defaultBoard.updatedAt,
    };
  } catch {
    return defaultBoard;
  }
}

function fileToImage(file: File): Promise<AnnouncementImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        id: `announcement-image-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: file.name,
        size: file.size,
        dataUrl: String(reader.result ?? ""),
      });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function TrainingAnnouncementBoard() {
  const { isAdmin, lockAdmin } = useAdminUnlock();
  const [board, setBoard] = useState<AnnouncementBoardState>(loadBoard);
  const [storageMessage, setStorageMessage] = useState("");
  const [attachmentError, setAttachmentError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
      setStorageMessage(`저장됨 ${new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`);
    } catch {
      setStorageMessage("저장 실패: 이미지 용량을 줄이고 다시 시도하세요.");
    }
  }, [board]);

  function updateBoard(patch: Partial<AnnouncementBoardState>) {
    setBoard((current) => ({
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
    }));
  }

  async function handleImageChange(files: FileList | null) {
    if (!isAdmin || !files?.length) return;
    setAttachmentError("");
    const room = Math.max(0, MAX_IMAGES - board.images.length);
    const selected = Array.from(files).slice(0, room);
    if (files.length > room) {
      setAttachmentError(`이미지는 최대 ${MAX_IMAGES}장까지 올릴 수 있습니다.`);
    }
    const valid = selected.filter((file) => {
      if (!file.type.startsWith("image/")) {
        setAttachmentError(`${file.name}은 이미지 파일이 아니라서 제외했습니다.`);
        return false;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        setAttachmentError(`${file.name}은 ${formatBytes(MAX_IMAGE_BYTES)}보다 커서 제외했습니다.`);
        return false;
      }
      return true;
    });
    const images = await Promise.all(valid.map(fileToImage));
    updateBoard({ images: [...board.images, ...images] });
  }

  function removeImage(imageId: string) {
    if (!isAdmin) return;
    updateBoard({ images: board.images.filter((image) => image.id !== imageId) });
  }

  function resetBoard() {
    if (!isAdmin) return;
    setBoard({
      title: defaultBoard.title,
      message: "",
      images: [],
      updatedAt: new Date().toISOString(),
    });
    setAttachmentError("");
  }

  return (
    <section id="announcement-board" className="glass-card rounded-[30px] p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-black text-slate-950">전달용 게시판</h2>
            {isAdmin ? (
              <span className="inline-flex items-center gap-1 rounded-2xl bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                관리 모드
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-2xl bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                <Lock className="h-3.5 w-3.5" />
                읽기 전용
              </span>
            )}
          </div>
          <p className="mt-1 text-sm font-bold text-slate-600">강의자가 칠판처럼 핵심 문장, 과제, 공지 이미지를 띄워 두는 보드입니다.</p>
          <p className="mt-1 text-xs font-black text-amber-700">수정은 관리자만 가능합니다. 숫자 1015를 누르면 관리 모드가 열립니다.</p>
          {storageMessage ? (
            <p className={`mt-1 text-xs font-black ${storageMessage.startsWith("저장 실패") ? "text-rose-600" : "text-emerald-600"}`}>{storageMessage}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {isAdmin ? (
            <>
              <button type="button" onClick={resetBoard} className="inline-flex items-center gap-2 rounded-2xl bg-amber-100 px-4 py-2 text-sm font-black text-amber-800">
                <Eraser className="h-4 w-4" />
                지우개 초기화
              </button>
              <button type="button" onClick={lockAdmin} className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-black text-white">
                관리 종료
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-emerald-900/60 bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.18),transparent_28%),linear-gradient(180deg,#07221c,#0b3027)] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-200">Class Board</p>
            <p className="text-xs font-bold text-emerald-100/80">{new Date(board.updatedAt).toLocaleString("ko-KR")}</p>
          </div>
          <h3 className="mt-4 text-3xl font-black leading-tight text-white">{board.title || "전달용 게시판"}</h3>
          <p className="mt-4 whitespace-pre-wrap text-lg font-semibold leading-9 text-emerald-50/95">
            {board.message || "관리 모드에서 강의 메모를 입력하면 이 영역에 바로 반영됩니다."}
          </p>

          {board.images.length ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {board.images.map((image) => (
                <figure key={image.id} className="overflow-hidden rounded-[22px] border border-white/10 bg-white/5">
                  <img src={image.dataUrl} alt={image.name} className="h-48 w-full object-cover" />
                  <figcaption className="flex items-center justify-between gap-2 px-3 py-2 text-xs font-bold text-emerald-50/90">
                    <span className="truncate">{image.name}</span>
                    <span>{formatBytes(image.size)}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[22px] border border-dashed border-emerald-200/30 bg-white/5 px-4 py-8 text-center text-sm font-bold text-emerald-100/75">
              아직 첨부된 이미지가 없습니다.
            </div>
          )}
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white/82 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-black text-slate-700">
            <Send className="h-4 w-4 text-violet-600" />
            관리자 입력 영역
          </div>
          <div className="grid gap-3">
            <input
              value={board.title}
              disabled={!isAdmin}
              onChange={(event) => updateBoard({ title: event.target.value })}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold outline-none ring-violet-200 focus:ring-4 disabled:cursor-not-allowed disabled:bg-slate-100"
              placeholder="게시판 제목"
            />
            <textarea
              value={board.message}
              disabled={!isAdmin}
              onChange={(event) => updateBoard({ message: event.target.value })}
              className="min-h-56 rounded-2xl border border-slate-200 bg-white px-4 py-4 font-semibold leading-7 outline-none ring-violet-200 focus:ring-4 disabled:cursor-not-allowed disabled:bg-slate-100"
              placeholder="강의 중 전달할 문장을 입력하세요."
            />
            <div className="flex flex-wrap items-center gap-3">
              <label
                htmlFor="announcement-board-images"
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-black ${isAdmin ? "cursor-pointer border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100" : "border border-slate-200 bg-slate-100 text-slate-400"}`}
              >
                <ImageIcon className="h-4 w-4" />
                이미지 첨부
              </label>
              <input
                id="announcement-board-images"
                type="file"
                accept="image/*"
                multiple
                disabled={!isAdmin}
                className="sr-only"
                onChange={(event) => {
                  void handleImageChange(event.target.files);
                  event.currentTarget.value = "";
                }}
              />
              <p className="text-xs font-bold text-slate-500">최대 {MAX_IMAGES}장, 파일당 {formatBytes(MAX_IMAGE_BYTES)} 이하 이미지 업로드</p>
            </div>
            {attachmentError ? <p className="rounded-2xl bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800">{attachmentError}</p> : null}
            {board.images.length ? (
              <div className="flex flex-wrap gap-2">
                {board.images.map((image) => (
                  <span key={image.id} className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-xs font-black text-slate-700">
                    <Paperclip className="h-4 w-4 text-blue-500" />
                    <span className="max-w-40 truncate">{image.name}</span>
                    <span className="text-slate-400">{formatBytes(image.size)}</span>
                    {isAdmin ? (
                      <button type="button" onClick={() => removeImage(image.id)} className="rounded-full p-1 text-slate-400 hover:bg-white hover:text-rose-500">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    ) : null}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
