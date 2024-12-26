interface WindowConfig {
  __CONFIG__: {
    API_URL: string;
  };
}

declare global {
  interface Window extends WindowConfig {}
}

export const API_URL = window.__CONFIG__?.API_URL || "http://localhost:3000";
