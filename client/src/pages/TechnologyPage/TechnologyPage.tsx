import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function TechnologyPage() {
  useScrollReveal();
  const base = import.meta.env.BASE_URL;

  return (
    <div className="pt-28">
      {/* HERO */}
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <p className="text-xs text-[#7c3aed] font-medium tracking-wider uppercase mb-4">核心技术</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">疾 · 石 · 智能</h1>
          <p className="text-sm text-[#64748b] font-light max-w-2xl leading-relaxed">
            飞秒激光技术、硬脆材料工艺与智能控制系统的垂直整合。三个维度，一个目标——用最快的速度，加工最硬的东西，输出最稳的品质。
          </p>
        </div>
      </section>

      {/* 三大支柱 */}
      {[
        {
          title: "疾", en: "Ultra Speed", color: "text-[#7c3aed]", bg: "bg-[#f5f3ff]",
          desc: "飞秒 / 皮秒级超快激光脉冲生成与控制。在千万亿分之一秒的时间窗口内，完成对光子能量的精密调制。",
          img: "gen-tech-speed-0.jpg",
          quote: "一飞秒，是一秒的千万亿分之一。在这个时间尺度里，光只走了 0.3 微米。我们控制的，是时间的极限。",
          items: [
            ["飞秒脉冲生成", "基于锁模技术的飞秒激光振荡器，脉冲宽度覆盖百飞秒至皮秒量级。"],
            ["脉冲整形与调制", "时空域脉冲整形技术，对脉冲宽度、重复频率与能量分布进行独立调控。"],
            ["光束传输与聚焦", "高像差抑制光路设计，逼近衍射极限的聚焦能力。"],
            ["时域精度控制", "亚皮秒级时序同步，多脉冲序列编程与触发精度保障。"],
          ],
        },
        {
          title: "石", en: "Rock Solid", color: "text-[#0f172a]", bg: "bg-[#f8fafc]",
          desc: "硬脆材料的精密激光加工。蓝宝石、金刚石、碳化硅——我们证明的不是能做多快，而是能做多稳。",
          img: "gen-tech-material-0.jpg",
          quote: "无微裂纹、无热影响、无材料损伤。这是疾石的标准。",
          items: [
            ["硬脆材料微加工", "蓝宝石、金刚石、碳化硅等材料的微孔、微槽与精密切割。冷加工零热影响区。"],
            ["边缘质量控制", "亚微米级边缘粗糙度，消除崩边与锥度漂移。"],
            ["多材料工艺适配", "覆盖透明、半透明与高反射率材料的吸收窗口匹配。"],
            ["长期稳定性", "热—振—光一体化设计，首件至末件一致性达微米级。"],
          ],
        },
        {
          title: "智能", en: "Intelligent", color: "text-[#7c3aed]", bg: "bg-[#f5f3ff]",
          desc: "把极致的动态，交给极致的算法。智能控制系统是实现疾与石统一的唯一桥梁。",
          img: "gen-tech-ai-0.jpg",
          quote: "智能，是疾与石之间唯一的桥梁。",
          items: [
            ["实时焦点自优化", "基于在线传感的焦点位置闭环控制，随材料反射率、镜片热状态实时收敛。"],
            ["加工质量预测", "毫秒级窗口内评估加工风险，在异常发生前主动回退参数。"],
            ["自适应参数优化", "多目标在线优化——精度、节拍与光学件寿命之间动态权衡。"],
            ["工艺版本管理", "工艺包以版本化资产交付，支持沙箱二次开发与灰度发布。"],
          ],
        },
      ].map((pillar, pi) => (
        <section key={pillar.title} className={`py-16 ${pillar.bg}`}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={pi % 2 === 1 ? "lg:order-2" : ""}>
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#f1f5f9]">
                  <img src={`${base}${pillar.img}`} alt={pillar.title} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className={pi % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className={`text-4xl font-bold mb-2 ${pillar.color}`}>{pillar.title}</h2>
                <p className="text-sm text-[#64748b] tracking-wider uppercase font-medium mb-4">{pillar.en}</p>
                <p className="text-sm text-[#475569] font-light leading-relaxed mb-8">{pillar.desc}</p>
                <div className="space-y-3 mb-8">
                  {pillar.items.map(([t, d]) => (
                    <div key={t}>
                      <p className="text-sm font-semibold text-[#0f172a]">{t}</p>
                      <p className="text-xs text-[#64748b] font-light">{d}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="text-base text-[#475569] font-light italic border-l-2 border-[#e2e8f0] pl-4">
                  {pillar.quote}
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* 参数概览 */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0f172a] text-center mb-10">核心参数概览</h2>
          <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                  <th className="p-4 text-left text-xs font-medium text-[#64748b]">参数</th>
                  <th className="p-4 text-left text-xs font-medium text-[#64748b]">典型值 / 范围</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["脉冲宽度", "< 500 fs（典型），覆盖 fs ~ ps 范围"],
                  ["波长", "355 nm / 532 nm / 1064 nm（按配置）"],
                  ["光束质量 M²", "≤ 1.3"],
                  ["重复精度", "±1 μm 级（典型工况）"],
                  ["闭环响应", "< 250 μs 目标架构"],
                  ["可加工材料", "蓝宝石、金刚石、碳化硅、玻璃、陶瓷、金属"],
                ].map(([p, v]) => (
                  <tr key={p} className="border-b border-[#f1f5f9] last:border-0">
                    <td className="p-4 text-[#64748b]">{p}</td>
                    <td className="p-4 text-[#0f172a]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="pb-20 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0f172a] text-white text-sm font-medium rounded-full hover:bg-[#7c3aed] transition-colors">
          获取详细技术资料 <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
