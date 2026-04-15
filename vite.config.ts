import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Vite 要求 base 以 / 结尾；根站点为 `/` */
function normalizeBase(raw: string | undefined): string {
  const b = (raw ?? "/").trim();
  if (!b || b === "/") return "/";
  const withLeading = b.startsWith("/") ? b : `/${b}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

export default defineConfig(({ mode }) => {
  // 生产构建读取 .env.production（如 VITE_BASE_PATH=/giveme-site/）；本地 dev 默认仍为 /
  const env = loadEnv(mode, __dirname, "");
  const base = normalizeBase(process.env.VITE_BASE_PATH || env.VITE_BASE_PATH);

  return {
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
  };
});
