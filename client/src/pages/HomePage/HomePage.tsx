import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function HomePage() {
  useScrollReveal();
  const base = import.meta.env.BASE_URL;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      type: "hero",
      img: "gen-hero-laser-0.jpg",
      content: (
        <>
          <p className="text-base sm:text-lg text-[#64748b] tracking-[0.3em] mb-6">疾石科技</p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold italic leading-none tracking-tight text-[#0f172a] mb-6"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            Ultra Rock
          </h1>
          <p className="text-base sm:text-lg text-[#475569] font-light leading-relaxed max-w-md mb-8">
            智能超快激光器&ensp;·&ensp;极速造物，稳如磐石
          </p>
          <div className="flex gap-3">
            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white text-sm font-medium rounded-full hover:bg-[#185abd] transition-colors">
              探索产品 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-[#cbd5e1] text-[#0f172a] text-sm font-medium rounded-full hover:border-[#0f172a] transition-colors">
              预约交流
            </Link>
          </div>
        </>
      ),
    },
    ...products.map((p) => ({
      type: "product" as const,
      img: p.img,
      content: (
        <>
          <p className="text-xs text-[#185abd] font-medium tracking-wider uppercase mb-3">{p.tier}</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0f172a] mb-3">{p.name}</h2>
          <p className="text-sm text-[#64748b] mb-2">{p.series}</p>
          <p className="text-base text-[#475569] font-light leading-relaxed mb-8 max-w-md">{p.desc}</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white text-sm font-medium rounded-full hover:bg-[#185abd] transition-colors">
            了解更多 <ArrowRight className="w-4 h-4" />
          </Link>
        </>
      ),
    })),
  ];

  const next = useCallback(() => setActiveIndex((prev) => (prev + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <div>
      {/* ================================================================
          HERO 轮播（Unitree 风格：首屏即轮播，品牌页 + 3产品页）
          ================================================================ */}
      <section
        className="relative min-h-screen overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img src={`${base}${s.img}`} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />

            <div className="absolute inset-0 flex items-end pb-20 sm:pb-28">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-10 w-full">
                <div className="max-w-2xl">
                  {s.content}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 左右箭头 */}
        <button onClick={prev} className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#e2e8f0] flex items-center justify-center hover:bg-white transition-colors shadow-sm">
          <ChevronLeft className="w-5 h-5 text-[#0f172a]" />
        </button>
        <button onClick={next} className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#e2e8f0] flex items-center justify-center hover:bg-white transition-colors shadow-sm">
          <ChevronRight className="w-5 h-5 text-[#0f172a]" />
        </button>

        {/* 圆点指示器 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? "bg-[#0f172a] w-6" : "bg-[#cbd5e1] w-2 hover:bg-[#94a3b8]"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================================================================
          三段式品牌叙事
          ================================================================ */}
      <section className="py-20 sm:py-28 bg-[#f8fafc]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              { icon: "⚡", title: "疾 · Ultra Speed", body: "一飞秒，是一秒的千万亿分之一。在这个时间尺度里，光只走了 0.3 微米。我们控制的，是时间的极限。" },
              { icon: "🪨", title: "石 · Rock Solid", body: "当别人在谈论能做多快，我们在证明能做多稳。无微裂纹、无热影响、无材料损伤——这是我们的标准。" },
              { icon: "◎", title: "智能 · Intelligent", body: "把极致的动态，交给极致的算法。智能，是疾与石之间唯一的桥梁。" },
            ].map((item, i) => (
              <div key={item.title} className={`animate-on-scroll delay-${(i + 1) * 100}`}>
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-3">{item.title}</h3>
                <p className="text-sm text-[#64748b] font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          品牌金句
          ================================================================ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <div className="animate-on-scroll max-w-2xl mx-auto">
            <p className="text-2xl md:text-3xl text-[#0f172a] font-light leading-relaxed italic">
              "它和地球一样古老。我们用飞秒的速度，在上面书写新的故事。"
            </p>
            <div className="w-10 h-px bg-[#cbd5e1] mx-auto mt-10 mb-6" />
            <p className="text-base font-bold text-[#0f172a] tracking-wider">Ultra Speed. Rock Solid.</p>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-4">与光子一起，重新定义工艺极限</h2>
            <p className="text-sm text-[#64748b] font-light mb-8 max-w-md mx-auto">
              预约技术交流，了解疾石智能超快激光器如何为您的材料与工艺提供飞秒级精密解决方案。
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0f172a] text-white text-sm font-medium rounded-full hover:bg-[#185abd] transition-colors">
              预约技术交流 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const products = [
  { tier: "基础款", name: "RockSolid R-1", series: "磐石系列", desc: "可靠基础。飞秒冷加工覆盖主流硬脆材料，稳定、耐用、易集成。", img: "gen-product-rocksolid-0.jpg" },
  { tier: "中高端", name: "FluxBeam F-1", series: "砺流系列", desc: "为复杂工艺而生。更高精度、更快节拍、AI 自适应多材料混合产线。", img: "gen-product-fluxbeam-0.jpg" },
  { tier: "高端", name: "UltraLight U-1", series: "疾光系列", desc: "极限精度旗舰。逼近衍射极限，面向半导体前沿与科研定制。", img: "gen-product-ultralight-0.jpg" },
];
