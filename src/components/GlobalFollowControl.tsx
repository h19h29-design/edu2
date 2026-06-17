import clsx from "clsx";
import { Eye, EyeOff, MonitorPlay } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SupabaseChannel = {
  on: (type: "broadcast", filter: { event: string }, callback: (message: { payload?: FollowPayload }) => void) => SupabaseChannel;
  subscribe: (callback: (status: string) => void) => void;
  send: (message: { type: "broadcast"; event: string; payload: FollowPayload }) => Promise<unknown>;
};

type SupabaseClient = {
  channel: (
    name: string,
    options?: { config?: { broadcast?: { self?: boolean } } },
  ) => SupabaseChannel;
};

type FollowPayload = {
  room: string;
  pathname: string;
  search: string;
  hash: string;
  sectionId: string;
  scrollY: number;
  timestamp: number;
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

const PENDING_FOLLOW_KEY = "edu2-global-follow-pending";

function queryParams() {
  return new URLSearchParams(window.location.search);
}

function roomFromLocation() {
  const params = queryParams();
  return (params.get("room") || window.EDU2_REALTIME_CONFIG?.defaultRoom || "codex-class").replace(/[^\w-]/g, "").slice(0, 60) || "codex-class";
}

function isHostMode() {
  return queryParams().get("role") === "host";
}

function targetSearchForBroadcast() {
  const params = queryParams();
  params.delete("role");
  params.delete("room");
  const value = params.toString();
  return value ? `?${value}` : "";
}

function currentSectionId() {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>("[id]")).filter((node) => node.offsetParent !== null);
  let selected = "";
  let best = Number.NEGATIVE_INFINITY;
  for (const node of candidates) {
    const top = node.getBoundingClientRect().top;
    if (top <= 140 && top > best) {
      selected = node.id;
      best = top;
    }
  }
  return selected;
}

function currentPayload(room: string): FollowPayload {
  return {
    room,
    pathname: window.location.pathname,
    search: targetSearchForBroadcast(),
    hash: window.location.hash,
    sectionId: currentSectionId(),
    scrollY: Math.round(window.scrollY || 0),
    timestamp: Date.now(),
  };
}

function applyScroll(payload: FollowPayload) {
  const target = payload.sectionId ? document.getElementById(payload.sectionId) : null;
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => window.scrollTo({ top: Number(payload.scrollY) || 0, behavior: "smooth" }), 120);
    return;
  }
  window.scrollTo({ top: Number(payload.scrollY) || 0, behavior: "smooth" });
}

function normalizeTargetUrl(payload: FollowPayload, room: string) {
  const params = new URLSearchParams(payload.search || "");
  params.set("room", room);
  const search = params.toString();
  return `${payload.pathname}${search ? `?${search}` : ""}${payload.hash || ""}`;
}

function isEditableTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  return element?.tagName === "INPUT" || element?.tagName === "TEXTAREA" || element?.tagName === "SELECT" || Boolean(element?.isContentEditable);
}

export default function GlobalFollowControl() {
  const [followMode, setFollowMode] = useState(false);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("연결 준비 중");
  const roomRef = useRef(roomFromLocation());
  const isHost = isHostMode();
  const channelRef = useRef<ReturnType<SupabaseClient["channel"]> | null>(null);
  const lastSentRef = useRef(0);
  const followModeRef = useRef(false);
  const connectedRef = useRef(false);

  useEffect(() => {
    followModeRef.current = followMode;
  }, [followMode]);

  useEffect(() => {
    const raw = sessionStorage.getItem(PENDING_FOLLOW_KEY);
    if (!raw) return;
    sessionStorage.removeItem(PENDING_FOLLOW_KEY);
    window.setTimeout(() => {
      try {
        applyScroll(JSON.parse(raw) as FollowPayload);
      } catch {
        // Ignore stale or malformed pending follow state.
      }
    }, 350);
  }, []);

  useEffect(() => {
    const config = window.EDU2_REALTIME_CONFIG;
    const url = config?.supabaseUrl?.trim();
    const key = (config?.supabaseAnonKey || config?.supabasePublishableKey || "").trim();
    if (!url || !key || !window.supabase?.createClient) {
      setStatus("Supabase 설정 후 활성화됩니다.");
      return;
    }

    const client = window.supabase.createClient(url, key);
    const channel = client.channel(`edu2-global-follow:${roomRef.current}`, { config: { broadcast: { self: false } } });
    channelRef.current = channel;
    channel.on("broadcast", { event: "host-screen" }, (message) => {
      const payload = message.payload;
      if (!payload || payload.room !== roomRef.current || !followModeRef.current) return;
      const targetUrl = normalizeTargetUrl(payload, roomRef.current);
      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (targetUrl !== currentUrl) {
        sessionStorage.setItem(PENDING_FOLLOW_KEY, JSON.stringify(payload));
        window.location.href = targetUrl;
        return;
      }
      applyScroll(payload);
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
        setStatus("Realtime 연결을 확인하세요.");
      }
    });
  }, []);

  useEffect(() => {
    if (!isHost) return;

    const sendState = async (force = false) => {
      if (!connectedRef.current) return;
      const now = Date.now();
      if (!force && now - lastSentRef.current < 700) return;
      lastSentRef.current = now;
      try {
        await channelRef.current?.send({
          type: "broadcast",
          event: "host-screen",
          payload: currentPayload(roomRef.current),
        });
        setStatus(`room: ${roomRef.current}`);
      } catch {
        setStatus("송출 오류");
      }
    };

    const onScroll = () => void sendState();
    const scheduleSend = () => window.setTimeout(() => void sendState(true), 80);
    const preserveHostLinks = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as HTMLElement | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target || link.origin !== window.location.origin) return;
      const next = new URL(link.href);
      next.searchParams.set("role", "host");
      next.searchParams.set("room", roomRef.current);
      if (next.href === link.href) return;
      event.preventDefault();
      window.location.href = next.toString();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", scheduleSend);
    window.addEventListener("keyup", scheduleSend);
    document.addEventListener("click", preserveHostLinks, true);
    const interval = window.setInterval(() => void sendState(), 1200);
    void sendState(true);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", scheduleSend);
      window.removeEventListener("keyup", scheduleSend);
      document.removeEventListener("click", preserveHostLinks, true);
    };
  }, [isHost]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && followModeRef.current && !isEditableTarget(event.target)) {
        setFollowMode(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (isHost) {
    return (
      <div className="hidden items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 shadow-sm md:flex">
        <MonitorPlay className="h-4 w-4" />
        강사 모드 송출 중
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setFollowMode((current) => !current)}
      disabled={!connected}
      title={status}
      className={clsx(
        "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-black shadow-sm transition disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400",
        followMode ? "border-slate-900 bg-slate-950 text-white" : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
      )}
    >
      {followMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      {followMode ? "따라보기 종료" : "강사화면 보기"}
    </button>
  );
}
