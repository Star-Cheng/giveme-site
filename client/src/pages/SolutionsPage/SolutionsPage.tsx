import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/LangContext";

interface Solution {
  series: string;
  title: string;
  english: string;
  sector: string;
  challenge: string;
  pain: string;
  solution: string;
  metrics: string;
}

function useSolutions(): Solution[] {
  const { t } = useLang();
  return [
    {
      series: t("solutions.1.series"),
      title: t("solutions.1.title"),
      english: t("solutions.1.english"),
      sector: t("solutions.1.sector"),
      challenge: t("solutions.1.challenge"),
      pain: t("solutions.1.pain"),
      solution: t("solutions.1.solution"),
      metrics: t("solutions.1.metrics"),
    },
    {
      series: t("solutions.2.series"),
      title: t("solutions.2.title"),
      english: t("solutions.2.english"),
      sector: t("solutions.2.sector"),
      challenge: t("solutions.2.challenge"),
      pain: t("solutions.2.pain"),
      solution: t("solutions.2.solution"),
      metrics: t("solutions.2.metrics"),
    },
    {
      series: t("solutions.3.series"),
      title: t("solutions.3.title"),
      english: t("solutions.3.english"),
      sector: t("solutions.3.sector"),
      challenge: t("solutions.3.challenge"),
      pain: t("solutions.3.pain"),
      solution: t("solutions.3.solution"),
      metrics: t("solutions.3.metrics"),
    },
  ];
}

const FIELD_KEYS = [
  "solutions.field.1",
  "solutions.field.2",
  "solutions.field.3",
  "solutions.field.4",
  "solutions.field.5",
  "solutions.field.6",
];

export default function SolutionsPage() {
  const { t } = useLang();
  const solutions = useSolutions();
  useScrollReveal();

  return (
    <div className="pt-28">
      {/* HERO */}
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <p className="text-xs text-[#185abd] font-medium tracking-wider uppercase mb-4">{t("solutions.hero.badge")}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">
            {t("solutions.hero.title")}
          </h1>
          <p className="text-sm text-[#64748b] font-light max-w-2xl leading-relaxed">
            {t("solutions.hero.desc")}
          </p>
        </div>
      </section>

      {/* 方案卡片（Unitree 风格大卡片） */}
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {solutions.map((s, i) => (
              <div
                key={s.title}
                className={`animate-on-scroll delay-${(i + 1) * 100} rounded-2xl overflow-hidden bg-[#f8fafc] border border-[#f1f5f9] flex flex-col`}
              >
                <div className="p-6 flex-1">
                  <span className="text-xs text-[#185abd] font-medium tracking-wider uppercase">{s.series}</span>
                  <h3 className="text-xl font-bold text-[#0f172a] mt-2 mb-1">{s.title}</h3>
                  <p className="text-xs text-[#64748b] mb-4">{s.english}</p>
                  <p className="text-xs text-[#94a3b8] mb-6">{s.sector}</p>

                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-[#0f172a] mb-1">{t("solutions.card.challenge")}</p>
                      <p className="text-xs text-[#64748b] font-light leading-relaxed">{s.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0f172a] mb-1">{t("solutions.card.pain")}</p>
                      <p className="text-xs text-[#64748b] font-light leading-relaxed">{s.pain}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0f172a] mb-1">{t("solutions.card.solution")}</p>
                      <p className="text-xs text-[#64748b] font-light leading-relaxed">{s.solution}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="rounded-xl bg-white p-4 border border-[#f1f5f9]">
                    <p className="text-xs font-semibold text-[#185abd] mb-2">{t("solutions.card.metrics")}</p>
                    <p className="text-xs text-[#0f172a] font-medium leading-relaxed">{s.metrics}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 应用领域 */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-10">{t("solutions.fields")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {FIELD_KEYS.map((key) => (
              <div key={key} className="px-4 py-5 rounded-xl bg-white border border-[#f1f5f9] text-center text-sm font-medium text-[#0f172a]">
                {t(key)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 开放实验室 */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto bg-[#f8fafc] rounded-2xl p-8 md:p-10 border border-[#f1f5f9] flex flex-col md:flex-row gap-8 items-start">
            <div className="w-12 h-12 rounded-full bg-[#eff4fb] flex items-center justify-center shrink-0">
              <span className="text-xl">◇</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">{t("solutions.lab.title")}</h3>
              <p className="text-sm text-[#64748b] font-light leading-relaxed mb-6">
                {t("solutions.lab.desc")}
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white text-sm font-medium rounded-full hover:bg-[#185abd] transition-colors">
                {t("solutions.lab.cta")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
