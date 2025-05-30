export const urls = {
  local: "http://localhost:4000",
  development: "http://localhost:4000",
  production: "https://voltaiccrm-7dd827fb5012.herokuapp.com",
} as const;

type Environment = keyof typeof urls;
const env = (process.env.REACT_APP_STAGE || "development") as Environment;
export const baseURL = urls[env] || urls.development;
