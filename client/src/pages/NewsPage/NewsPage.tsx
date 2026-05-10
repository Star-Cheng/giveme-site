import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/LangContext";

export default function NewsPage() {
  useScrollReveal();
  const { t } = useLang();

  return (
    <div className="pt-28">
      {/* HERO */}
      <section className="section pb-12">
        <div className="container-custom">
          <span className="animate-hero text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
            {t("news.hero.badge")}
          </span>
          <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl font-medium mt-4 mb-6 leading-tight">
            {t("news.hero.title")}
          </h1>
          <p className="animate-hero delay-200 text-muted-foreground font-light max-w-2xl leading-relaxed text-sm md:text-base">
            {t("news.hero.desc")}
          </p>
        </div>
      </section>

      {/* 文章 */}
      <section className="section bg-card border-y border-border-light">
        <div className="container-custom">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-10 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            {t("news.articles")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((a, i) => (
              <article
                key={a.titleKey}
                className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-xl border border-border bg-background flex flex-col card-hover`}
              >
                <span className="text-xs text-accent font-medium uppercase tracking-wider mb-2">{t(a.tagKey)}</span>
                <h3 className="font-serif text-lg font-medium mb-3">{t(a.titleKey)}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">{t(a.excerptKey)}</p>
                <span className="text-xs text-muted-foreground mt-4 font-light">{t("news.articles.link")}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 活动 */}
      <section className="section">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-8 flex items-center gap-2 justify-center">
            <Calendar className="w-5 h-5 text-accent" />
            {t("news.events")}
          </h2>
          <div className="animate-on-scroll delay-100 space-y-3">
            {events.map((e) => (
              <div
                key={e.titleKey}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 px-5 rounded-xl bg-card border border-border-light text-sm"
              >
                <span className="font-medium text-foreground">{t(e.titleKey)}</span>
                <span className="text-muted-foreground font-light">{t(e.whenKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pb-24">
        <div className="container-custom text-center">
          <Link to="/contact" className="btn-primary group inline-flex">
            {t("news.cta")}
            <ArrowRight className="w-4 h-4 arrow-icon" />
          </Link>
        </div>
      </section>
    </div>
  );
}

const articles = [
  {
    tagKey: "news.article.1.tag",
    titleKey: "news.article.1.title",
    excerptKey: "news.article.1.excerpt",
  },
  {
    tagKey: "news.article.2.tag",
    titleKey: "news.article.2.title",
    excerptKey: "news.article.2.excerpt",
  },
  {
    tagKey: "news.article.3.tag",
    titleKey: "news.article.3.title",
    excerptKey: "news.article.3.excerpt",
  },
];

const events = [
  { titleKey: "news.event.1.title", whenKey: "news.event.1.when" },
  { titleKey: "news.event.2.title", whenKey: "news.event.2.when" },
  { titleKey: "news.event.3.title", whenKey: "news.event.3.when" },
];
