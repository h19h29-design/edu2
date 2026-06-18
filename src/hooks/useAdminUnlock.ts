import { useEffect, useState } from "react";

const ADMIN_SEQUENCE = "1015";
const ADMIN_STORAGE_KEY = "codex-training-admin-unlocked";
export const ADMIN_EVENT = "codex-training-admin-state";

export function useAdminUnlock() {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    let buffer = "";

    function setAdminState(value: boolean) {
      setIsAdmin(value);
      try {
        sessionStorage.setItem(ADMIN_STORAGE_KEY, String(value));
      } catch {
        // Session storage can be unavailable in some restricted browser modes.
      }
      window.dispatchEvent(new CustomEvent(ADMIN_EVENT, { detail: value }));
    }

    function handleAdminState(event: Event) {
      const custom = event as CustomEvent<boolean>;
      if (typeof custom.detail === "boolean") {
        setIsAdmin(custom.detail);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (!/^\d$/.test(event.key)) return;

      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName.toLowerCase();
      if (tagName === "input" || tagName === "textarea" || tagName === "select" || target?.isContentEditable) return;

      buffer = `${buffer}${event.key}`.slice(-ADMIN_SEQUENCE.length);
      if (buffer === ADMIN_SEQUENCE) {
        setAdminState(true);
        buffer = "";
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(ADMIN_EVENT, handleAdminState);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(ADMIN_EVENT, handleAdminState);
    };
  }, []);

  function lockAdmin() {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {
      // No-op.
    }
    window.dispatchEvent(new CustomEvent(ADMIN_EVENT, { detail: false }));
  }

  return { isAdmin, lockAdmin };
}
