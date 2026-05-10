import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function NewsPage() {
  useScrollReveal();

  return (
    <div className="pt-28">
      {/* HERO */}
      <section className="section pb-12">
        <div className="container-custom">
          <span className="animate-hero text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
            动态与洞察
          </span>
          <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl font-medium mt-4 mb-6 leading-tight">
            技术深潜 · 行业观察
          </h1>
          <p className="animate-hero delay-200 text-muted-foreground font-light max-w-2xl leading-relaxed text-sm md:text-base">
            飞秒激光技术前沿、硬脆材料工艺探索、行业趋势与疾石动态。
          </p>
        </div>
      </section>

      {/* 文章 */}
      <section className="section bg-card border-y border-border-light">
        <div className="container-custom">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-10 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            精选文章
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((a, i) => (
              <article
                key={a.title}
                className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-xl border border-border bg-background flex flex-col card-hover`}
              >
                <span className="text-xs text-accent font-medium uppercase tracking-wider mb-2">{a.tag}</span>
                <h3 className="font-serif text-lg font-medium mb-3">{a.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">{a.excerpt}</p>
                <span className="text-xs text-muted-foreground mt-4 font-light">正文链接可对接 CMS</span>
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
            活动日历
          </h2>
          <div className="animate-on-scroll delay-100 space-y-3">
            {events.map((e) => (
              <div
                key={e.title}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 px-5 rounded-xl bg-card border border-border-light text-sm"
              >
                <span className="font-medium text-foreground">{e.title}</span>
                <span className="text-muted-foreground font-light">{e.when}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pb-24">
        <div className="container-custom text-center">
          <Link to="/contact" className="btn-primary group inline-flex">
            订阅更新与合作咨询
            <ArrowRight className="w-4 h-4 arrow-icon" />
          </Link>
        </div>
      </section>
    </div>
  );
}

const articles = [
  {
    tag: "技术深潜",
    title: "飞秒激光冷加工：为什么热影响区为零",
    excerpt: "从脉冲宽度、能量沉积时间到材料去除机制的完整解析，理解飞秒加工与传统激光的本质区别。",
  },
  {
    tag: "行业观察",
    title: "硬脆材料精密加工的下一个十年",
    excerpt: "蓝宝石、金刚石、碳化硅——这些材料正在定义半导体与光学的未来，工艺能力决定产业天花板。",
  },
  {
    tag: "疾石动态",
    title: "开放实验室首批课题启动",
    excerpt: "与高校及产业伙伴共建工艺窗口，推动飞秒加工从实验室到产线的标准化。",
  },
];

const events = [
  { title: "线上技术沙龙：飞秒激光入门", when: "每月滚动" },
  { title: "线下开放日 / 实验室参观", when: "每季" },
  { title: "行业展会与学术会议", when: "全年" },
];
