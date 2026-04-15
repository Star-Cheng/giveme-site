import type { Router } from "express";
import { registerViewRoute } from "./view";
import { contactRouter } from "./contact";
// import postsRouter from "./posts";

export function registerRoutes(router: Router) {
  router.use("/api/contact-inquiries", contactRouter);

  // HTML 页面渲染（catch-all，必须放在最后）
  registerViewRoute(router);
}
