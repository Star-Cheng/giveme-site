import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function AboutPage() {
  useScrollReveal();

  return (
    <div className="pt-28">
      <section className="section pb-12">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/5] max-h-[420px] rounded-xl bg-gradient-to-br from-card via-border-light to-border border border-border overflow-hidden relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <span className="font-serif text-5xl text-brand/30 mb-2">智</span>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  团队与开放实验室影像占位
                  <br />
                  可替换为产线、光学平台或团队合照
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="animate-hero text-xs tracking-widest uppercase text-brand font-medium">
              关于我们
            </span>
            <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl font-medium mt-4 mb-6">
              智石激光 ZeStone Layser
            </h1>
            <div className="animate-hero delay-200 space-y-4 text-muted-foreground font-light leading-relaxed text-sm md:text-base">
              <p>
                智石激光诞生于一个朴素判断：精密制造的瓶颈，日益不在「更大的功率」，而在
                <strong className="text-foreground font-medium"> 光子在材料里是否按意图行事</strong>
                。我们融合 AI 与高端激光工程，打造可迭代、可度量、可协作的下一代智能激光器。
              </p>
              <p>
                <strong className="text-foreground font-medium">不做牛马工具人，做热情的领域开创者</strong>
                ——开放、创新、自由、精益求精；尊重光学、AI、机械、材料等跨学科人才，让贡献被看见、被记录、被回报。
              </p>
            </div>
            <div className="animate-hero delay-300 mt-8">
              <Link to="/careers" className="btn-primary group inline-flex">
                加入开创者行列
                <ArrowRight className="w-4 h-4 arrow-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-card/50 border-y border-border-light">
        <div className="container-custom">
          <h2 className="animate-on-scroll font-serif text-2xl md:text-3xl font-medium text-center mb-12">
            文化宣言
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culture.map((c, i) => (
              <div
                key={c.title}
                className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-xl border border-border bg-background`}
              >
                <h3 className="font-serif text-lg font-medium mb-2 text-brand">{c.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <span className="animate-on-scroll text-xs tracking-widest uppercase text-brand font-medium">
            跨学科团队（示例）
          </span>
          <h2 className="animate-on-scroll delay-100 font-serif text-2xl md:text-3xl font-medium mt-4 mb-10">
            每人一句：为什么我不做牛马工具人
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((m, i) => (
              <div
                key={m.role}
                className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-xl bg-card border border-border-light`}
              >
                <div className="text-xs text-brand font-medium uppercase tracking-wider mb-2">{m.role}</div>
                <p className="font-serif text-lg italic text-foreground/90">&ldquo;{m.tagline}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-card/30">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-10 text-center">
            大事记
          </h2>
          <div className="space-y-0">
            {milestones.map((m, index) => (
              <div
                key={m.time}
                className={`animate-on-scroll relative pl-8 pb-12 ${
                  index !== milestones.length - 1 ? "border-l border-border" : ""
                }`}
              >
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-1/2 rounded-full bg-brand" />
                <div className="ml-6">
                  <span className="text-xs text-muted-foreground font-light">{m.time}</span>
                  <h3 className="font-medium mt-1 mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{m.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const culture = [
  {
    title: "开放",
    body: "核心工具链与部分参考实现以合规方式开放，降低生态协作门槛；路线图在新闻与知识库持续更新。",
  },
  {
    title: "创新",
    body: "鼓励可证伪的技术假设与快速实验闭环，把「试点数据」当作一等公民。",
  },
  {
    title: "自由",
    body: "弹性工作制；技术路线经民主评议后锁定里程碑，减少自上而下拍脑袋。",
  },
  {
    title: "精益求精",
    body: "每月「匠心日」——全员只盯一个微指标，把它从「差不多」推到「可写进规格书」。",
  },
  {
    title: "尊重各领域人才",
    body: "好激光是光子学 × 材料 × 机械 × AI × 工艺的乘积；联合署名与知识产权条款事前书面约定。",
  },
  {
    title: "开创者",
    body: "拒绝把工程师当作螺丝钉；用系统与数据把个人经验沉淀为组织资产。",
  },
];

const team = [
  { role: "光学", tagline: "我不想调一辈子镜片，我想让镜片学会自己变好。" },
  { role: "AI", tagline: "模型不是幻灯片，是产线上每一颗光子的副驾驶。" },
  { role: "机械与热", tagline: "结构不是铁块，是热的语法。" },
  { role: "激光工艺", tagline: "工艺不是玄学，是可版本管理的工程资产。" },
];

const milestones = [
  { time: "T0", title: "公司成立", note: "确立「AI 原生激光器」产品哲学与长期技术栈。" },
  { time: "T1", title: "工程样机点亮", note: "闭环控制链路打通，进入试点客户场景迭代。" },
  { time: "T2", title: "行业共建试点线", note: "与头部客户联合验证良率、节拍与可维护性指标。" },
  { time: "T3（规划）", title: "开放实验室首批课题", note: "发布联合工艺窗口与数据规范，邀请高校与供应链伙伴。" },
];
