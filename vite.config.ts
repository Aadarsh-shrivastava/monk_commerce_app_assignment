import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vercel from "vite-plugin-vercel";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vercel()],
  server: {
    port: process.env.PORT as unknown as number,
  },
  build: {
    outDir: "dist",
  },
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
});
