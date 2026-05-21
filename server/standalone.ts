import express from "express";
import { contactRouter } from "./routes/contact";
import { resumeRouter } from "./routes/resume";

const port = Number(process.env.FORCE_SERVER_PORT) || 3000;
const host = process.env.FORCE_SERVER_HOST || "0.0.0.0";
const basePath = process.env.CLIENT_BASE_PATH || "/";

const app = express();
app.use(express.json());

// API 路由（纯 ECS 部署，不含平台中间件和 SSR 渲染）
const router = express.Router();
router.use("/api/contact-inquiries", contactRouter);
router.use("/api/resume-submissions", resumeRouter);

// 健康检查
router.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(basePath, router);

app.listen(port, host, () => {
  console.log(`[ultrarock-api] http://${host}:${port}${basePath}`);
});
