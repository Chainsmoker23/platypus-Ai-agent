// A simple logger utility for consistent output.
// In a production environment, you would replace this with a more robust logger like Winston or Pino.

const getTimestamp = (): string => new Date().toISOString();

export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`[${getTimestamp()}] [INFO] ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[${getTimestamp()}] [ERROR] ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[${getTimestamp()}] [WARN] ${message}`, ...args);
  },
};
