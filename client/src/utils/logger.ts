export const emoji = {
  request: '➡️',
  success: '✅',
  warn: '⚠️',
  error: '❌',
  retry: '🔄'
};

const logger = {
  request: (...args: any[]) => console.log(emoji.request, ...args),
  success: (...args: any[]) => console.log(emoji.success, ...args),
  warn: (...args: any[]) => console.warn(emoji.warn, ...args),
  error: (...args: any[]) => console.error(emoji.error, ...args),
  retry: (...args: any[]) => console.log(emoji.retry, ...args)
};

export default logger;
