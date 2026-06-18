import clsx from "clsx";
import { Eye, EyeOff, MonitorPlay } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ADMIN_EVENT, useAdminUnlock } from "../hooks/useAdminUnlock";

type TeacherPagePayload = {
  type: "teacher_page";
  room: string;
  pageId: string;
  seq: number;
  timestamp: number;
  scrollY?: number;
};

type SupabaseChannel = {
  on: (type: "broadcast", filter: { event: string }, callback: (message: { payload?: TeacherPagePayload }) => void) => SupabaseChannel;
  subscribe: (callback: (status: string) => void) => void;
  send: (message: { type: "broadcast"; event: string; payload: TeacherPagePayload }) => Promise<unknown>;
};

type SupabaseClient = {
  channel: (name: string, options?: { config?: { broadcast?: { self?: boolean } } }) => SupabaseChannel;
};

declare global {
  interface Window {
    EDU2_REALTIME_CONFIG?: {
      supabaseUrl?: string;
      supabaseAnonKey?: string;
      supabasePublishableKey?: string;
      defaultRoom?: string;
    };
    supabase?: {
      createClient: (url: string, key: string) => SupabaseClient;
    };
  }
}

const EVENT_NAME = "teacher-page";
const PENDING_KEY = "edu2-teacher-page-pending";
const FOLLOW_KEY_PREFIX = "edu2-follow-mode:";
const TEACHER_MODE_KEY_PREFIX = "edu2-teacher-mode:";
export const FOLLOW_LOCATION_CHANGE_EVENT = "edu2-follow-location-change";

function queryParams() {
  return new URLSearchParams(window.location.search);
}

function roomFromLocation() {
  const params = queryParams();
  return (params.get("room") || window.EDU2_REALTIME_CONFIG?.defaultRoom || "codex-class").replace(/[^\w-]/g, "").slice(0, 60) || "codex-class";
}

function sessionFlag(key: string) {
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function setSessionFlag(key: string, value: boolean) {
  try {
    sessionStorage.setItem(key, value ? "1" : "0");
  } catch {
    // Session storage can be unavailable in restricted browser modes.
  }
}

function isHostCandidate() {
  return queryParams().get("role") === "host";
}

function publicSearch() {
  const params = queryParams();
  params.delete("role");
  params.delete("room");
  const value = params.toString();
  return value ? `?${value}` : "";
}

function isVisible(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.top <= window.innerHeight;
}

function currentSectionId() {
  const selectors = ["[data-follow-section][id]", "main section[id]", "article[id]", "section[id]", "[id]"];
  const nodes = selectors.flatMap((selector) => Array.from(document.querySelectorAll<HTMLElement>(selector)));
  const uniqueNodes = Array.from(new Set(nodes)).filter((node) => {
    if (!node.id || node.id === "root" || node.closest("[data-follow-control]")) return false;
    return isVisible(node);
  });

  const viewportCenter = window.innerHeight / 2;
  let selected = "";
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const node of uniqueNodes) {
    const rect = node.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
    if (distance < bestDistance) {
      selected = node.id;
      bestDistance = distance;
    }
  }
  return selected;
}

function currentPageId() {
  const sectionId = currentSectionId();
  return `${window.location.pathname}${publicSearch()}${sectionId ? `#${sectionId}` : ""}`;
}

function currentPayload(room: string, seq: number): TeacherPagePayload {
  return {
    type: "teacher_page",
    room,
    pageId: currentPageId(),
    seq,
    timestamp: Date.now(),
    scrollY: Math.round(window.scrollY || 0),
  };
}

function isEditableTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  return (
    element?.tagName === "INPUT" ||
    element?.tagName === "TEXTAREA" ||
    element?.tagName === "SELECT" ||
    Boolean(element?.isContentEditable)
  );
}

function targetUrlFromPageId(pageId: string, room: string) {
  const url = new URL(pageId || window.location.pathname, window.location.origin);
  url.searchParams.set("room", room);
  return url;
}

