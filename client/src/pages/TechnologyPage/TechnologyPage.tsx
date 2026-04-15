import { Link } from "react-router-dom";
import { ArrowRight, Brain, Cpu, Glasses } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function TechnologyPage() {
  useScrollReveal();

  return (
    <div className="pt-28">
      <section className="section pb-12">
        <div className="container-custom max-w-3xl">
          <span className="animate-hero text-xs tracking-widest uppercase text-brand font-medium">
            核心技术
          </span>
          <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl font-medium mt-4 mb-6">
            智石的 AI 与光子工程
          </h1>
          <p className="animate-hero delay-200 text-muted-foreground font-light leading-relaxed">
            算法、光学与控制系统垂直整合；可视化呈现算法链路、精度测试与热仿真对照，专利与论文列表随研发节奏更新。
          </p>
        </div>
      </section>

      <section className="section bg-card/50 border-y border-border-light">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
            <div
              key={p.title}
              className={`animate-on-scroll delay-${(i + 1) * 100} p-8 rounded-xl border border-border bg-background`}
            >
              <div className="w-12 h-12 rounded-lg bg-brand/10 text-brand flex items-center justify-center mb-6">
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-xl font-medium mb-4">{p.title}</h2>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                {p.items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <h2 className="animate-on-scroll font-serif text-2xl md:text-3xl font-medium mb-8">
            可视化与证据链（占位）
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "算法数据流图",
              "精度测试实拍 / 视频",
              "热仿真与实测对照展板",
            ].map((label, index) => (
              <div
                key={label}
                className={`animate-on-scroll delay-${(index + 1) * 100} aspect-[4/3] rounded-xl border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground font-light text-center px-4`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-card/30">
        <div className="container-custom max-w-3xl">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-6">
            专利 / 论文（开放与创新）
          </h2>
          <ul className="animate-on-scroll delay-100 space-y-4 text-sm text-muted-foreground font-light">
            <li>· 授权专利编号与标题列表（待法务与研发维护）</li>
            <li>· 会议论文 / 预印本与技术报告（可选公开链接）</li>
            <li>· 部分工具链与参考实现的开源路线图见「新闻与知识库」</li>
          </ul>
        </div>
      </section>

      <section className="section pb-24">
        <div className="container-custom text-center">
          <Link to="/news" className="btn-outline inline-flex mr-4">
            新闻与知识库
          </Link>
          <Link to="/contact" className="btn-primary group inline-flex">
            获取技术资料
            <ArrowRight className="w-4 h-4 arrow-icon" />
          </Link>
        </div>
      </section>
    </div>
  );
}

const pillars = [
  {
    icon: Brain,
    title: "AI 算法层",
    items: [
      "光束整形神经网络",
      "加工质量实时预测",
      "自适应参数与多目标在线优化",
    ],
  },
  {
    icon: Glasses,
    title: "光学系统",
    items: ["高像差抑制设计", "长期热负荷下的稳健链路", "逼近衍射极限的像差预算管理"],
  },
  {
    icon: Cpu,
    title: "控制系统",
    items: ["低延迟传感—推理—执行链路", "工艺包 SDK 与安全沙箱热更新", "远程诊断与版本化工艺资产"],
  },
];
