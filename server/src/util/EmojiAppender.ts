import {Appender, BaseAppender, LogEvent} from "@tsed/logger";
import { summaryConfig } from "../config/logger/summaryConfig";
import { formatArg } from "./logger";

const RED = "\x1b[31m";
const RESET = "\x1b[0m";

/**
 * EmojiAppender formats Ts.ED log events into single-line messages
 * prefixed with emojis. Only error messages are colored in red and
 * the remaining log data is printed on subsequent lines.
 */
@Appender({name: "emoji"})
export class EmojiAppender extends BaseAppender {
  write(event: LogEvent): void {
    let [first, ...rest] = event.data || [];
    let category: string | undefined;
    const last = rest[rest.length - 1];
    if (typeof last === "string" && summaryConfig[last]) {
      category = last;
      rest = rest.slice(0, -1);
    }
    const message = first instanceof Error ? first.message : formatArg(first, category);

    switch (event.level.toString().toLowerCase()) {
      case "error":
        process.stdout.write(`❌ ${RED}${message}${RESET}\n`);
        if (first instanceof Error) {
          const clone: any = {...first};
          delete clone.message;
          if (Object.keys(clone).length) {
            process.stdout.write(formatArg(clone, category) + "\n");
          }
          if (first.stack) {
            process.stdout.write(first.stack + "\n");
          }
        } else if (rest.length) {
          process.stdout.write(rest.map(r => formatArg(r, category)).join(" ") + "\n");
        }
        break;
      case "warn":
        process.stdout.write(`⚠️ ${message}\n`);
        break;
      default:
        // info/debug
        process.stdout.write(`➡️ ${message}\n`);
        break;
    }
  }
}
