import {Appender, BaseAppender, LogEvent} from "@tsed/logger";

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
    const [first, ...rest] = event.data || [];
    const message = first instanceof Error ? first.message : String(first);

    switch (event.level.toString().toLowerCase()) {
      case "error":
        process.stdout.write(`❌ ${RED}${message}${RESET}\n`);
        if (first instanceof Error) {
          const clone: any = {...first};
          delete clone.message;
          if (Object.keys(clone).length) {
            process.stdout.write(JSON.stringify(clone, null, 2) + "\n");
          }
          if (first.stack) {
            process.stdout.write(first.stack + "\n");
          }
        } else if (rest.length) {
          process.stdout.write(rest.map(r => typeof r === "string" ? r : JSON.stringify(r, null, 2)).join(" ") + "\n");
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
