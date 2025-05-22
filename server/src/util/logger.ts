export const emoji = {
  request: '➡️',
  success: '✅',
  warn: '⚠️',
  error: '❌',
  retry: '🔄'
};

const log = (symbol: string, ...args: any[]) => {
  console.log(symbol, ...args);
};

const logger = {
  request: (...args: any[]) => log(emoji.request, ...args),
  success: (...args: any[]) => log(emoji.success, ...args),
  warn: (...args: any[]) => log(emoji.warn, ...args),
  error: (...args: any[]) => log(emoji.error, ...args),
  retry: (...args: any[]) => log(emoji.retry, ...args),
  group: console.group.bind(console),
  groupEnd: console.groupEnd.bind(console)
};

export default logger;
