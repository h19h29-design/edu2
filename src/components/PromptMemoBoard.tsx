import { ClipboardCopy, Pencil, Plus, Save, ShieldCheck, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { defaultPromptMemos, type PromptMemo } from "../data/promptMemos";
import { useAdminUnlock } from "../hooks/useAdminUnlock";

const STORAGE_KEY = "codex-training-prompt-memos";

type PromptMemoForm = {
  id?: string;
  title: string;
  category: string;
  description: string;
  content: string;
};

const emptyForm: PromptMemoForm = {
  title: "",
  category: "실습",
  description: "",
  content: "",
};

function loadPromptMemos() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultPromptMemos;
    const parsed = JSON.parse(stored) as PromptMemo[];
    return Array.isArray(parsed) && parsed.length ? parsed : defaultPromptMemos;
  } catch {
    return defaultPromptMemos;
  }
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function PromptMemoBoard() {
  const { isAdmin, lockAdmin } = useAdminUnlock();
  const [memos, setMemos] = useState<PromptMemo[]>(loadPromptMemos);
  const [form, setForm] = useState<PromptMemoForm>(emptyForm);
  const [copiedId, setCopiedId] = useState("");
  const [filter, setFilter] = useState("");
  const [storageMessage, setStorageMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
      setStorageMessage(`저장됨 ${new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`);
    } catch {
      setStorageMessage("저장 실패: 브라우저 저장 공간이 부족합니다.");
    }
  }, [memos]);

  const filtered = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) return memos;
    return memos.filter((memo) => `${memo.title} ${memo.category} ${memo.description} ${memo.content}`.toLowerCase().includes(query));
  }, [filter, memos]);

  function updateForm<K extends keyof PromptMemoForm>(key: K, value: PromptMemoForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function saveMemo() {
    if (!isAdmin) return;
    const title = form.title.trim();
    const content = form.content.trim();
    if (!title || !content) return;

    const memo: PromptMemo = {
      id: form.id ?? `memo-${Date.now()}`,
      title,
      category: form.category.trim() || "실습",
      description: form.description.trim() || "수업 중 바로 복사해 사용할 수 있는 프롬프트입니다.",
      content,
      updatedAt: new Date().toISOString(),
    };

    setMemos((current) => {
      if (!form.id) return [memo, ...current];
      return current.map((item) => (item.id === form.id ? memo : item));
    });
    setForm(emptyForm);
  }

  function editMemo(memo: PromptMemo) {
    if (!isAdmin) return;
    setForm({
      id: memo.id,
      title: memo.title,
      category: memo.category,
      description: memo.description,
      content: memo.content,
    });
  }

  function deleteMemo(id: string) {
    if (!isAdmin) return;
    setMemos((current) => current.filter((memo) => memo.id !== id));
    if (form.id === id) setForm(emptyForm);
  }

  async function copyMemo(memo: PromptMemo) {
    await copyText(memo.content);
    setCopiedId(memo.id);
    window.setTimeout(() => setCopiedId((current) => (current === memo.id ? "" : current)), 1400);
  }

  return (
    <section id="prompt-memo-board" className="glass-card rounded-[30px] p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-black text-slate-950">프롬프트 메모판</h2>
            {isAdmin ? (
              <span className="inline-flex items-center gap-1 rounded-2xl bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                관리 모드
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm font-bold text-slate-600">수강생은 아래 프롬프트를 펼쳐 읽고 복사해서 실습에 사용할 수 있습니다.</p>
          {storageMessage ? (
            <p className={clsx("mt-1 text-xs font-black", storageMessage.startsWith("저장 실패") ? "text-rose-600" : "text-emerald-600")}>
              {storageMessage}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="w-64 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold outline-none ring-violet-200 focus:ring-4"
            placeholder="프롬프트 검색"
          />
          {isAdmin ? (
            <button type="button" onClick={lockAdmin} className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-black text-white">
              관리 종료
            </button>
          ) : null}
        </div>
      </div>

      {isAdmin ? (
        <div className="mb-5 rounded-[26px] border border-emerald-200 bg-emerald-50/80 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-lg font-black text-emerald-900">{form.id ? "프롬프트 수정" : "새 프롬프트 작성"}</p>
            {form.id ? (
              <button type="button" onClick={() => setForm(emptyForm)} className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-black text-slate-600">
                <X className="h-4 w-4" />
                취소
              </button>
            ) : null}
          </div>
          <div className="grid gap-3 lg:grid-cols-[1fr_180px]">
            <input
              value={form.title}
              onChange={(event) => updateForm("title", event.target.value)}
              className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 font-bold outline-none ring-emerald-200 focus:ring-4"
              placeholder="제목"
            />
            <input
              value={form.category}
              onChange={(event) => updateForm("category", event.target.value)}
              className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 font-bold outline-none ring-emerald-200 focus:ring-4"
              placeholder="분류"
            />
            <input
              value={form.description}
              onChange={(event) => updateForm("description", event.target.value)}
              className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 font-bold outline-none ring-emerald-200 focus:ring-4 lg:col-span-2"
              placeholder="설명"
            />
            <textarea
              value={form.content}
              onChange={(event) => updateForm("content", event.target.value)}
              className="min-h-56 rounded-2xl border border-emerald-200 bg-white px-4 py-3 font-semibold leading-7 outline-none ring-emerald-200 focus:ring-4 lg:col-span-2"
              placeholder="수강생에게 공개할 프롬프트 전체 내용을 입력하세요"
            />
          </div>
          <button
            type="button"
            onClick={saveMemo}
            disabled={!form.title.trim() || !form.content.trim()}
            className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {form.id ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {form.id ? "수정 저장" : "프롬프트 추가"}
          </button>
        </div>
      ) : null}

      <div className="grid gap-4">
        {filtered.map((memo) => (
          <article key={memo.id} className="rounded-[26px] border border-slate-200 bg-white/88 p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-2xl bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">{memo.category}</span>
                  <span className="text-xs font-bold text-slate-400">{new Date(memo.updatedAt).toLocaleDateString("ko-KR")}</span>
                </div>
                <h3 className="text-xl font-black text-slate-950">{memo.title}</h3>
                <p className="mt-1 text-sm font-bold text-slate-600">{memo.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void copyMemo(memo)}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-black text-white",
                    copiedId === memo.id ? "bg-emerald-600" : "bg-violet-600",
                  )}
                >
                  <ClipboardCopy className="h-4 w-4" />
                  {copiedId === memo.id ? "복사됨" : "복사"}
                </button>
                {isAdmin ? (
                  <>
                    <button type="button" onClick={() => editMemo(memo)} className="inline-flex items-center gap-2 rounded-2xl bg-blue-100 px-4 py-2 text-sm font-black text-blue-700">
                      <Pencil className="h-4 w-4" />
                      수정
                    </button>
                    <button type="button" onClick={() => deleteMemo(memo.id)} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-black text-white">
                      <Trash2 className="h-4 w-4" />
                      삭제
                    </button>
                  </>
                ) : null}
              </div>
            </div>
            <pre className="scrollbar-soft mt-4 max-h-[520px] overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-emerald-100">
              {memo.content}
            </pre>
          </article>
        ))}
      </div>
    </section>
  );
}
