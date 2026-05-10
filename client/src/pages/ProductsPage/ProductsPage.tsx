import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/LangContext";

export default function ProductsPage() {
  useScrollReveal();
  const { t } = useLang();
  const base = import.meta.env.BASE_URL;

  const laserSeries = [
    {
      tierKey: "products.series.rocksolid.tier",
      nameKey: "products.series.rocksolid.name",
      english: "RockSolid Laser",
      model: "R-1",
      descKey: "products.series.rocksolid.desc",
      img: "gen-product-rocksolid-0.jpg",
      specs: [
        { k: t("products.specs.pulseWidth"), v: "< 800 fs" },
        { k: t("products.specs.wavelength"), v: "1064/532 nm" },
        { k: t("products.specs.beamQuality"), v: "≤ 1.5" },
        { k: t("products.specs.repeatability"), v: "±2 μm" },
      ],
    },
    {
      tierKey: "products.series.fluxbeam.tier",
      nameKey: "products.series.fluxbeam.name",
      english: "FluxBeam Laser",
      model: "F-1",
      descKey: "products.series.fluxbeam.desc",
      img: "gen-product-fluxbeam-0.jpg",
      specs: [
        { k: t("products.specs.pulseWidth"), v: "< 500 fs" },
        { k: t("products.specs.wavelength"), v: "355/532/1064 nm" },
        { k: t("products.specs.beamQuality"), v: "≤ 1.3" },
        { k: t("products.specs.repeatability"), v: "±1 μm" },
      ],
    },
    {
      tierKey: "products.series.ultralight.tier",
      nameKey: "products.series.ultralight.name",
      english: "UltraLight Laser",
      model: "U-1",
      descKey: "products.series.ultralight.desc",
      img: "gen-product-ultralight-0.jpg",
      specs: [
        { k: t("products.specs.pulseWidth"), v: "< 300 fs" },
        { k: t("products.specs.wavelength"), v: "355/532/1064 nm" },
        { k: t("products.specs.beamQuality"), v: "≤ 1.1" },
        { k: t("products.specs.repeatability"), v: "±0.5 μm" },
      ],
    },
  ];

  const rockCore = [
    { nameKey: "products.rockcore.1.name", english: "Platform OS", descKey: "products.rockcore.1.desc" },
    { nameKey: "products.rockcore.2.name", english: "VisionPack", descKey: "products.rockcore.2.desc" },
    { nameKey: "products.rockcore.3.name", english: "ProcessDB", descKey: "products.rockcore.3.desc" },
    { nameKey: "products.rockcore.4.name", english: "Controller", descKey: "products.rockcore.4.desc" },
  ];

  return (
    <div className="pt-28">
      {/* HERO */}
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs text-[#185abd] font-medium tracking-wider uppercase mb-4">{t("products.hero.badge")}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">
                {t("products.hero.title")}
                <br />
                <span className="text-[#185abd]">{t("products.hero.subtitle")}</span>
              </h1>
              <p className="text-sm text-[#64748b] font-light leading-relaxed max-w-lg">
                {t("products.hero.desc")}
              </p>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-[#f1f5f9]">
              <img src={`${base}gen-hero-laser-0.jpg`} alt="Ultra Rock Laser" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 三大激光系列 */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-10">{t("products.lasers")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {laserSeries.map((s, i) => (
              <div key={s.nameKey} className={`animate-on-scroll delay-${(i + 1) * 100} bg-white rounded-2xl overflow-hidden border border-[#f1f5f9]`}>
                <div className="aspect-[4/3] bg-[#f1f5f9] overflow-hidden">
                  <img src={`${base}${s.img}`} alt={t(s.nameKey)} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <span className="text-xs text-[#185abd] font-medium tracking-wider uppercase">{t(s.tierKey)}</span>
                  <h3 className="text-xl font-bold text-[#0f172a] mt-2 mb-1">{t(s.nameKey)}</h3>
                  <p className="text-xs text-[#64748b] mb-3">{s.english} {s.model}</p>
                  <p className="text-sm text-[#64748b] font-light leading-relaxed mb-4">{t(s.descKey)}</p>
                  <table className="w-full text-xs">
                    <tbody>
                      {s.specs.slice(0, 3).map((r) => (
                        <tr key={r.k} className="border-b border-[#f1f5f9] last:border-0">
                          <td className="py-2 text-[#94a3b8]">{r.k}</td>
                          <td className="py-2 text-[#0f172a] text-right">{r.v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RockCore 石核 */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-2">{t("products.rockcore.title")}</h2>
          <p className="text-sm text-[#64748b] font-light mb-10">{t("products.rockcore.desc")}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rockCore.map((rc) => (
              <div key={rc.nameKey} className="p-5 rounded-2xl bg-[#f8fafc] border border-[#f1f5f9]">
                <p className="text-sm font-bold text-[#0f172a] mb-1">{t(rc.nameKey)}</p>
                <p className="text-[10px] text-[#185abd] font-medium tracking-wider uppercase mb-2">{rc.english}</p>
                <p className="text-xs text-[#64748b] font-light leading-relaxed">{t(rc.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 命名体系 */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-10">{t("products.naming.title")}</h2>
          <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                  <th className="p-4 text-left text-xs font-medium text-[#64748b]">{t("products.naming.cat.1")}</th>
                  <th className="p-4 text-left text-xs font-medium text-[#64748b]">{t("products.naming.code.1")}</th>
                  <th className="p-4 text-left text-xs font-medium text-[#64748b]">{t("products.naming.ex.1")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [t("products.naming.cat.1"), t("products.naming.code.1"), t("products.naming.ex.1")],
                  [t("products.naming.cat.2"), t("products.naming.code.2"), t("products.naming.ex.2")],
                  [t("products.naming.cat.3"), t("products.naming.code.3"), t("products.naming.ex.3")],
                  [t("products.naming.cat.4"), t("products.naming.code.4"), t("products.naming.ex.4")],
                  [t("products.naming.cat.5"), t("products.naming.code.5"), t("products.naming.ex.5")],
                  [t("products.naming.cat.6"), t("products.naming.code.6"), t("products.naming.ex.6")],
                ].map((r, i) => (
                  <tr key={i} className="border-b border-[#f1f5f9] last:border-0">
                    <td className="p-4 font-medium text-[#0f172a]">{r[0]}</td>
                    <td className="p-4 text-[#185abd] font-medium">{r[1]}</td>
                    <td className="p-4 text-[#64748b]">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0f172a] text-white text-sm font-medium rounded-full hover:bg-[#185abd] transition-colors">
          {t("products.cta")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
