import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/LangContext";

export default function AboutPage() {
  useScrollReveal();
  const { t } = useLang();
  const base = import.meta.env.BASE_URL;

  return (
    <div className="pt-28">
      {/* ================================================================
          HERO — 公司简介
          ================================================================ */}
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs text-[#185abd] font-medium tracking-wider uppercase mb-4">{t("about.hero.badge")}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-6 leading-tight">
                {t("about.hero.title")}
              </h1>
              <div className="space-y-4 text-sm text-[#475569] font-light leading-relaxed">
                <p>
                  {t("about.hero.p1")}
                </p>
                <p>
                  {t("about.hero.p2")}
                </p>
                <p>
                  {t("about.hero.p3")}
                </p>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#f1f5f9]">
              <img src={`${base}gen-lab-scene-0.jpg`} alt="疾石科技实验室" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          文化理念（Unitree 风格：愿景 / 使命 / 文化 / 战略）
          ================================================================ */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <h2 className="text-2xl font-bold text-[#0f172a] text-center mb-12">{t("about.culture.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t("about.culture.vision.title"), en: t("about.culture.vision.en"), body: t("about.culture.vision.body") },
              { title: t("about.culture.mission.title"), en: t("about.culture.mission.en"), body: t("about.culture.mission.body") },
              { title: t("about.culture.culture.title"), en: t("about.culture.culture.en"), body: t("about.culture.culture.body") },
              { title: t("about.culture.action.title"), en: t("about.culture.action.en"), body: t("about.culture.action.body") },
            ].map((item, i) => (
              <div key={item.title} className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-2xl bg-white border border-[#f1f5f9]`}>
                <p className="text-xs text-[#185abd] font-medium tracking-wider uppercase mb-2">{item.en}</p>
                <h3 className="text-lg font-bold text-[#0f172a] mb-3">{item.title}</h3>
                <p className="text-sm text-[#64748b] font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          社会贡献
          ================================================================ */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <h2 className="text-2xl font-bold text-[#0f172a] text-center mb-4">{t("about.social.title")}</h2>
          <p className="text-sm text-[#64748b] font-light text-center max-w-2xl mx-auto mb-12">
            {t("about.social.desc")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: t("about.social.1.title"), desc: t("about.social.1.desc") },
              { title: t("about.social.2.title"), desc: t("about.social.2.desc") },
              { title: t("about.social.3.title"), desc: t("about.social.3.desc") },
            ].map((item, i) => (
              <div key={item.title} className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-2xl bg-[#f8fafc] border border-[#f1f5f9] text-center`}>
                <div className="w-12 h-12 rounded-full bg-[#eff4fb] flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">{(i === 0 ? "◆" : i === 1 ? "◇" : "◎")}</span>
                </div>
                <h3 className="font-bold text-[#0f172a] mb-2">{item.title}</h3>
                <p className="text-sm text-[#64748b] font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          创始人寄语
          ================================================================ */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#0f172a] mb-10">{t("about.founder.title")}</h2>
            <blockquote className="text-lg md:text-xl text-[#475569] font-light leading-relaxed italic mb-8">
              {t("about.founder.quote")}
            </blockquote>
            <p className="text-sm text-[#64748b] font-medium">{t("about.founder.signature")}</p>
          </div>
        </div>
      </section>

      {/* ================================================================
          公司发展轴（Unitree 风格：详细年表）
          ================================================================ */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0f172a] text-center mb-14">{t("about.timeline.title")}</h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`animate-on-scroll delay-${(i + 1) * 80} relative pl-12 pb-14 ${
                  i < timeline.length - 1 ? "border-l-2 border-[#e2e8f0]" : ""
                }`}
              >
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-[#185abd]" />
                <span className="text-sm font-bold text-[#185abd]">{item.year}</span>
                <h3 className="text-base font-bold text-[#0f172a] mt-2 mb-2">{t(item.titleKey)}</h3>
                <p className="text-sm text-[#64748b] font-light leading-relaxed">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const timeline = [
  {
    year: "2026",
    titleKey: "about.timeline.2026.title",
    descKey: "about.timeline.2026.desc",
  },
  {
    year: "2025",
    titleKey: "about.timeline.2025.title",
    descKey: "about.timeline.2025.desc",
  },
  {
    year: "2024",
    titleKey: "about.timeline.2024.title",
    descKey: "about.timeline.2024.desc",
  },
  {
    year: "2023",
    titleKey: "about.timeline.2023.title",
    descKey: "about.timeline.2023.desc",
  },
  {
    year: "2022",
    titleKey: "about.timeline.2022.title",
    descKey: "about.timeline.2022.desc",
  },
  {
    year: "2021",
    titleKey: "about.timeline.2021.title",
    descKey: "about.timeline.2021.desc",
  },
];
