import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 入场动画
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

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    // Hero 元素立即显示
    setTimeout(() => {
      const heroElements = document.querySelectorAll(".animate-hero");
      heroElements.forEach((el) => el.classList.add("visible"));
    }, 100);

    return () => observer.disconnect();
  }, []);

  // 滚动视差效果
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroElements = document.querySelectorAll(".parallax-slow");
      heroElements.forEach((el) => {
        const speed = 0.3;
        const yPos = scrolled * speed;
        (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Hero 区域 */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 装饰背景 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl parallax-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl parallax-slow" />
        </div>

        <div className="container-custom text-center">
          {/* 标签 */}
          <div className="animate-hero delay-100 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full text-xs font-medium text-muted-foreground tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-brand" />
              创意设计师 & 品牌策划
            </span>
          </div>

          {/* 主标题 */}
          <h1 className="animate-hero delay-200 font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-6">
            <span className="block">设计不只是好看</span>
            <span className="block text-brand italic">
              而是让品牌说话
            </span>
          </h1>

          {/* 副标题 */}
          <p className="animate-hero delay-300 text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            八年深耕品牌设计与数字体验，帮助创业者和成长型企业构建有温度、有辨识度的视觉形象
          </p>

          {/* CTA 按钮 */}
          <div className="animate-hero delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/portfolio" className="btn-primary group">
              查看作品集
              <ArrowRight className="w-4 h-4 arrow-icon" />
            </Link>
            <Link to="/contact" className="btn-outline">
              发起合作
            </Link>
          </div>

          {/* 滚动提示 */}
          <div className="animate-hero delay-500 absolute bottom-12 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-xs tracking-widest uppercase font-light">
                向下探索
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 数据展示 */}
      <section ref={statsRef} className="py-20 bg-card/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { number: "8+", label: "年设计经验" },
              { number: "200+", label: "完成项目" },
              { number: "50+", label: "合作品牌" },
              { number: "12", label: "国际奖项" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`animate-on-scroll text-center delay-${(index + 1) * 100}`}
              >
                <div className="font-serif text-4xl md:text-5xl font-medium text-brand mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 精选作品 */}
      <section className="section">
        <div className="container-custom">
          {/* 标题区 */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="animate-on-scroll text-xs tracking-widest uppercase text-brand font-medium">
                精选作品
              </span>
              <h2 className="animate-on-scroll delay-100 font-serif text-3xl md:text-4xl font-medium mt-4">
                每一个作品都是一个故事
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="animate-on-scroll delay-200 inline-flex items-center gap-2 text-sm font-medium hover:text-brand transition-colors group"
            >
              查看全部作品
              <ArrowRight className="w-4 h-4 arrow-icon" />
            </Link>
          </div>

          {/* 作品网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {featuredWorks.map((work, index) => (
              <Link
                key={work.title}
                to="/portfolio"
                className={`animate-on-scroll delay-${(index + 1) * 100} group block ${
                  index === 0 ? "md:row-span-2" : ""
                }`}
              >
                <article
                  className={`relative overflow-hidden rounded-lg bg-card card-hover ${
                    index === 0 ? "aspect-[4/5] md:aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                >
                  {/* 图片占位 - 使用渐变色 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-card to-border-light group-hover:to-border transition-colors" />
                  
                  {/* 装饰图案 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-transparent group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* 内容 */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <span className="text-xs font-medium text-brand mb-2">
                      {work.category}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl font-medium text-white mb-2">
                      {work.title}
                    </h3>
                    <p className="text-sm text-white/70 font-light line-clamp-2">
                      {work.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 服务理念 */}
      <section className="section bg-card/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="animate-on-scroll text-xs tracking-widest uppercase text-brand font-medium">
              设计理念
            </span>
            <blockquote className="animate-on-scroll delay-100 font-serif text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed mt-6 mb-8">
              "好的设计是尽可能少的设计。每一个细节都应该服务于整体，
              <span className="text-brand italic"> 每一处留白都应该有存在的意义。</span>"
            </blockquote>
            <div className="animate-on-scroll delay-200 flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-brand" />
              <span className="text-sm text-muted-foreground font-light">
                陈思远
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="section">
        <div className="container-custom">
          <div className="animate-on-scroll relative overflow-hidden rounded-2xl bg-foreground text-background p-12 md:p-16 text-center">
            {/* 装饰 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
                准备好开始你的项目了吗？
              </h2>
              <p className="text-background/70 font-light max-w-lg mx-auto mb-8">
                从品牌定位到视觉呈现，我将与您一起打造独特的品牌形象
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-medium hover:bg-brand hover:text-white transition-colors">
                预约咨询
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// 精选作品数据
const featuredWorks = [
  {
    title: "山茶花精品酒店",
    category: "品牌设计",
    description: "为一家位于杭州的精品酒店打造完整的品牌形象，包括 LOGO、VI 系统和导视设计",
  },
  {
    title: "墨白茶饮",
    category: "包装设计",
    description: "新中式茶饮品牌全套视觉系统与产品包装设计",
  },
  {
    title: "星辰科技",
    category: "品牌重塑",
    description: "为 AI 创业公司构建年轻化、国际化的品牌形象",
  },
];
