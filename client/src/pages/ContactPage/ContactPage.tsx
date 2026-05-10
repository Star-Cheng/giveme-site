import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Send, Download, Wrench, BookOpen } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function ContactPage() {
  useScrollReveal();
  const apiBaseUrl = (import.meta.env.VITE_CONTACT_API_BASE_URL || "").trim();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const resolveSubmitTarget = () => {
    if (apiBaseUrl) return `${apiBaseUrl.replace(/\/$/, "")}/api/contact-inquiries`;
    if (window.location.hostname.endsWith("github.io")) return "https://formsubmit.co/ajax/1335929010@qq.com";
    return "/api/contact-inquiries";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const submitTarget = resolveSubmitTarget();
      const isFormSubmit = submitTarget.includes("formsubmit.co/ajax/");
      const payload = isFormSubmit
        ? { ...formData, _subject: `【商务咨询】${formData.company} - ${formData.name}`, _captcha: "false", _template: "table", _cc: "fccgccn@gmail.com" }
        : formData;
      const response = await fetch(submitTarget, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("提交失败");
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); setFormData({ name: "", email: "", company: "", message: "" }); }, 3000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "提交失败");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28">
      {/* ================================================================
          HERO — DJI 风格
          ================================================================ */}
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <p className="text-xs text-[#2563eb] font-medium tracking-wider uppercase mb-4">服务与支持</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4 leading-tight">
            欢迎使用疾石科技
            <br />
            <span className="text-[#2563eb]">服务与支持</span>
          </h1>
          <p className="text-sm text-[#64748b] font-light max-w-lg leading-relaxed">
            技术资料下载、售后支持、商务咨询与开放合作——我们随时为您服务。
          </p>
        </div>
      </section>

      {/* ================================================================
          服务入口卡片（DJI 风格）
          ================================================================ */}
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <h2 className="text-xl font-bold text-[#0f172a] mb-8">热门服务</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Download, title: "技术资料下载", desc: "白皮书、规格书、接口数据表", href: "/products" },
              { icon: Wrench, title: "售后技术支持", desc: "远程诊断 · 固件升级 · 工艺优化", href: "#support" },
              { icon: Send, title: "商务与技术咨询", desc: "产品选型 · 样件试制 · 方案定制", href: "#contact-form" },
              { icon: BookOpen, title: "开放实验室申请", desc: "共建工艺窗口 · 联合课题", href: "/solutions" },
            ].map((svc, i) => (
              <Link
                key={svc.title}
                to={svc.href}
                className={`animate-on-scroll delay-${(i + 1) * 100} group p-6 rounded-2xl bg-[#f8fafc] border border-[#f1f5f9] hover:border-[#cbd5e1] hover:shadow-sm transition-all`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center mb-4 group-hover:bg-[#2563eb] transition-colors">
                  <svc.icon className="w-5 h-5 text-[#2563eb] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#0f172a] mb-2">{svc.title}</h3>
                <p className="text-xs text-[#64748b] font-light">{svc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          联系表单 + 信息（DJI 风格左右布局）
          ================================================================ */}
      <section id="contact-form" className="py-16 bg-[#f8fafc]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 左侧：联系信息 */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">联系我们</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-[#94a3b8] font-medium tracking-wider uppercase mb-1">邮箱</p>
                  <a href="mailto:fccgccn@gmail.com" className="text-sm text-[#2563eb] hover:underline">fccgccn@gmail.com</a>
                </div>
                <div>
                  <p className="text-xs text-[#94a3b8] font-medium tracking-wider uppercase mb-1">地址</p>
                  <p className="text-sm text-[#475569]">中国 · 具体地址待补充</p>
                </div>
                <div>
                  <p className="text-xs text-[#94a3b8] font-medium tracking-wider uppercase mb-1">工作时间</p>
                  <p className="text-sm text-[#475569]">周一至周五 9:00 – 18:00</p>
                </div>
              </div>
            </div>

            {/* 右侧：表单 */}
            <div>
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 border border-[#f1f5f9] space-y-5">
                <h3 className="font-bold text-[#0f172a]">商务与技术咨询</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#0f172a] mb-1.5">姓名 *</label>
                    <input name="name" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} required className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#2563eb]" placeholder="您的姓名" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#0f172a] mb-1.5">邮箱 *</label>
                    <input name="email" type="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#2563eb]" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0f172a] mb-1.5">公司 / 机构</label>
                  <input name="company" value={formData.company} onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))} className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#2563eb]" placeholder="公司或机构名称" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0f172a] mb-1.5">需求说明 *</label>
                  <textarea name="message" value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} required rows={4} className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#2563eb] resize-none" placeholder="请描述您的加工需求、材料、精度要求等" />
                </div>
                <button type="submit" disabled={isSubmitting || isSubmitted}
                  className={`w-full py-3.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    isSubmitted ? "bg-[#16a34a] text-white" : "bg-[#0f172a] text-white hover:bg-[#2563eb]"
                  } disabled:opacity-70`}
                >
                  {isSubmitting ? "发送中…" : isSubmitted ? "已提交" : <><Send className="w-4 h-4" />提交咨询</>}
                </button>
                {submitError && <p className="text-xs text-[#dc2626]">{submitError}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FAQ
          ================================================================ */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-10 text-center">常见问题</h2>
          <div className="space-y-4">
            {[
              ["是否提供样机试用？", "视行业与场景匹配度，可提供样件试制与共建试点线；具体 NRE 与里程碑在商务与技术评审后书面约定。"],
              ["飞秒加工与纳秒加工的核心区别？", "飞秒激光脉宽极短（< 500 fs），能量在热扩散发生前即完成沉积，实现真正的「冷加工」——无热影响区、无微裂纹、无材料损伤。"],
              ["RockCore 系统如何更新？", "工艺与模型以版本化资产交付，支持沙箱内二次开发与灰度发布；远程诊断与 OTA 通道就绪。"],
              ["数据保密如何保障？", "默认签署 NDA；敏感数据可本地推理与脱敏上传；联合课题知识产权与署名规则事前单独约定。"],
            ].map(([q, a], i) => (
              <div key={q} className={`animate-on-scroll delay-${(i + 1) * 100} p-5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]`}>
                <p className="font-semibold text-[#0f172a] text-sm mb-2">{q}</p>
                <p className="text-sm text-[#64748b] font-light leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
