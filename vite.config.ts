import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Vite 要求 base 以 / 结尾；根站点为 `/` */
function normalizeBase(raw: string | undefined): string {
  const b = (raw ?? "/").trim();
  if (!b || b === "/") return "/";
  const withLeading = b.startsWith("/") ? b : `/${b}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

// 本地开发默认 `/`；CI 里设置 VITE_BASE_PATH=/仓库名/（项目页）或 `/`（用户页 username.github.io）
const base = normalizeBase(process.env.VITE_BASE_PATH);

export default defineConfig({
  base,
  root: path.resolve(__dirname, "client"),
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
