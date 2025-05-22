export const emoji = {
  request: '➡️',
  success: '✅',
  warn: '⚠️',
  error: '❌',
  retry: '🔄'
};

const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const log = (symbol: string, ...args: any[]) => {
  console.log(symbol, ...args);
};

const logger = {
  request: (...args: any[]) => log(emoji.request, ...args),
  success: (...args: any[]) => log(emoji.success, ...args),
  warn: (...args: any[]) => log(emoji.warn, ...args),
  error: (message?: any, ...rest: any[]) => {
    const text = message instanceof Error ? message.message : message;
    console.error(emoji.error, `${RED}${text}${RESET}`);
    if (message instanceof Error) {
      const clone: any = {...message};
      delete clone.message;
      if (Object.keys(clone).length) {
        console.error(clone);
      }
      if (message.stack) {
        console.error(message.stack);
      }
    } else if (rest.length) {
      console.error(...rest);
    }
  },
  retry: (...args: any[]) => log(emoji.retry, ...args),
  group: console.group.bind(console),
  groupEnd: console.groupEnd.bind(console)
};

export default logger;
