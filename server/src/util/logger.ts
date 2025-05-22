import chalk from "chalk";

const EMOJI = {
  request: "\ud83c\udf10", // 🌐
  success: "\u2705",       // ✅
  warn: "\u26a0\ufe0f",    // ⚠️
  error: "\u274c",         // ❌
  retry: "\ud83d\udd04"     // 🔄
};

function log(prefix: string, emoji: string, ...args: unknown[]): void {
  // Basic console logging with emoji
  console.log(`${emoji}  ${prefix}`, ...args);
}

export const logger = {
  request: (...args: unknown[]) => log("", EMOJI.request, ...args),
  success: (...args: unknown[]) => log("", EMOJI.success, ...args),
  warn: (...args: unknown[]) => log("", EMOJI.warn, ...args),
  error: (...args: unknown[]) => log("", EMOJI.error, ...args),
  retry: (...args: unknown[]) => log("", EMOJI.retry, ...args),

  group: (title: string) => console.log(`\n${chalk.bold(title)}`),
  groupEnd: () => console.log("")
};
