import { Download, Eye, FileUp, Image as ImageIcon, MessageSquare, Paperclip, RefreshCw, Send, ShieldCheck, ThumbsDown, ThumbsUp, ToggleRight, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { demoQuestions, type TrainingAttachment, type TrainingQuestion } from "../data/demoQuestions";
import { useAdminUnlock } from "../hooks/useAdminUnlock";

const STORAGE_KEY = "codex-training-question-board";
const ATTACHMENT_DB_NAME = "codex-training-attachments";
const ATTACHMENT_STORE_NAME = "files";
const MAX_ATTACHMENT_BYTES = 800 * 1024;
const MAX_ATTACHMENTS = 3;

type TrainingQuestionBoardProps = {
  compact?: boolean;
};

function normalizeQuestions(rows: TrainingQuestion[]) {
  return rows.map((row) => ({
    ...row,
    votes: Number(row.votes ?? 0),
    dislikes: Number(row.dislikes ?? 0),
    replies: row.replies ?? [],
  }));
}

function questionsForStorage(rows: TrainingQuestion[]) {
  return rows.map((row) => ({
    ...row,
    attachments: row.attachments?.map((attachment) => ({
      id: attachment.id,
      name: attachment.name,
      size: attachment.size,
      type: attachment.type,
    })),
  }));
}

function loadQuestions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return normalizeQuestions(demoQuestions);
    const parsed = JSON.parse(stored) as TrainingQuestion[];
    return Array.isArray(parsed) ? normalizeQuestions(parsed) : normalizeQuestions(demoQuestions);
  } catch {
    return normalizeQuestions(demoQuestions);
  }
}

