import { Link } from "react-router-dom";
import { ArrowRight, Box, Download, Layers } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function ProductsPage() {
  useScrollReveal();

  return (
    <div className="pt-28">
      <section className="section pb-12">
        <div className="container-custom">
          <span className="animate-hero text-xs tracking-widest uppercase text-brand font-medium">
            产品中心
          </span>
          <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl font-medium mt-4 mb-6 max-w-3xl">
            聚焦 AI + 高精度
          </h1>
          <p className="animate-hero delay-200 text-muted-foreground font-light max-w-2xl leading-relaxed">
            按功率、应用场景与精度等级组织产品族。下列为核心参数结构、AI 亮点与传统方案对比示意；量产前请以正式规格书为准。
          </p>
        </div>
      </section>

      <section className="section bg-card/50 border-y border-border-light">
        <div className="container-custom space-y-20">
          {series.map((s, si) => (
            <article key={s.name} className={`animate-on-scroll delay-${(si + 1) * 100}`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-10">
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-3 mb-4">
                    <Layers className="w-6 h-6 text-brand" />
                    <h2 className="font-serif text-2xl md:text-3xl font-medium">{s.name}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                    {s.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full bg-background border border-border text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:flex-1 space-y-8">
                  <div className="overflow-x-auto rounded-xl border border-border bg-background">
                    <table className="w-full text-sm text-left min-w-[480px]">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground font-medium">
                          <th className="p-4 font-medium">项目</th>
                          <th className="p-4 font-medium">规格（示例）</th>
                        </tr>
                      </thead>
                      <tbody>
                        {s.params.map((row) => (
                          <tr key={row.k} className="border-b border-border-light last:border-0">
                            <td className="p-4 text-muted-foreground">{row.k}</td>
                            <td className="p-4">{row.v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium tracking-wide uppercase text-brand mb-3">
                      AI 亮点
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground font-light">
                      {s.ai.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="text-brand shrink-0">·</span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <h2 className="animate-on-scroll font-serif text-2xl md:text-3xl font-medium mb-8">
            与传统激光器对比（试点数据占位）
          </h2>
          <div className="animate-on-scroll delay-100 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-card border-b border-border">
                  <th className="p-4 text-left font-medium">维度</th>
                  <th className="p-4 text-left font-medium text-muted-foreground">传统方案</th>
                  <th className="p-4 text-left font-medium text-brand">智石 AI 激光器</th>
                </tr>
              </thead>
              <tbody className="font-light">
                {compareRows.map((r) => (
                  <tr key={r.dim} className="border-b border-border-light last:border-0">
                    <td className="p-4 font-medium">{r.dim}</td>
                    <td className="p-4 text-muted-foreground">{r.trad}</td>
                    <td className="p-4">{r.zs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section bg-card/30">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <h2 className="font-serif text-2xl font-medium mb-4">交互式 3D 与原理动效</h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
              此处可嵌入 WebGL 机型展示或光路原理动画。当前为占位区块，便于后续接入设计稿与工程资产。
            </p>
            <div className="aspect-video rounded-xl bg-gradient-to-br from-card via-border-light to-border flex items-center justify-center border border-border">
              <Box className="w-16 h-16 text-brand/30" aria-hidden />
            </div>
          </div>
          <div className="animate-on-scroll delay-100 space-y-4">
            <h2 className="font-serif text-2xl font-medium mb-4">资料下载</h2>
            {[
              "技术白皮书（PDF）",
              "机械 / 电气 / 光学接口数据表（ZIP）",
            ].map((label) => (
              <button
                key={label}
                type="button"
                className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-border bg-background text-left text-sm hover:border-brand/40 transition-colors"
              >
                <span className="font-light">{label}</span>
                <Download className="w-4 h-4 text-brand shrink-0" aria-hidden />
              </button>
            ))}
            <p className="text-xs text-muted-foreground pt-2">
              下载链接可在接入 CMS 或静态资源目录后替换为真实 URL。
            </p>
          </div>
        </div>
      </section>

      <section className="section pb-24">
        <div className="container-custom text-center">
          <Link to="/contact" className="btn-primary group inline-flex">
            预约技术交流
            <ArrowRight className="w-4 h-4 arrow-icon" />
          </Link>
        </div>
      </section>
    </div>
  );
}

const series = [
  {
    name: "微加工系列",
    summary: "面向半导体、脆硬材料与微纳结构的精密去除与改性。",
    tags: ["355 nm", "飞秒扩展路线", "微孔 / 微槽"],
    params: [
      { k: "波长", v: "355 nm / 532 nm / 1064 nm（按配置）" },
      { k: "平均功率", v: "__ W（按型号发布）" },
      { k: "光束质量 M²", v: "≤ __" },
      { k: "重复精度", v: "±__ μm" },
    ],
    ai: [
      "实时焦点自优化，随材料反射率与镜片状态收敛最佳焦点。",
      "热透镜 AI 补偿，预测温升对指向与像差的影响。",
      "加工路径智能规划，在精度、节拍与光学件寿命间权衡。",
    ],
  },
  {
    name: "精密焊接系列",
    summary: "薄材、异种金属与热敏感部件的焊接与熔覆场景。",
    tags: ["摆动焊接", "熔池传感", "飞溅抑制"],
    params: [
      { k: "波长", v: "以光纤 / 复合波长方案为准" },
      { k: "平均功率", v: "__ W" },
      { k: "光束质量 M²", v: "≤ __" },
      { k: "重复精度", v: "±__ μm" },
    ],
    ai: [
      "加工质量实时预测，毫秒级窗口评估熔池风险并回退参数。",
      "自适应能量与送丝/摆动策略，降低气孔与咬边概率。",
    ],
  },
  {
    name: "表面处理系列",
    summary: "清洗、纹理化、选择性改性等表界面工程。",
    tags: ["大面积均匀性", "工艺窗口窄带控制"],
    params: [
      { k: "波长", v: "按材料吸收曲线配置" },
      { k: "平均功率", v: "__ W" },
      { k: "光束质量 M²", v: "≤ __" },
      { k: "重复精度", v: "±__ μm" },
    ],
    ai: [
      "光束整形神经网络，将目标能量分布编码为可执行控制策略。",
      "路径与参数协同优化，提升粗糙度与均匀性指标。",
    ],
  },
];

const compareRows = [
  { dim: "参数调试", trad: "依赖经验，换料常需重调", zs: "模型迁移 + 小样本快速收敛" },
  { dim: "首件良率", trad: "产线基线", zs: "试点目标 +X%（待实测填入）" },
  { dim: "节拍", trad: "同精度基线", zs: "同精度约束下 −Y% 加工时间（占位）" },
  { dim: "可解释性", trad: "黑箱试错较多", zs: "过程可视化 + 可追溯日志" },
];
