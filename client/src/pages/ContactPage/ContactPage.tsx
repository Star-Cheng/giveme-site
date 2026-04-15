import { useState, type FormEvent } from "react";
import { Send, MapPin, Mail, Phone, FileCode, Wrench } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function ContactPage() {
  useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    scene: "",
    material: "",
    precision: "",
    cycle: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    window.setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        scene: "",
        material: "",
        precision: "",
        cycle: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="pt-28">
      <section className="section pb-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="animate-hero text-xs tracking-widest uppercase text-brand font-medium">
                联系我们与支持
              </span>
              <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl lg:text-6xl font-medium mt-4 mb-6">
                商务、技术与
                <br />
                <span className="text-brand italic">开放合作</span>
              </h1>
              <p className="animate-hero delay-200 text-muted-foreground font-light max-w-md leading-relaxed">
                左侧为商务与售前咨询入口；技术支持、固件与 API 文档链接可在后端就绪后替换为真实地址。
              </p>

              <div className="animate-hero delay-300 mt-12 space-y-6">
                <a href="mailto:bd@zestone-laser.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors border border-border-light">
                    <Mail className="w-5 h-5 text-brand group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-light mb-1">商务与技术销售</div>
                    <div className="font-medium">bd@zestone-laser.com（示例）</div>
                  </div>
                </a>

                <a href="tel:+864008008800" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors border border-border-light">
                    <Phone className="w-5 h-5 text-brand group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-light mb-1">电话</div>
                    <div className="font-medium">+86 400-800-8800（示例）</div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center border border-border-light shrink-0">
                    <MapPin className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-light mb-1">总部 / 开放实验室（规划中）</div>
                    <div className="font-medium text-sm leading-relaxed">
                      中国 · __ 市 __ 区 __ 路 __ 号
                      <br />
                      <span className="text-muted-foreground font-light text-xs">访客预约制，地图与停车指引上线前可隐藏本段</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-hero delay-400 mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="#support"
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-brand/30 transition-colors text-sm"
                >
                  <Wrench className="w-5 h-5 text-brand shrink-0" />
                  <span className="font-light text-muted-foreground">技术支持与 FAQ</span>
                </a>
                <a
                  href="#support"
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-brand/30 transition-colors text-sm"
                >
                  <FileCode className="w-5 h-5 text-brand shrink-0" />
                  <span className="font-light text-muted-foreground">API 文档与固件下载</span>
                </a>
              </div>
            </div>

            <div className="animate-hero delay-200">
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl p-8 md:p-10 shadow-sm border border-border-light"
              >
                <h2 className="font-serif text-xl font-medium mb-6">商务咨询表单</h2>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        您的姓名 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        工作邮箱 *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      公司 / 机构 *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="scene" className="block text-sm font-medium mb-2">
                      应用场景 *
                    </label>
                    <input
                      type="text"
                      id="scene"
                      name="scene"
                      value={formData.scene}
                      onChange={handleChange}
                      required
                      placeholder="如：极耳焊接、晶圆划片、微孔…"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="material" className="block text-sm font-medium mb-2">
                        主要材料
                      </label>
                      <input
                        type="text"
                        id="material"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        placeholder="如：铝合金、硅、陶瓷…"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="precision" className="block text-sm font-medium mb-2">
                        精度 / 质量指标
                      </label>
                      <input
                        type="text"
                        id="precision"
                        name="precision"
                        value={formData.precision}
                        onChange={handleChange}
                        placeholder="如：±2 μm、Ra、HAZ…"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cycle" className="block text-sm font-medium mb-2">
                      预算与期望周期
                    </label>
                    <select
                      id="cycle"
                      name="cycle"
                      value={formData.cycle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors cursor-pointer"
                    >
                      <option value="">请选择</option>
                      <option value="q1">本季度内试点</option>
                      <option value="half">半年内量产导入</option>
                      <option value="year">年度规划 / 科研合作</option>
                      <option value="other">其他（请在描述中说明）</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      补充说明 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="产线节拍、样品数量、保密要求、希望对接的角色等"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                      isSubmitted
                        ? "bg-success text-white"
                        : "bg-foreground text-background hover:bg-brand"
                    } disabled:opacity-70`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        发送中…
                      </>
                    ) : isSubmitted ? (
                      "已记录（演示）"
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        提交咨询
                      </>
                    )}
                  </button>
                  <p className="text-xs text-muted-foreground font-light">
                    提交为前端演示，未接后端；上线时请接入 CRM 或邮件服务。
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="support" className="section bg-card/50 border-y border-border-light scroll-mt-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-serif text-2xl font-medium mb-4">技术支持</h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
                知识库、FAQ、固件升级包与远程诊断入口（占位）。账号权限与 OTA 通道就绪后替换为真实链接。
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-medium mb-4">合作入口</h2>
              <ul className="text-sm text-muted-foreground font-light space-y-2">
                <li>· 高校联合实验室</li>
                <li>· 供应链创新伙伴（光学件、传感、运动平台）</li>
                <li>· 工艺开发合作（NDA + 阶段门评审）</li>
              </ul>
            </div>
          </div>

          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-8 text-center">
            常见问题
          </h2>
          <div className="max-w-3xl mx-auto space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className={`animate-on-scroll delay-${(index + 1) * 100} bg-background rounded-xl p-6 md:p-8 border border-border-light`}
              >
                <h3 className="font-serif text-lg font-medium mb-3">{faq.q}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const faqs = [
  {
    q: "是否提供样机试用与联合实验室？",
    a: "视行业与场景匹配度，可提供样件试制与共建试点线；具体 NRE 与里程碑在商务与技术评审后书面约定。",
  },
  {
    q: "AI 策略包如何更新？是否支持二次开发？",
    a: "工艺与模型以版本化资产交付，支持在沙箱内二次开发与灰度发布；接口说明见 API 文档（上线后提供链接）。",
  },
  {
    q: "数据与工艺信息的保密如何保障？",
    a: "默认签署 NDA；敏感数据可本地推理与脱敏上传；联合课题的知识产权与署名规则事前单独约定。",
  },
  {
    q: "交付周期与验收口径？",
    a: "依机型与定制深度而定；验收以双方签署的指标与样件报告为准，避免口头承诺与指标漂移。",
  },
];
