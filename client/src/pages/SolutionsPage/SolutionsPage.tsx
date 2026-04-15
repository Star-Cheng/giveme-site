import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function SolutionsPage() {
  useScrollReveal();

  return (
    <div className="pt-28">
      <section className="section pb-12">
        <div className="container-custom">
          <span className="animate-hero text-xs tracking-widest uppercase text-brand font-medium">
            解决方案 · 应用案例
          </span>
          <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl font-medium mt-4 mb-6 max-w-3xl">
            用场景证明价值
          </h1>
          <p className="animate-hero delay-200 text-muted-foreground font-light max-w-2xl leading-relaxed">
            每个案例遵循：挑战 → 传统痛点 → 智石方案 → 量化收益；用户证言在试点期可使用匿名合作方反馈，量产客户授权后替换。
          </p>
        </div>
      </section>

      <section className="section bg-card/50 border-y border-border-light">
        <div className="container-custom">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-10">典型行业</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((name, index) => (
              <div
                key={name}
                className={`animate-on-scroll delay-${(index + 1) * 100} px-5 py-4 rounded-xl border border-border bg-background text-sm font-light`}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom space-y-16">
          {cases.map((c, i) => (
            <article
              key={c.title}
              className={`animate-on-scroll delay-${(i + 1) * 100} grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-border-light pb-16 last:border-0 last:pb-0`}
            >
              <div className="lg:col-span-4">
                <h2 className="font-serif text-2xl font-medium mb-2">{c.title}</h2>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.sector}</p>
              </div>
              <div className="lg:col-span-8 space-y-6 text-sm font-light text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-foreground font-medium text-sm mb-2">挑战</h3>
                  <p>{c.challenge}</p>
                </div>
                <div>
                  <h3 className="text-foreground font-medium text-sm mb-2">传统方案痛点</h3>
                  <p>{c.pain}</p>
                </div>
                <div>
                  <h3 className="text-foreground font-medium text-sm mb-2">智石 AI 激光器方案</h3>
                  <p>{c.solution}</p>
                </div>
                <div>
                  <h3 className="text-foreground font-medium text-sm mb-2">量化收益（验收口径占位）</h3>
                  <p>{c.metrics}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-card/30">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="flex items-start gap-4 mb-10">
            <Quote className="w-8 h-8 text-brand shrink-0" aria-hidden />
            <blockquote className="font-serif text-xl md:text-2xl font-normal leading-relaxed">
              「联合实验室阶段，我们在数周内完成从样件到小批次的参数冻结。」
              <footer className="mt-4 text-sm text-muted-foreground not-italic font-sans font-light">
                — 某合作方工艺负责人（匿名，试点期）
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="animate-on-scroll flex flex-col md:flex-row gap-8 items-start p-8 md:p-10 rounded-2xl border border-brand/20 bg-card">
            <FlaskConical className="w-10 h-10 text-brand shrink-0" />
            <div>
              <h2 className="font-serif text-2xl font-medium mb-4">「开放实验室」计划</h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                邀请高校、研究所与产业伙伴共建工艺窗口与数据规范；尊重光学、AI、机械、材料等跨学科贡献，署名与知识产权条款事前书面约定。
              </p>
              <Link to="/contact" className="btn-primary group inline-flex">
                申请合作入口
                <ArrowRight className="w-4 h-4 arrow-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const industries = [
  "半导体晶圆切割",
  "医疗器械微孔加工",
  "航空航天精密刻蚀",
  "新能源电池极耳焊接",
  "科研定制系统",
];

const cases = [
  {
    title: "脆硬材料微槽加工",
    sector: "半导体 / 先进制造",
    challenge: "线宽与崩边指标双紧，换型频繁。",
    pain: "参数漂移依赖老师傅试错，首件周期长、良率波动大。",
    solution: "AI 协同光路 + 可重复工艺包 + 远程标定与版本管理，小样本快速收敛。",
    metrics: "良率 +__% · 节拍 −__% · 调机时间 −__%（以项目验收报告为准）。",
  },
  {
    title: "薄壁件精密焊接",
    sector: "新能源 / 汽车电子",
    challenge: "热影响区与飞溅约束严格，材料批次差异大。",
    pain: "固定参数表难以覆盖工况变化，返工成本高。",
    solution: "熔池风险实时预测与参数回退；摆动与能量曲线在线优化。",
    metrics: "飞溅相关缺陷 −__% · 首件一次通过率 +__%（占位）。",
  },
];
