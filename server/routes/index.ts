import type { Router } from "express";
import { registerViewRoute } from "./view";
import { contactRouter } from "./contact";
import { resumeRouter } from "./resume";
// import postsRouter from "./posts";

export function registerRoutes(router: Router) {
  router.use("/api/contact-inquiries", contactRouter);
  router.use("/api/resume-submissions", resumeRouter);

  // HTML 页面渲染（catch-all，必须放在最后）
  registerViewRoute(router);
}