function normalizedParams(url: URL) {
  const params = new URLSearchParams(url.search);
  params.delete("role");
  params.delete("room");
  return Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

function isSamePage(url: URL) {
  const current = new URL(window.location.href);
  return url.pathname === current.pathname && normalizedParams(url) === normalizedParams(current);
}

function applyTeacherPage(payload: TeacherPagePayload) {
  const url = targetUrlFromPageId(payload.pageId, payload.room);
  const targetId = decodeURIComponent(url.hash.replace(/^#/, ""));
  if (targetId) {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }
  }
  if (typeof payload.scrollY === "number") {
    window.scrollTo({ top: payload.scrollY, behavior: "auto" });
  }
}

export default function GlobalFollowControl() {
  const { isAdmin } = useAdminUnlock();
  const shouldPreserveTeacherContext = isAdmin || isHostCandidate();
  const roomRef = useRef(roomFromLocation());
  const followStorageKey = `${FOLLOW_KEY_PREFIX}${roomRef.current}`;
  const teacherStorageKey = `${TEACHER_MODE_KEY_PREFIX}${roomRef.current}`;
  const [connected, setConnected] = useState(false);
  const [followMode, setFollowMode] = useState(() => sessionFlag(followStorageKey));
  const [adminOpen, setAdminOpen] = useState(() => isAdmin);
  const [teacherMode, setTeacherMode] = useState(() => sessionFlag(teacherStorageKey));
  const [status, setStatus] = useState("연결 준비 중");
  const channelRef = useRef<ReturnType<SupabaseClient["channel"]> | null>(null);
  const followModeRef = useRef(followMode);
  const teacherModeRef = useRef(false);
  const connectedRef = useRef(false);
  const seqRef = useRef(0);
  const lastHandledSeqRef = useRef(0);
  const lastSentPageRef = useRef("");

  useEffect(() => {
    followModeRef.current = followMode;
    setSessionFlag(followStorageKey, followMode);
  }, [followMode, followStorageKey]);

  useEffect(() => {
    teacherModeRef.current = teacherMode;
    setSessionFlag(teacherStorageKey, teacherMode);
  }, [teacherMode, teacherStorageKey]);

  useEffect(() => {
    if (isAdmin) {
      setFollowMode(false);
      setAdminOpen(true);
    }
  }, [isAdmin]);

  useEffect(() => {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw || !followModeRef.current) return;
    sessionStorage.removeItem(PENDING_KEY);
    window.setTimeout(() => {
      try {
        applyTeacherPage(JSON.parse(raw) as TeacherPagePayload);
      } catch {
        // Malformed pending payloads should never block normal reading.
      }
    }, 100);
  }, []);

  useEffect(() => {
    const config = window.EDU2_REALTIME_CONFIG;
    const url = config?.supabaseUrl?.trim();
    const key = (config?.supabaseAnonKey || config?.supabasePublishableKey || "").trim();
    if (!url || !key || !window.supabase?.createClient) {
      setStatus("Realtime 설정 없음");
      return;
    }

    try {
      const client = window.supabase.createClient(url, key);
      const channel = client.channel(`edu2-teacher-page:${roomRef.current}`, { config: { broadcast: { self: false } } });
      channelRef.current = channel;
      channel.on("broadcast", { event: EVENT_NAME }, (message) => {
        const payload = message.payload;
        if (!payload || payload.type !== "teacher_page" || payload.room !== roomRef.current) return;
        if (!followModeRef.current || payload.seq <= lastHandledSeqRef.current) return;
        lastHandledSeqRef.current = payload.seq;

        const targetUrl = targetUrlFromPageId(payload.pageId, roomRef.current);
        if (!isSamePage(targetUrl)) {
          sessionStorage.setItem(PENDING_KEY, JSON.stringify(payload));
          window.location.href = targetUrl.toString();
          return;
        }
        applyTeacherPage(payload);
      });
      channel.subscribe((nextStatus) => {
        if (nextStatus === "SUBSCRIBED") {
          setConnected(true);
          connectedRef.current = true;
          setStatus(`room: ${roomRef.current}`);
        }
        if (["CHANNEL_ERROR", "TIMED_OUT", "CLOSED"].includes(nextStatus)) {
          setConnected(false);
          connectedRef.current = false;
          setStatus("Realtime 연결 오류");
        }
      });
    } catch {
      setStatus("Realtime 연결 오류");
    }
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target) || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === "Escape" && followModeRef.current) {
        setFollowMode(false);
      }
    }
    function onAdminState(event: Event) {
      const custom = event as CustomEvent<boolean>;
      if (custom.detail) {
        setAdminOpen(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(ADMIN_EVENT, onAdminState);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(ADMIN_EVENT, onAdminState);
    };
  }, []);

  useEffect(() => {
    if (!shouldPreserveTeacherContext) return;

    const preserveHostLinks = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as HTMLElement | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target || link.origin !== window.location.origin) return;
      const next = new URL(link.href);
      next.searchParams.set("room", roomRef.current);
      if (isHostCandidate()) {
        next.searchParams.set("role", "host");
      }
      if (next.href === link.href) return;
      event.preventDefault();
      window.location.href = next.toString();
    };

    document.addEventListener("click", preserveHostLinks, true);
    return () => document.removeEventListener("click", preserveHostLinks, true);
  }, [shouldPreserveTeacherContext]);

  useEffect(() => {
    if (!isAdmin || !teacherMode) return;

    const sendCurrentPage = async (force = false) => {
      if (!channelRef.current || !connectedRef.current || !teacherModeRef.current) return;
      const pageId = currentPageId();
      if (!force && pageId === lastSentPageRef.current) return;
      lastSentPageRef.current = pageId;
      seqRef.current += 1;
      try {
        await channelRef.current.send({
          type: "broadcast",
          event: EVENT_NAME,
          payload: currentPayload(roomRef.current, seqRef.current),
        });
        setStatus(`송출 중 · ${roomRef.current}`);
      } catch {
        setStatus("송출 오류");
      }
    };

    const scheduleSectionCheck = () => window.setTimeout(() => void sendCurrentPage(false), 80);
    const heartbeat = window.setInterval(() => void sendCurrentPage(true), 2500);
    window.addEventListener("scroll", scheduleSectionCheck, { passive: true });
    window.addEventListener("keyup", scheduleSectionCheck);
    window.addEventListener("click", scheduleSectionCheck);
    window.addEventListener("hashchange", scheduleSectionCheck);
    window.addEventListener(FOLLOW_LOCATION_CHANGE_EVENT, scheduleSectionCheck);
    void sendCurrentPage(true);

    return () => {
      window.clearInterval(heartbeat);
      window.removeEventListener("scroll", scheduleSectionCheck);
      window.removeEventListener("keyup", scheduleSectionCheck);
      window.removeEventListener("click", scheduleSectionCheck);
      window.removeEventListener("hashchange", scheduleSectionCheck);
      window.removeEventListener(FOLLOW_LOCATION_CHANGE_EVENT, scheduleSectionCheck);
    };
  }, [isAdmin, teacherMode]);

  const sendNow = async () => {
    if (!channelRef.current || !connectedRef.current) return;
    seqRef.current += 1;
    lastSentPageRef.current = currentPageId();
    try {
      await channelRef.current.send({
        type: "broadcast",
        event: EVENT_NAME,
        payload: currentPayload(roomRef.current, seqRef.current),
      });
      setStatus(`송출 중 · ${roomRef.current}`);
    } catch {
      setStatus("송출 오류");
    }
  };

  if (isAdmin) {
    return (
      <div data-follow-control>
        {teacherMode && !adminOpen ? (
          <div className="fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 shadow-card">
            <MonitorPlay className="h-4 w-4" />
            강사 모드 송출 중
          </div>
        ) : null}
        {adminOpen ? (
          <div className="fixed bottom-24 right-4 z-[60] w-[min(320px,calc(100vw-2rem))] rounded-3xl border border-slate-200 bg-white p-3 shadow-card">
            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => {
                  setTeacherMode(true);
                  void sendNow();
                }}
                disabled={!connected}
                className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white disabled:bg-slate-300"
              >
                강사모드 켜기
              </button>
              <button
                type="button"
                onClick={() => setTeacherMode(false)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800"
              >
                강사모드 끄기
              </button>
              <button
                type="button"
                onClick={() => void sendNow()}
                disabled={!connected || !teacherMode}
                className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-black text-blue-700 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
              >
                현재 페이지 보내기
              </button>
              <button
                type="button"
                onClick={() => setAdminOpen(false)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700"
              >
                관리자 패널 닫기
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] font-bold text-slate-400">{status}</p>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div data-follow-control className="fixed bottom-24 right-4 z-50">
      <button
        type="button"
        onClick={() => setFollowMode((current) => !current)}
        disabled={!connected}
        title={status}
        className={clsx(
          "inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-black shadow-card transition disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400",
          followMode ? "border-slate-900 bg-slate-950 text-white" : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
        )}
      >
        {followMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        {followMode ? "자유보기" : "강사화면 보기"}
      </button>
    </div>
  );
}
