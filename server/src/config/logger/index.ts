import {$log, PlatformLoggerSettings} from "@tsed/common";
import { EmojiAppender } from "../../util/EmojiAppender";

// Replace Ts.ED's default appenders with our concise emoji logger.
$log.appenders.clear();
$log.appenders.set("emoji", { type: EmojiAppender });

// Only emit error level logs from Ts.ED. Informational messages will
// be handled through our custom logger utility.
$log.level = "error";

export default <PlatformLoggerSettings>{
  disableRoutesSummary: true
};
