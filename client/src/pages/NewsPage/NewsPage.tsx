import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, Code2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function NewsPage() {
  useScrollReveal();

  return (
    <div className="pt-28">
      <section className="section pb-12">
        <div className="container-custom">
          <span className="animate-hero text-xs tracking-widest uppercase text-brand font-medium">
            新闻与知识库
          </span>
          <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl font-medium mt-4 mb-6">
            开放表达 · 行业洞察
          </h1>
          <p className="animate-hero delay-200 text-muted-foreground font-light max-w-2xl leading-relaxed">
            技术深潜、行业观察与文化随笔并列更新；开源板块在合规边界内释放参考模型、脱敏数据集与调试工具。
          </p>
        </div>
      </section>

      <section className="section bg-card/50 border-y border-border-light">
        <div className="container-custom">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-10 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-brand" />
            博客与文章选题
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((a, i) => (
              <article
                key={a.title}
                className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-xl border border-border bg-background flex flex-col`}
              >
                <span className="text-xs text-brand font-medium uppercase tracking-wider mb-2">
                  {a.tag}
                </span>
                <h3 className="font-serif text-lg font-medium mb-3">{a.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">
                  {a.excerpt}
                </p>
                <span className="text-xs text-muted-foreground mt-4">正文链接可对接 CMS 或 Markdown 路由</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-on-scroll">
            <h2 className="font-serif text-2xl font-medium mb-6 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-brand" />
              开源板块（可选）
            </h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
              计划公开非核心安全路径的参考实现、脱敏数据集与调试工具；许可证与边界以法务文件为准。
            </p>
            <ul className="text-sm text-muted-foreground font-light space-y-2">
              <li>· 参考模型与训练脚本（节选）</li>
              <li>· 工艺日志 Schema 与可视化工具</li>
              <li>· 仿真—实测对齐样例数据</li>
            </ul>
          </div>
          <div className="animate-on-scroll delay-100">
            <h2 className="font-serif text-2xl font-medium mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-brand" />
              活动日历
            </h2>
            <ul className="space-y-4">
              {events.map((e) => (
                <li
                  key={e.title}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 border-b border-border-light text-sm"
                >
                  <span className="font-medium text-foreground">{e.title}</span>
                  <span className="text-muted-foreground font-light">{e.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
    title: "AI 如何缓解激光热透镜效应",
    excerpt: "从传感特征、温度场估计到控制策略闭环，讨论可部署性与安全边界。",
  },
  {
    tag: "行业观察",
    title: "精密制造的未来：算法与光子",
    excerpt: "产线视角下「算法 + 光子」协同的基础设施与组织形态。",
  },
  {
    tag: "文化随笔",
    title: "工程师不该是工具人",
    excerpt: "把解释权与工艺资产归还给一线，用制度保护专注与创造。",
  },
];

const events = [
  { title: "线上技术沙龙", when: "每月滚动" },
  { title: "线下开放日 / 工厂参观", when: "每季" },
  { title: "高校合作工作坊", when: "招募中" },
];
