"use strict";

const fs = require("node:fs");
const path = require("node:path");

const dist = path.join(__dirname, "..", "dist");
const indexHtml = path.join(dist, "index.html");
const notFoundHtml = path.join(dist, "404.html");
const cnameFile = path.join(dist, "CNAME");

if (!fs.existsSync(indexHtml)) {
  console.error("gh-pages-postbuild: dist/index.html 不存在，请先执行 vite build");
  process.exit(1);
}

// SPA 回退：GitHub Pages 404 时加载 index.html
fs.copyFileSync(indexHtml, notFoundHtml);
console.log("gh-pages-postbuild: 已复制 index.html → 404.html（GitHub Pages SPA 回退）");

// 自定义域名：防止每次部署后 GitHub Pages Settings 里的 Custom domain 被清空
fs.writeFileSync(cnameFile, "ultrarock.net\n");
console.log("gh-pages-postbuild: 已写入 CNAME → ultrarock.net");
