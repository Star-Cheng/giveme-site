"use strict";

const fs = require("node:fs");
const path = require("node:path");

const dist = path.join(__dirname, "..", "dist");
const indexHtml = path.join(dist, "index.html");
const notFoundHtml = path.join(dist, "404.html");

if (!fs.existsSync(indexHtml)) {
  console.error("gh-pages-postbuild: dist/index.html 不存在，请先执行 vite build");
  process.exit(1);
}
fs.copyFileSync(indexHtml, notFoundHtml);
console.log("gh-pages-postbuild: 已复制 index.html → 404.html（GitHub Pages SPA 回退）");
