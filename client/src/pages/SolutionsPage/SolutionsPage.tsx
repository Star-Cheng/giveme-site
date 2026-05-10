import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function SolutionsPage() {
  useScrollReveal();

  return (
    <div className="pt-28">
      {/* HERO */}
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <p className="text-xs text-[#2563eb] font-medium tracking-wider uppercase mb-4">行业解决方案</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">
            用场景证明价值
          </h1>
          <p className="text-sm text-[#64748b] font-light max-w-2xl leading-relaxed">
            Ultra Rock | [Series] [Material] Sol. [Model]&ensp;——&ensp;每个方案遵循：挑战 → 传统痛点 → 疾石方案 → 量化收益。
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
                  <span className="text-xs text-[#2563eb] font-medium tracking-wider uppercase">{s.series}</span>
                  <h3 className="text-xl font-bold text-[#0f172a] mt-2 mb-1">{s.title}</h3>
                  <p className="text-xs text-[#64748b] mb-4">{s.english}</p>
                  <p className="text-xs text-[#94a3b8] mb-6">{s.sector}</p>

                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-[#0f172a] mb-1">挑战</p>
                      <p className="text-xs text-[#64748b] font-light leading-relaxed">{s.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0f172a] mb-1">传统痛点</p>
                      <p className="text-xs text-[#64748b] font-light leading-relaxed">{s.pain}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0f172a] mb-1">疾石方案</p>
                      <p className="text-xs text-[#64748b] font-light leading-relaxed">{s.solution}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="rounded-xl bg-white p-4 border border-[#f1f5f9]">
                    <p className="text-xs font-semibold text-[#2563eb] mb-2">量化收益</p>
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
          <h2 className="text-2xl font-bold text-[#0f172a] mb-10">应用领域</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {["半导体", "医疗器械", "航空航天", "新能源", "光学器件", "科研定制"].map((name) => (
              <div key={name} className="px-4 py-5 rounded-xl bg-white border border-[#f1f5f9] text-center text-sm font-medium text-[#0f172a]">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 开放实验室 */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto bg-[#f8fafc] rounded-2xl p-8 md:p-10 border border-[#f1f5f9] flex flex-col md:flex-row gap-8 items-start">
            <div className="w-12 h-12 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0">
              <span className="text-xl">◇</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">「开放实验室」计划</h3>
              <p className="text-sm text-[#64748b] font-light leading-relaxed mb-6">
                邀请高校、研究所与产业伙伴共建工艺窗口与数据规范。支持按材料与工艺定制行业方案——署名与知识产权条款事前书面约定。
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white text-sm font-medium rounded-full hover:bg-[#2563eb] transition-colors">
                申请合作入口 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const solutions = [
  {
    series: "砺流系列",
    title: "蓝宝石微孔阵列",
    english: "FluxBeam Sapphire Sol. F-1",
    sector: "半导体衬底加工 · 蓝宝石 Ø50μm 微孔阵列",
    challenge: "线宽与崩边指标双紧，换型频繁，批量一致性要求极高。",
    pain: "传统纳秒激光热影响大，边缘崩边严重；参数漂移依赖老师傅试错，首件周期长、良率波动大。",
    solution: "FluxBeam Laser F-1 飞秒冷加工 + RockCore VisionPack 在线视觉检测 + RockCore ProcessDB 工艺库快速迁移。",
    metrics: "边缘崩边率降至接近零 · 良率提升至 99%+ · 调机时间从数小时缩短至分钟级。",
  },
  {
    series: "疾光系列",
    title: "金刚石精密切割",
    english: "UltraLight Diamond Sol. U-1",
    sector: "光学与珠宝 · CVD 金刚石晶向切割",
    challenge: "沿晶向精密切割，要求零热损伤、零微裂纹、表面 Ra < 0.2μm。",
    pain: "机械切割效率低、损耗大；传统激光热应力导致裂纹扩展，成品率不足 60%。",
    solution: "UltraLight Laser U-1 极限光束质量 + 自适应晶向切割路径规划 + RockCore Platform OS 全链路协同。",
    metrics: "切割面 Ra < 0.2μm · 无热影响区 · 材料损耗降低 40%+ · 成品率 > 95%。",
  },
  {
    series: "砺流系列",
    title: "碳化硅晶圆划片",
    english: "FluxBeam SiC Sol. F-1",
    sector: "第三代半导体 · SiC 晶圆隐形切割",
    challenge: "窄切缝（< 20μm）、无崩边、芯片电性能零退化。",
    pain: "刀轮划片应力大、切缝宽；传统激光热影响导致芯片性能退化，良率损失严重。",
    solution: "FluxBeam Laser F-1 飞秒隐形切割 + RockCore Controller 亚微秒时序同步 + 实时焦点跟踪。",
    metrics: "切缝宽度 < 20μm · 无崩边 · 芯片电性能无退化 · 良率接近 100%。",
  },
];
