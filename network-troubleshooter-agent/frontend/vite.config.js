import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// The dev proxy forwards /api to FastAPI and attaches APP_API_KEY from ../.env on
// the server side, so the key never ships to the browser.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "..", "");
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "http://127.0.0.1:8000",
          headers: env.APP_API_KEY ? { "X-API-Key": env.APP_API_KEY } : {},
        },
      },
    },
  };
});
