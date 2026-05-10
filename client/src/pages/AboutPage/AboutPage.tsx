import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function AboutPage() {
  useScrollReveal();
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
              <p className="text-xs text-[#2563eb] font-medium tracking-wider uppercase mb-4">关于疾石</p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-6 leading-tight">
                Ultra Rock 疾石科技
              </h1>
              <div className="space-y-4 text-sm text-[#475569] font-light leading-relaxed">
                <p>
                  疾石科技是一家专注于智能超快激光器研发与制造的高科技企业。我们以飞秒激光为核心技术，面向半导体、医疗器械、航空航天等领域提供精密激光加工解决方案。
                </p>
                <p>
                  公司自主研发飞秒脉冲生成、光束整形、智能控制系统等关键核心技术，在硬脆材料（蓝宝石、金刚石、碳化硅）的超精密加工领域具有领先优势。
                </p>
                <p>
                  疾石是全球率先将 AI 自适应算法深度集成于飞秒激光加工全链路的公司之一，致力于让每一颗光子都按意图行事。
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
          <h2 className="text-2xl font-bold text-[#0f172a] text-center mb-12">文化理念</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "愿景", en: "Vision", body: "用飞秒之光，重塑精密制造的极限。" },
              { title: "使命", en: "Mission", body: "让每一颗光子都按意图行事——打造可迭代、可度量、可协作的智能激光系统。" },
              { title: "文化", en: "Culture", body: "极致速度，磐石品质。开放协作，精益求精。" },
              { title: "行动指南", en: "Action", body: "细分目标，高效执行，校核结果，反馈迭代。" },
            ].map((item, i) => (
              <div key={item.title} className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-2xl bg-white border border-[#f1f5f9]`}>
                <p className="text-xs text-[#2563eb] font-medium tracking-wider uppercase mb-2">{item.en}</p>
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
          <h2 className="text-2xl font-bold text-[#0f172a] text-center mb-4">社会贡献</h2>
          <p className="text-sm text-[#64748b] font-light text-center max-w-2xl mx-auto mb-12">
            疾石通过不断创新的飞秒激光技术，为高端制造、科研探索和产业升级贡献力量。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "半导体制造", desc: "为第三代半导体晶圆划片提供零热影响切割方案，助力芯片良率突破。" },
              { title: "医疗器械", desc: "飞秒激光微孔加工技术应用于高端医疗器械精密部件制造。" },
              { title: "科研赋能", desc: "开放实验室计划，与高校和研究所共建工艺窗口，推动飞秒技术普惠。" },
            ].map((item, i) => (
              <div key={item.title} className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-2xl bg-[#f8fafc] border border-[#f1f5f9] text-center`}>
                <div className="w-12 h-12 rounded-full bg-[#eff6ff] flex items-center justify-center mx-auto mb-4">
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
            <h2 className="text-2xl font-bold text-[#0f172a] mb-10">创始人寄语</h2>
            <blockquote className="text-lg md:text-xl text-[#475569] font-light leading-relaxed italic mb-8">
              "飞秒激光快到一个脉冲只有千万亿分之一秒，但我们用它加工最硬的材料，却要求绝对的稳定。这个矛盾，就是我们存在的理由。把最快的刀，立在最稳的台上——这不仅是一个技术命题，更是我们对精密制造的理解。真正美的事物极具感染力，然而整个行业却鲜有改变。我们坚定地认为，创新才是企业发展的基石。"
            </blockquote>
            <p className="text-sm text-[#64748b] font-medium">— Ultra Rock 疾石科技 创始人</p>
          </div>
        </div>
      </section>

      {/* ================================================================
          公司发展轴（Unitree 风格：详细年表）
          ================================================================ */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0f172a] text-center mb-14">公司发展轴</h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`animate-on-scroll delay-${(i + 1) * 80} relative pl-12 pb-14 ${
                  i < timeline.length - 1 ? "border-l-2 border-[#e2e8f0]" : ""
                }`}
              >
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-[#2563eb]" />
                <span className="text-sm font-bold text-[#2563eb]">{item.year}</span>
                <h3 className="text-base font-bold text-[#0f172a] mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-[#64748b] font-light leading-relaxed">{item.desc}</p>
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
    title: "UltraLight U-1 旗舰发布",
    desc: "推出疾光系列旗舰激光器，逼近衍射极限的光束质量（M² ≤ 1.1），脉冲宽度突破 300fs，面向半导体前沿工艺与科研定制需求。",
  },
  {
    year: "2025",
    title: "RockCore 智能控制平台上线",
    desc: "发布统一的智能控制系统 RockCore 石核，涵盖 Platform OS、VisionPack、ProcessDB、Controller 四大模块，实现软件定义硬件。",
  },
  {
    year: "2024",
    title: "FluxBeam F-1 & RockSolid R-1 双系列发布",
    desc: "推出砺流系列（中高端）与磐石系列（基础款）飞秒激光器，完成从基础到高端的全栈产品覆盖。",
  },
  {
    year: "2023",
    title: "首批行业试点验证",
    desc: "与头部客户联合验证蓝宝石微孔阵列、金刚石精密切割、碳化硅晶圆划片三大场景，良率与稳定性指标达到量产标准。",
  },
  {
    year: "2022",
    title: "工程样机点亮",
    desc: "首台飞秒激光工程样机完成装配调试，闭环控制链路打通，脉冲宽度稳定在 500fs 以内。",
  },
  {
    year: "2021",
    title: "公司成立",
    desc: "确立「飞秒 + 智能」技术路线，品牌名 Ultra Rock / 疾石科技正式启用。核心团队汇聚光学、AI、精密机械领域资深专家。",
  },
];
