import { Link } from "react-router-dom";
import { ArrowRight, Gift, MessageCircle, Rocket } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function CareersPage() {
  useScrollReveal();

  return (
    <div className="pt-28">
      <section className="section pb-12">
        <div className="container-custom max-w-3xl">
          <span className="animate-hero text-xs tracking-widest uppercase text-brand font-medium">
            加入我们
          </span>
          <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl font-medium mt-4 mb-6">
            拒绝螺丝钉
            <br />
            <span className="text-brand italic">寻找光子 + AI 的探险家</span>
          </h1>
          <p className="animate-hero delay-200 text-lg text-muted-foreground font-light leading-relaxed">
            你能在这里与我们一起重新定义激光的极限——不做牛马工具人，做热情的领域开创者。
          </p>
        </div>
      </section>

      <section className="section bg-card/50 border-y border-border-light">
        <div className="container-custom">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-8 flex items-center gap-2">
            <Rocket className="w-6 h-6 text-brand" />
            职位列表
          </h2>
          <div className="space-y-4">
            {roles.map((r, i) => (
              <div
                key={r.title}
                className={`animate-on-scroll delay-${(i + 1) * 100} p-6 md:p-8 rounded-xl border border-border bg-background`}
              >
                <h3 className="font-serif text-xl font-medium mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
                  {r.desc}
                </p>
                <p className="text-xs text-brand">{r.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-on-scroll">
            <h2 className="font-serif text-2xl font-medium mb-4 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-brand" />
              面试流程
            </h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              以技术对话与小型实战课题为主，替代纯八股考核；关注你如何拆解不确定性、如何与跨学科同事对齐假设与验证。
            </p>
          </div>
          <div className="animate-on-scroll delay-100">
            <h2 className="font-serif text-2xl font-medium mb-4 flex items-center gap-2">
              <Gift className="w-6 h-6 text-brand" />
              福利与成长
            </h2>
            <ul className="text-sm text-muted-foreground font-light space-y-3">
              <li>· 弹性工时与结果导向协作</li>
              <li>· 技术图书任意采购额度</li>
              <li>· 年度个人创新预算（经评审）</li>
              <li>· 跨领域轮岗：光学 ↔ 工艺 ↔ AI（在安全与项目节奏内）</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section pb-24">
        <div className="container-custom text-center">
          <Link to="/contact" className="btn-primary group inline-flex">
            投递与咨询
            <ArrowRight className="w-4 h-4 arrow-icon" />
          </Link>
        </div>
      </section>
    </div>
  );
}

const roles = [
  {
    title: "光学 AI 工程师",
    desc: "联合设计光路与学习式控制策略，把传感特征可靠地映射为可执行指令。",
    focus: "光学 × 机器学习 × 实时系统",
  },
  {
    title: "精密机械架构师",
    desc: "热—振—光一体化结构与子系统接口，保障长期重复精度与可维护性。",
    focus: "结构 × 热 × 运动平台",
  },
  {
    title: "激光工艺开拓者",
    desc: "把未知材料与工序写成可迁移、可版本管理的工艺包，推动试点到量产。",
    focus: "材料 × 激光物理 × 数据闭环",
  },
];
