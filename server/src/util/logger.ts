import { summaryConfig } from "../config/logger/summaryConfig";

export const emoji = {
  request: "➡️",
  success: "✅",
  warn: "⚠️",
  error: "❌",
  retry: "🔄"
};

const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const HIDDEN_FIELDS = ["stack", "buffer"];

function summarize(obj: any, category?: string, depth = 0): any {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.slice(0, 3).map((item) => summarize(item, category, depth + 1));
  }

  const allowed = category && summaryConfig[category];
  const keys = (allowed || Object.keys(obj).sort()).slice(0, 3);
  const out: Record<string, any> = {};

  for (const key of keys) {
    if (HIDDEN_FIELDS.includes(key)) continue;
    out[key] = summarize(obj[key], undefined, depth + 1);
  }

  return out;
}

function formatArg(arg: any, category?: string): any {
  if (arg && typeof arg === "object") {
    return JSON.stringify(summarize(arg, category));
  }
  return arg;
}

const log = (symbol: string, ...args: any[]) => {
  let category: string | undefined;
  const last = args[args.length - 1];
  if (typeof last === "string" && summaryConfig[last]) {
    category = last;
    args = args.slice(0, -1);
  }
  console.log(symbol, ...args.map((a) => formatArg(a, category)));
};

const logger = {
  request: (...args: any[]) => log(emoji.request, ...args),
  success: (...args: any[]) => log(emoji.success, ...args),
  warn: (...args: any[]) => log(emoji.warn, ...args),
  error: (message?: any, ...rest: any[]) => {
    let category: string | undefined;
    const last = rest[rest.length - 1];
    if (typeof last === "string" && summaryConfig[last]) {
      category = last;
      rest = rest.slice(0, -1);
    }
    const text = message instanceof Error ? message.message : formatArg(message, category);
    console.error(emoji.error, `${RED}${text}${RESET}`);
    if (message instanceof Error) {
      const clone: any = { ...message };
      delete clone.message;
      if (Object.keys(clone).length) {
        console.error(formatArg(clone, category));
      }
      if (message.stack) {
        console.error(message.stack);
      }
    } else if (rest.length) {
      console.error(...rest.map((a) => formatArg(a, category)));
    }
  },
  retry: (...args: any[]) => log(emoji.retry, ...args),
  group: console.group.bind(console),
  groupEnd: console.groupEnd.bind(console)
};

export default logger;