function toCsv(rows: TrainingQuestion[]) {
  const headers = ["id", "question", "author", "likes", "dislikes", "answered", "createdAt", "attachments", "replies"];
  const escape = (value: string | number | boolean | undefined) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [
    headers.join(","),
    ...rows.map((row) =>
      [
        row.id,
        row.question,
        row.author,
        row.votes,
        row.dislikes ?? 0,
        row.answered,
        row.createdAt,
        row.attachments?.map((attachment) => attachment.name).join(" | ") ?? "",
        row.replies?.map((reply) => reply.content).join(" | ") ?? "",
      ]
        .map(escape)
        .join(","),
    ),
  ].join("\n");
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 102.4) / 10}KB`;
  return `${Math.round(bytes / 1024 / 102.4) / 10}MB`;
}

function fileToAttachment(file: File): Promise<TrainingAttachment> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        id: `file-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        dataUrl: String(reader.result ?? ""),
      });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function openAttachmentDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(ATTACHMENT_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(ATTACHMENT_STORE_NAME)) {
        db.createObjectStore(ATTACHMENT_STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveAttachmentData(attachment: TrainingAttachment) {
  if (!attachment.dataUrl) return;
  const db = await openAttachmentDb();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(ATTACHMENT_STORE_NAME, "readwrite");
    transaction.objectStore(ATTACHMENT_STORE_NAME).put({
      id: attachment.id,
      name: attachment.name,
      size: attachment.size,
      type: attachment.type,
      dataUrl: attachment.dataUrl,
    });
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

async function loadAttachmentData(id: string): Promise<TrainingAttachment | null> {
  const db = await openAttachmentDb();
  const record = await new Promise<TrainingAttachment | null>((resolve, reject) => {
    const transaction = db.transaction(ATTACHMENT_STORE_NAME, "readonly");
    const request = transaction.objectStore(ATTACHMENT_STORE_NAME).get(id);
    request.onsuccess = () => resolve((request.result as TrainingAttachment | undefined) ?? null);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return record;
}

export default function TrainingQuestionBoard({ compact = false }: TrainingQuestionBoardProps) {
  const [questions, setQuestions] = useState<TrainingQuestion[]>(loadQuestions);
  const [question, setQuestion] = useState("");
  const [author, setAuthor] = useState("");
  const [pendingAttachments, setPendingAttachments] = useState<TrainingAttachment[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [previewAttachment, setPreviewAttachment] = useState<TrainingAttachment | null>(null);
  const [storageMessage, setStorageMessage] = useState("");
  const [sort, setSort] = useState<"popular" | "latest">("popular");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const { isAdmin, lockAdmin } = useAdminUnlock();
  const fileInputId = compact ? "question-file-compact" : "question-file";

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questionsForStorage(questions)));
      setStorageMessage(`저장됨 ${new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`);
    } catch {
      setStorageMessage("저장 실패: 브라우저 저장 공간이 부족합니다. 첨부 파일을 줄이고 다시 시도하세요.");
    }
  }, [questions]);

  const sorted = useMemo(() => {
    return [...questions].sort((a, b) => {
      if (sort === "latest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return b.votes - a.votes || (a.dislikes ?? 0) - (b.dislikes ?? 0);
    });
  }, [questions, sort]);

  function addQuestion() {
    const text = question.trim();
    if (!text) return;
    setQuestions((current) => [
      {
        id: `q-${Date.now()}`,
        question: text,
        author: author.trim() || "익명",
        votes: 0,
        dislikes: 0,
        answered: false,
        createdAt: new Date().toISOString(),
        attachments: pendingAttachments,
        replies: [],
      },
      ...current,
    ]);
    setQuestion("");
    setAuthor("");
    setPendingAttachments([]);
    setAttachmentError("");
  }

  function vote(id: string, type: "like" | "dislike") {
    setQuestions((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              votes: type === "like" ? item.votes + 1 : item.votes,
              dislikes: type === "dislike" ? (item.dislikes ?? 0) + 1 : item.dislikes ?? 0,
            }
          : item,
      ),
    );
  }

  function toggleAnswered(id: string) {
    setQuestions((current) => current.map((item) => (item.id === id ? { ...item, answered: !item.answered } : item)));
  }

  function downloadCsv() {
    const blob = new Blob(["\uFEFF" + toCsv(questions)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "training-question-board.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function resetDemo() {
    setQuestions(normalizeQuestions(demoQuestions));
    setPendingAttachments([]);
    setAttachmentError("");
  }

  function deleteQuestion(id: string) {
    if (!isAdmin) return;
    setQuestions((current) => current.filter((item) => item.id !== id));
  }

  function addReply(id: string) {
    if (!isAdmin) return;
    const content = (replyDrafts[id] ?? "").trim();
    if (!content) return;
    setQuestions((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              answered: true,
              replies: [
                ...(item.replies ?? []),
                {
                  id: `r-${Date.now()}-${Math.random().toString(16).slice(2)}`,
                  content,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : item,
      ),
    );
    setReplyDrafts((current) => ({ ...current, [id]: "" }));
  }

  function deleteReply(questionId: string, replyId: string) {
    if (!isAdmin) return;
    setQuestions((current) =>
      current.map((item) =>
        item.id === questionId
          ? {
              ...item,
              replies: (item.replies ?? []).filter((reply) => reply.id !== replyId),
            }
          : item,
      ),
    );
  }

  async function handleAttachmentChange(files: FileList | null) {
    if (!files?.length) return;
    setAttachmentError("");
    const current = pendingAttachments.length;
    const selected = Array.from(files).slice(0, Math.max(0, MAX_ATTACHMENTS - current));
    if (current + files.length > MAX_ATTACHMENTS) {
      setAttachmentError(`첨부는 질문당 ${MAX_ATTACHMENTS}개까지만 가능합니다.`);
    }
    const valid = selected.filter((file) => {
      if (file.size <= MAX_ATTACHMENT_BYTES) return true;
      setAttachmentError(`${file.name}은 ${formatBytes(MAX_ATTACHMENT_BYTES)}보다 커서 제외했습니다.`);
      return false;
    });
    const attachments = await Promise.all(valid.map(fileToAttachment));
    await Promise.all(attachments.map(saveAttachmentData));
    setPendingAttachments((currentAttachments) => [...currentAttachments, ...attachments]);
  }

  function removePendingAttachment(id: string) {
    setPendingAttachments((current) => current.filter((attachment) => attachment.id !== id));
  }

  async function getStoredAttachment(attachment: TrainingAttachment) {
    return attachment.dataUrl ? attachment : await loadAttachmentData(attachment.id);
  }

  async function openAttachmentPreview(attachment: TrainingAttachment) {
    if (!isAdmin) return;
    const stored = await getStoredAttachment(attachment);
    if (!stored?.dataUrl) {
      setAttachmentError("이미지 원본을 찾을 수 없습니다. 같은 브라우저에서 업로드한 이미지만 관리자 미리보기가 가능합니다.");
      return;
    }
    setPreviewAttachment(stored);
  }

  async function downloadAttachment(attachment: TrainingAttachment) {
    if (!isAdmin) return;
    const stored = await getStoredAttachment(attachment);
    if (!stored?.dataUrl) {
      setAttachmentError("첨부파일 원본을 찾을 수 없습니다. 같은 브라우저에서 업로드한 파일만 다운로드할 수 있습니다.");
      return;
    }
    const anchor = document.createElement("a");
    anchor.href = stored.dataUrl;
    anchor.download = stored.name;
    anchor.click();
  }

  return (
    <div className={clsx("glass-card rounded-[28px] p-5", compact && "text-sm")}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-2xl font-black text-slate-950">연수 질문·투표 보드</p>
            {isAdmin ? (
              <span className="inline-flex items-center gap-1 rounded-2xl bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                관리 모드
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm font-bold text-rose-600">실제 학생, 학부모, 교직원 개인정보는 입력하지 않습니다. 관리 모드에서는 답글 작성과 삭제가 가능합니다.</p>
          {storageMessage ? (
            <p className={clsx("mt-1 text-xs font-black", storageMessage.startsWith("저장 실패") ? "text-rose-600" : "text-emerald-600")}>
              {storageMessage}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setSort("popular")} className={clsx("rounded-2xl px-4 py-2 text-sm font-black", sort === "popular" ? "bg-violet-600 text-white" : "bg-white text-slate-600")}>
            인기순
          </button>
          <button type="button" onClick={() => setSort("latest")} className={clsx("rounded-2xl px-4 py-2 text-sm font-black", sort === "latest" ? "bg-violet-600 text-white" : "bg-white text-slate-600")}>
            최신순
          </button>
          <button type="button" onClick={downloadCsv} className="flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-black text-white">
            <Download className="h-4 w-4" />
            CSV
          </button>
          <button type="button" onClick={resetDemo} className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-600">
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

      <div className="grid gap-3 rounded-[24px] bg-white/72 p-4 md:grid-cols-[1fr_180px_auto]">
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addQuestion();
          }}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold outline-none ring-violet-200 focus:ring-4"
          placeholder="연수 중 궁금한 질문을 적어주세요"
        />
        <input
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold outline-none ring-violet-200 focus:ring-4"
          placeholder="작성자(선택)"
        />
        <button type="button" onClick={addQuestion} disabled={!question.trim()} className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300">
          <Send className="h-4 w-4" />
          등록
        </button>
        <div className="md:col-span-3">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor={fileInputId} className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-100">
              <FileUp className="h-4 w-4" />
              파일 첨부
            </label>
            <input
              id={fileInputId}
              type="file"
              multiple
              className="sr-only"
              onChange={(event) => {
                void handleAttachmentChange(event.target.files);
                event.currentTarget.value = "";
              }}
            />
            <p className="text-xs font-bold leading-5 text-slate-500">
              교육용 로컬 첨부입니다. 질문당 {MAX_ATTACHMENTS}개, 파일당 {formatBytes(MAX_ATTACHMENT_BYTES)} 이하만 저장됩니다.
            </p>
          </div>
          <p className="mt-2 text-xs font-bold text-rose-600">첨부 파일에도 실제 개인정보, 건강정보, 민감정보를 넣지 마세요. 게시글은 저장되고, 새로고침 후 첨부파일 원본은 파일명만 남습니다.</p>
          {attachmentError ? <p className="mt-2 rounded-2xl bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800">{attachmentError}</p> : null}
          {pendingAttachments.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {pendingAttachments.map((attachment) => (
                <span key={attachment.id} className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm">
                  <Paperclip className="h-4 w-4 text-blue-500" />
                  {attachment.name}
                  <span className="text-slate-400">{formatBytes(attachment.size)}</span>
                  <button type="button" onClick={() => removePendingAttachment(attachment.id)} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-rose-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {sorted.map((item) => (
          <article key={item.id} className="rounded-[24px] border border-slate-200 bg-white/86 p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-black leading-7 text-slate-900">{item.question}</p>
                <p className="mt-2 text-xs font-bold text-slate-500">
                  {item.author || "익명"} · {new Date(item.createdAt).toLocaleString("ko-KR")}
                </p>
                {item.attachments?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.attachments.map((attachment) => {
                      const isImage = attachment.type.startsWith("image/");
                      return (
                        <span key={attachment.id} className="inline-flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-xs font-black text-slate-700">
                          {isImage ? <ImageIcon className="h-4 w-4 text-blue-500" /> : <Paperclip className="h-4 w-4 text-blue-500" />}
                          {attachment.name}
                          <span className="text-slate-400">{formatBytes(attachment.size)}</span>
                          {isAdmin ? (
                            <>
                              {isImage ? (
                                <button type="button" onClick={() => void openAttachmentPreview(attachment)} className="inline-flex items-center gap-1 rounded-xl bg-blue-100 px-2 py-1 text-blue-700">
                                  <Eye className="h-3.5 w-3.5" />
                                  이미지 보기
                                </button>
                              ) : null}
                              <button type="button" onClick={() => void downloadAttachment(attachment)} className="rounded-xl bg-white px-2 py-1 text-slate-600">
                                다운로드
                              </button>
                            </>
                          ) : (
                            <span className="rounded-xl bg-white px-2 py-1 text-slate-400">관리자만 원본 확인</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
                {item.replies?.length ? (
                  <div className="mt-3 space-y-2">
                    {item.replies.map((reply) => (
                      <div key={reply.id} className="rounded-2xl border border-blue-100 bg-blue-50/80 px-4 py-3">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-black text-blue-700">관리자 답글</p>
                            <p className="mt-1 whitespace-pre-wrap text-sm font-bold leading-6 text-slate-700">{reply.content}</p>
                            <p className="mt-1 text-xs font-bold text-slate-400">{new Date(reply.createdAt).toLocaleString("ko-KR")}</p>
                          </div>
                          {isAdmin ? (
                            <button type="button" onClick={() => deleteReply(item.id, reply.id)} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-rose-600">
                              답글 삭제
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => vote(item.id, "like")} className="flex items-center gap-2 rounded-2xl bg-violet-100 px-4 py-2 text-sm font-black text-violet-700">
                  <ThumbsUp className="h-4 w-4" />
                  좋아요
                  {item.votes}
                </button>
                <button type="button" onClick={() => vote(item.id, "dislike")} className="flex items-center gap-2 rounded-2xl bg-rose-50 px-4 py-2 text-sm font-black text-rose-700">
                  <ThumbsDown className="h-4 w-4" />
                  싫어요
                  {item.dislikes ?? 0}
                </button>
                {isAdmin ? (
                  <button type="button" onClick={() => toggleAnswered(item.id)} className={clsx("flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-black", item.answered ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600")}>
                    <ToggleRight className="h-4 w-4" />
                    {item.answered ? "답변 완료" : "답변 대기"}
                  </button>
                ) : (
                  <span className={clsx("flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-black", item.answered ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600")}>
                    <ToggleRight className="h-4 w-4" />
                    {item.answered ? "답변 완료" : "답변 대기"}
                  </span>
                )}
                {isAdmin ? (
                  <button type="button" onClick={() => deleteQuestion(item.id)} className="flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-black text-white">
                    <Trash2 className="h-4 w-4" />
                    삭제
                  </button>
                ) : null}
              </div>
            </div>
            {isAdmin ? (
              <div className="mt-4 rounded-[22px] border border-emerald-100 bg-emerald-50/70 p-3">
                <label className="mb-2 flex items-center gap-2 text-xs font-black text-emerald-800" htmlFor={`reply-${item.id}`}>
                  <MessageSquare className="h-4 w-4" />
                  관리자 답글
                </label>
                <div className="grid gap-2 md:grid-cols-[1fr_auto]">
                  <textarea
                    id={`reply-${item.id}`}
                    value={replyDrafts[item.id] ?? ""}
                    onChange={(event) => setReplyDrafts((current) => ({ ...current, [item.id]: event.target.value }))}
                    className="min-h-20 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold outline-none ring-emerald-200 focus:ring-4"
                    placeholder="수강생에게 보여줄 답글을 입력하세요"
                  />
                  <button type="button" onClick={() => addReply(item.id)} disabled={!(replyDrafts[item.id] ?? "").trim()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300">
                    <Send className="h-4 w-4" />
                    답글 등록
                  </button>
                </div>
              </div>
            ) : null}
          </article>
        ))}
      </div>
      {isAdmin && previewAttachment?.dataUrl ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="첨부 이미지 미리보기">
          <div className="w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/30 bg-white shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
              <div className="min-w-0">
                <p className="text-lg font-black text-slate-950">관리자 이미지 미리보기</p>
                <p className="truncate text-sm font-bold text-slate-500">
                  {previewAttachment.name} · {formatBytes(previewAttachment.size)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => void downloadAttachment(previewAttachment)} className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-black text-white">
                  <Download className="h-4 w-4" />
                  다운로드
                </button>
                <button type="button" onClick={() => setPreviewAttachment(null)} className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-700">
                  <X className="h-4 w-4" />
                  닫기
                </button>
              </div>
            </div>
            <div className="max-h-[72vh] overflow-auto bg-slate-100 p-4">
              <img src={previewAttachment.dataUrl} alt={previewAttachment.name} className="mx-auto max-h-[68vh] max-w-full rounded-2xl border border-slate-200 bg-white object-contain shadow-card" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
