import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Shield, Cpu } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/LangContext";

const products = [
  { tierKey: "home.slide.hero.tier", name: "RockSolid R-1", seriesKey: "home.slide.hero.series", descKey: "home.slide.hero.desc", img: "gen-product-rocksolid-0.jpg" },
  { tierKey: "home.slide.mid.tier", name: "FluxBeam F-1", seriesKey: "home.slide.mid.series", descKey: "home.slide.mid.desc", img: "gen-product-fluxbeam-0.jpg" },
  { tierKey: "home.slide.high.tier", name: "UltraLight U-1", seriesKey: "home.slide.high.series", descKey: "home.slide.high.desc", img: "gen-product-ultralight-0.jpg" },
];

export default function HomePage() {
  useScrollReveal();
  const { t } = useLang();
  const base = import.meta.env.BASE_URL;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = 4; // 0=hero, 1-3=products
  const next = useCallback(() => setActiveIndex((prev) => (prev + 1) % slides), []);
  const prev = useCallback(() => setActiveIndex((prev) => (prev - 1 + slides) % slides), []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const zones = [
    { Icon: Zap, title: t("home.zone.speed.title"), body: t("home.zone.speed.body") },
    { Icon: Shield, title: t("home.zone.rock.title"), body: t("home.zone.rock.body") },
    { Icon: Cpu, title: t("home.zone.ai.title"), body: t("home.zone.ai.body") },
  ];

  return (
    <div>
      {/* ================================================================
          HERO 轮播
          ================================================================ */}
      <section
        className="relative min-h-screen overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slide 0: Brand */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === 0 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <img src={`${base}gen-hero-laser-0.jpg`} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
          <div className="absolute inset-0 flex items-end pb-20 sm:pb-28">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10 w-full">
              <div className="max-w-2xl">
                <p className="text-base sm:text-lg text-[#64748b] tracking-[0.3em] mb-6">{t("home.brand.cn")}</p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold italic leading-none tracking-tight text-[#0f172a] mb-6" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Ultra Rock</h1>
                <p className="text-base sm:text-lg text-[#475569] font-light leading-relaxed max-w-md mb-8">{t("home.brand.tagline")}</p>
                <div className="flex gap-3">
                  <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white text-sm font-medium rounded-full hover:bg-[#185abd] transition-colors">{t("home.cta.explore")} <ArrowRight className="w-4 h-4" /></Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-[#cbd5e1] text-[#0f172a] text-sm font-medium rounded-full hover:border-[#0f172a] transition-colors">{t("home.cta.contact")}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slides 1-3: Products */}
        {products.map((p, i) => (
          <div key={p.name} className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === i + 1 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
            <img src={`${base}${p.img}`} alt={p.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
            <div className="absolute inset-0 flex items-end pb-20 sm:pb-28">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-10 w-full">
                <div className="max-w-2xl">
                  <p className="text-xs text-[#185abd] font-medium tracking-wider uppercase mb-3">{t(p.tierKey)}</p>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0f172a] mb-3">{p.name}</h2>
                  <p className="text-sm text-[#64748b] mb-2">{t(p.seriesKey)}</p>
                  <p className="text-base text-[#475569] font-light leading-relaxed mb-8 max-w-md">{t(p.descKey)}</p>
                  <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white text-sm font-medium rounded-full hover:bg-[#185abd] transition-colors">{t("home.slide.learn")} <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button onClick={prev} className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#e2e8f0] flex items-center justify-center hover:bg-white transition-colors shadow-sm"><ChevronLeft className="w-5 h-5 text-[#0f172a]" /></button>
        <button onClick={next} className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#e2e8f0] flex items-center justify-center hover:bg-white transition-colors shadow-sm"><ChevronRight className="w-5 h-5 text-[#0f172a]" /></button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {Array.from({ length: slides }).map((_, i) => (
            <button key={i} onClick={() => setActiveIndex(i)} className={`h-2 rounded-full transition-all ${i === activeIndex ? "bg-[#0f172a] w-6" : "bg-[#cbd5e1] w-2 hover:bg-[#94a3b8]"}`} />
          ))}
        </div>
      </section>

      {/* Three Zones */}
      <section className="py-20 sm:py-28 bg-[#f8fafc]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {zones.map(({ Icon, title, body }, i) => (
              <div key={title} className={`animate-on-scroll delay-${(i + 1) * 100}`}>
                <Icon className="w-6 h-6 text-[#0f172a] mb-4" />
                <h3 className="text-lg font-bold text-[#0f172a] mb-3">{title}</h3>
                <p className="text-sm text-[#64748b] font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <div className="animate-on-scroll max-w-2xl mx-auto">
            <p className="text-2xl md:text-3xl text-[#0f172a] font-light leading-relaxed italic">{t("home.quote")}</p>
            <div className="w-10 h-px bg-[#cbd5e1] mx-auto mt-10 mb-6" />
            <p className="text-base font-bold text-[#0f172a] tracking-wider">{t("home.quote.slogan")}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-4">{t("home.cta.title")}</h2>
            <p className="text-sm text-[#64748b] font-light mb-8 max-w-md mx-auto">{t("home.cta.desc")}</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0f172a] text-white text-sm font-medium rounded-full hover:bg-[#185abd] transition-colors">{t("home.cta.button")} <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
