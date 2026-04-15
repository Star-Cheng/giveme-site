import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowRight, Cpu, Sparkles, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function HomePage() {
  useScrollReveal();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.querySelectorAll(".parallax-slow").forEach((el) => {
        const speed = 0.25;
        (el as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 via-transparent to-primary/5" />
          <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] rounded-full bg-cyan-500/5 blur-3xl parallax-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl parallax-slow" />
        </div>

        <div className="container-custom text-center">
          <div className="animate-hero delay-100 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full text-xs font-medium text-muted-foreground tracking-wider uppercase border border-border-light">
              <Sparkles className="w-3 h-3 text-brand" />
              ZeStone Laser · 智石激光
            </span>
          </div>

          <h1 className="animate-hero delay-200 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 max-w-5xl mx-auto">
            <span className="block">AI 驱动的下一代</span>
            <span className="block text-brand italic">高精度智能激光器</span>
          </h1>

          <p className="animate-hero delay-300 text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-4 leading-relaxed">
            不做工具人，做领域的开创者。
          </p>
          <p className="animate-hero delay-300 text-sm md:text-base text-muted-foreground/90 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            以开放、创新、自由与精益求精为底色，让光子与算法在产线上同频——精度可度量、工艺可迭代、人才被尊重。
          </p>

          <div className="animate-hero delay-400 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Link to="/products" className="btn-primary group">
              探索产品
              <ArrowRight className="w-4 h-4 arrow-icon" />
            </Link>
            <Link to="/contact" className="btn-outline">
              预约技术交流
            </Link>
            <Link to="/careers" className="btn-outline">
              加入我们
            </Link>
          </div>

          <p className="animate-hero delay-500 mt-16 text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
            主视觉示意：微米级加工动态与 AI 实时优化光路的抽象表达。合作伙伴 Logo、专利与认证标识可在取得授权后置于本区域下方。
          </p>

          <div className="animate-hero delay-500 absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs tracking-widest uppercase font-light">向下探索</span>
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-border to-transparent" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50 border-y border-border-light">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {[
              { icon: Zap, k: "±1 μm 级", label: "重复定位精度（典型工况，以机型为准）" },
              { icon: Cpu, k: "< 250 μs", label: "闭环响应架构目标" },
              { icon: Sparkles, k: "AI 自适应", label: "焦点自优化 · 热漂移补偿 · 路径智能规划" },
              { icon: ArrowRight, k: "OTA 策略", label: "工艺包持续演进" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`animate-on-scroll text-center md:text-left delay-${(index + 1) * 100}`}
              >
                <div className="inline-flex md:flex mb-3 text-brand justify-center md:justify-start">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-2">
                  {stat.k}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="animate-on-scroll text-xs tracking-widest uppercase text-brand font-medium">
                产品系列
              </span>
              <h2 className="animate-on-scroll delay-100 font-serif text-3xl md:text-4xl font-medium mt-4">
                AI + 高精度，场景化交付
              </h2>
            </div>
            <Link
              to="/products"
              className="animate-on-scroll delay-200 inline-flex items-center gap-2 text-sm font-medium hover:text-brand transition-colors group"
            >
              进入产品中心
              <ArrowRight className="w-4 h-4 arrow-icon" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productTeasers.map((item, index) => (
              <Link
                key={item.title}
                to="/products"
                className={`animate-on-scroll delay-${(index + 1) * 100} group block rounded-xl border border-border bg-card p-8 card-hover`}
              >
                <h3 className="font-serif text-xl font-medium mb-2 group-hover:text-brand transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
                  {item.desc}
                </p>
                <span className="text-xs text-brand font-medium">查看参数与 AI 亮点 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-card/30">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <span className="animate-on-scroll text-xs tracking-widest uppercase text-brand font-medium">
            信任与合规（占位）
          </span>
          <p className="animate-on-scroll delay-100 text-muted-foreground font-light mt-4 mb-8 leading-relaxed">
            战略合作伙伴标识、已授权专利数量、CE / RoHS / 激光安全等级等认证，待市场与法务确认后替换本段文案与 Logo 墙。
          </p>
          <div className="animate-on-scroll delay-200 flex flex-wrap justify-center gap-3">
            {["半导体", "医疗精密", "航空航天", "新能源"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full border border-border text-xs text-muted-foreground"
              >
                {tag} · 试点与联合实验室
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="animate-on-scroll relative overflow-hidden rounded-2xl bg-foreground text-background p-12 md:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
                与光子一起，重新定义工艺极限
              </h2>
              <p className="text-background/70 font-light max-w-lg mx-auto mb-8">
                预约技术交流或加入「开放实验室」，与光学、AI、机械、材料等领域的同路人并肩迭代。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-medium hover:bg-brand hover:text-white transition-colors"
                >
                  预约技术交流
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-background/40 text-background font-medium hover:bg-background/10 transition-colors"
                >
                  解决方案与案例
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const productTeasers = [
  {
    title: "微加工系列",
    desc: "脆硬材料微槽、微孔与精密切割；AI 抑制崩边与锥度漂移。",
  },
  {
    title: "精密焊接系列",
    desc: "薄材与异种金属；热影响区与飞溅的实时预测与参数回退。",
  },
  {
    title: "表面处理系列",
    desc: "清洗、纹理化与选择性改性；路径与能量分布协同优化。",
  },
];
