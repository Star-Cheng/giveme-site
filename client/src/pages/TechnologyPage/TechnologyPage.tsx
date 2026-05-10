import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/LangContext";

export default function TechnologyPage() {
  useScrollReveal();
  const { t } = useLang();
  const base = import.meta.env.BASE_URL;

  const pillars = [
    {
      title: t("tech.speed.title"),
      en: t("tech.speed.en"),
      color: "text-[#185abd]",
      bg: "bg-[#eff4fb]",
      desc: t("tech.speed.desc"),
      img: "gen-tech-speed-0.jpg",
      quote: t("tech.speed.quote"),
      items: [
        [t("tech.speed.item.1.title"), t("tech.speed.item.1.desc")],
        [t("tech.speed.item.2.title"), t("tech.speed.item.2.desc")],
        [t("tech.speed.item.3.title"), t("tech.speed.item.3.desc")],
        [t("tech.speed.item.4.title"), t("tech.speed.item.4.desc")],
      ],
    },
    {
      title: t("tech.rock.title"),
      en: t("tech.rock.en"),
      color: "text-[#0f172a]",
      bg: "bg-[#f8fafc]",
      desc: t("tech.rock.desc"),
      img: "gen-tech-material-0.jpg",
      quote: t("tech.rock.quote"),
      items: [
        [t("tech.rock.item.1.title"), t("tech.rock.item.1.desc")],
        [t("tech.rock.item.2.title"), t("tech.rock.item.2.desc")],
        [t("tech.rock.item.3.title"), t("tech.rock.item.3.desc")],
        [t("tech.rock.item.4.title"), t("tech.rock.item.4.desc")],
      ],
    },
    {
      title: t("tech.ai.title"),
      en: t("tech.ai.en"),
      color: "text-[#185abd]",
      bg: "bg-[#eff4fb]",
      desc: t("tech.ai.desc"),
      img: "gen-tech-ai-0.jpg",
      quote: t("tech.ai.quote"),
      items: [
        [t("tech.ai.item.1.title"), t("tech.ai.item.1.desc")],
        [t("tech.ai.item.2.title"), t("tech.ai.item.2.desc")],
        [t("tech.ai.item.3.title"), t("tech.ai.item.3.desc")],
        [t("tech.ai.item.4.title"), t("tech.ai.item.4.desc")],
      ],
    },
  ];

  const params = [
    [t("tech.params.1.label"), t("tech.params.1.value")],
    [t("tech.params.2.label"), t("tech.params.2.value")],
    [t("tech.params.3.label"), t("tech.params.3.value")],
    [t("tech.params.4.label"), t("tech.params.4.value")],
    [t("tech.params.5.label"), t("tech.params.5.value")],
    [t("tech.params.6.label"), t("tech.params.6.value")],
  ];

  return (
    <div className="pt-28">
      {/* HERO */}
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <p className="text-xs text-[#185abd] font-medium tracking-wider uppercase mb-4">{t("tech.hero.badge")}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">{t("tech.hero.title")}</h1>
          <p className="text-sm text-[#64748b] font-light max-w-2xl leading-relaxed">
            {t("tech.hero.desc")}
          </p>
        </div>
      </section>

      {/* 三大支柱 */}
      {pillars.map((pillar, pi) => (
        <section key={pillar.title} className={`py-16 ${pillar.bg}`}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={pi % 2 === 1 ? "lg:order-2" : ""}>
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#f1f5f9]">
                  <img src={`${base}${pillar.img}`} alt={pillar.title} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className={pi % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className={`text-4xl font-bold mb-2 ${pillar.color}`}>{pillar.title}</h2>
                <p className="text-sm text-[#64748b] tracking-wider uppercase font-medium mb-4">{pillar.en}</p>
                <p className="text-sm text-[#475569] font-light leading-relaxed mb-8">{pillar.desc}</p>
                <div className="space-y-3 mb-8">
                  {pillar.items.map(([t_label, d]) => (
                    <div key={t_label}>
                      <p className="text-sm font-semibold text-[#0f172a]">{t_label}</p>
                      <p className="text-xs text-[#64748b] font-light">{d}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="text-base text-[#475569] font-light italic border-l-2 border-[#e2e8f0] pl-4">
                  {pillar.quote}
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* 参数概览 */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0f172a] text-center mb-10">{t("tech.params.title")}</h2>
          <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                  <th className="p-4 text-left text-xs font-medium text-[#64748b]">{t("tech.params.col.param")}</th>
                  <th className="p-4 text-left text-xs font-medium text-[#64748b]">{t("tech.params.col.value")}</th>
                </tr>
              </thead>
              <tbody>
                {params.map(([p, v]) => (
                  <tr key={p} className="border-b border-[#f1f5f9] last:border-0">
                    <td className="p-4 text-[#64748b]">{p}</td>
                    <td className="p-4 text-[#0f172a]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="pb-20 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0f172a] text-white text-sm font-medium rounded-full hover:bg-[#185abd] transition-colors">
          {t("tech.cta")} <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
