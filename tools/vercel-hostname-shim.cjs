const os = require("os");

const safeName = "codex-local";

if (typeof os.hostname === "function") {
  try {
    Object.defineProperty(os, "hostname", {
      value: () => safeName,
    });
  } catch {
    os.hostname = () => safeName;
  }
}
