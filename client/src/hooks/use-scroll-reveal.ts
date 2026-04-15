import { useEffect } from "react";

/** 为带 .animate-on-scroll / .animate-hero 的元素挂载滚动入场观察（与各页现有 class 一致） */
export function useScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    const t = window.setTimeout(() => {
      document.querySelectorAll(".animate-hero").forEach((el) => {
        el.classList.add("visible");
      });
    }, 100);

    return () => {
      window.clearTimeout(t);
      observer.disconnect();
    };
  }, []);
}
