import { useState, useEffect } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("全部");
  const [visibleWorks, setVisibleWorks] = useState(works);

  useEffect(() => {
    if (activeFilter === "全部") {
      setVisibleWorks(works);
    } else {
      setVisibleWorks(works.filter((w) => w.category === activeFilter));
    }
  }, [activeFilter]);

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

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    setTimeout(() => {
      const heroElements = document.querySelectorAll(".animate-hero");
      heroElements.forEach((el) => el.classList.add("visible"));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const categories = ["全部", ...new Set(works.map((w) => w.category))];

  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="section pb-12">
        <div className="container-custom">
          <span className="animate-hero text-xs tracking-widest uppercase text-brand font-medium">
            作品展示
          </span>
          <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl lg:text-6xl font-medium mt-4 mb-6">
            我的作品集
          </h1>
          <p className="animate-hero delay-200 text-lg text-muted-foreground font-light max-w-2xl">
            每一个项目都是一次全新的挑战。以下是我近年来的一部分代表作品，
            涵盖了品牌设计、包装设计、UI 设计等多个领域。
          </p>
        </div>
      </section>

      {/* 筛选器 */}
      <section className="pb-12">
        <div className="container-custom">
          <div className="animate-hero delay-300 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-light transition-all ${
                  activeFilter === cat
                    ? "bg-foreground text-background"
                    : "bg-card text-muted-foreground hover:bg-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 作品列表 */}
      <section className="section pt-0">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {visibleWorks.map((work, index) => (
              <article
                key={work.title}
                className={`animate-on-scroll delay-${(index % 4 + 1) * 100} group`}
              >
                <div className="relative overflow-hidden rounded-xl bg-card card-hover aspect-[4/3]">
                  {/* 图片占位 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-card via-border-light to-border" />
                  
                  {/* 装饰元素 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/5 to-transparent group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* 类别标签 */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium">
                    {work.category}
                  </span>

                  {/* 悬停遮罩 */}
                  <div className="absolute inset-0 bg-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href="#"
                      className="w-12 h-12 rounded-full bg-background text-foreground flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <button className="px-6 py-3 bg-background text-foreground text-sm font-medium rounded-full hover:bg-brand hover:text-white transition-colors flex items-center gap-2">
                      查看详情
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 作品信息 */}
                <div className="mt-5">
                  <h3 className="font-serif text-xl font-medium group-hover:text-brand transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light mt-2 line-clamp-2">
                    {work.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-card rounded text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 加载更多 */}
          <div className="text-center mt-16">
            <button className="btn-outline">
              加载更多作品
            </button>
          </div>
        </div>
      </section>

      {/* 合作流程 */}
      <section className="section bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="animate-on-scroll text-xs tracking-widest uppercase text-brand font-medium">
              合作流程
            </span>
            <h2 className="animate-on-scroll delay-100 font-serif text-3xl md:text-4xl font-medium mt-4">
              如何一起工作
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div
                key={step.title}
                className={`animate-on-scroll delay-${(index + 1) * 100} relative`}
              >
                <div className="text-6xl font-serif text-brand/10 mb-4">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-lg font-medium mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const works = [
  {
    title: "山茶花精品酒店",
    category: "品牌设计",
    description: "为杭州西湖边的精品酒店打造完整的品牌形象，从品牌策略到 VI 系统落地执行",
    tags: ["品牌策略", "VI设计", "导视系统"],
  },
  {
    title: "墨白茶饮",
    category: "包装设计",
    description: "新中式茶饮品牌全套视觉系统与产品包装设计，传递东方美学的现代诠释",
    tags: ["包装设计", "品牌视觉", "IP设计"],
  },
  {
    title: "星辰科技",
    category: "品牌设计",
    description: "为 AI 创业公司构建年轻化、国际化的品牌形象，完成品牌从 0 到 1 的建设",
    tags: ["品牌策略", "UI设计", "官网设计"],
  },
  {
    title: "溪涧度假民宿",
    category: "品牌设计",
    description: "为莫干山地区的精品民宿打造自然、禅意的品牌形象，融入在地文化元素",
    tags: ["品牌策略", "视觉设计", "文创产品"],
  },
  {
    title: "晨曦咖啡",
    category: "包装设计",
    description: "精品咖啡品牌全套包装设计，从豆袋到周边产品，打造独特的品牌体验",
    tags: ["包装设计", "周边设计", "品牌视觉"],
  },
  {
    title: "云端 SaaS 平台",
    category: "UI设计",
    description: "企业级 SaaS 产品的 UI 设计，从用户研究到界面设计，提升产品体验",
    tags: ["UI设计", "用户研究", "设计系统"],
  },
  {
    title: "悦己美妆",
    category: "品牌设计",
    description: "国产新锐美妆品牌全套品牌设计与包装设计，传达独立自信的女性态度",
    tags: ["品牌策略", "包装设计", "电商设计"],
  },
  {
    title: "竹里民宿",
    category: "品牌设计",
    description: "四川竹林深处的精品民宿品牌设计，将竹文化与当代设计语言完美融合",
    tags: ["品牌策略", "视觉设计", "空间导视"],
  },
];

const process = [
  {
    title: "需求沟通",
    description: "深入了解您的品牌现状、项目目标、预算周期，梳理核心需求",
  },
  {
    title: "策略提案",
    description: "基于调研分析，提供品牌策略方向和创意概念，确定设计方向",
  },
  {
    title: "设计执行",
    description: "分阶段交付设计稿，及时沟通反馈，确保方向一致高效推进",
  },
  {
    title: "落地支持",
    description: "提供设计源文件和制作规范，必要时协助供应商对接，确保完美落地",
  },
];
