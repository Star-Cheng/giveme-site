import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Send, Download, Wrench, BookOpen } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/LangContext";

export default function ContactPage() {
  const { t } = useLang();
  useScrollReveal();
  const apiBaseUrl = (import.meta.env.VITE_CONTACT_API_BASE_URL || "").trim();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const resolveSubmitTarget = () => {
    if (apiBaseUrl) return `${apiBaseUrl.replace(/\/$/, "")}/api/contact-inquiries`;
    // 静态托管（GitHub Pages / 自定义域名）→ FormSubmit 邮件中继
    return "https://formsubmit.co/ajax/ur@ultrarock.net";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const submitTarget = resolveSubmitTarget();
      const isFormSubmit = submitTarget.includes("formsubmit.co/ajax/");
      const payload = isFormSubmit
        ? { ...formData, _subject: `【商务咨询】${formData.company} - ${formData.name}`, _captcha: "false", _template: "table", _cc: "rabbit@ultrarock.net" }
        : formData;
      const response = await fetch(submitTarget, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(t("contact.form.error"));
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); setFormData({ name: "", email: "", company: "", message: "" }); }, 3000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t("contact.form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { icon: Download, titleKey: "contact.service.1.title", descKey: "contact.service.1.desc", href: "/products" },
    { icon: Wrench, titleKey: "contact.service.2.title", descKey: "contact.service.2.desc", href: "#support" },
    { icon: Send, titleKey: "contact.service.3.title", descKey: "contact.service.3.desc", href: "#contact-form" },
    { icon: BookOpen, titleKey: "contact.service.4.title", descKey: "contact.service.4.desc", href: "/solutions" },
  ];

  const faqs = [
    ["contact.faq.1.q", "contact.faq.1.a"],
    ["contact.faq.2.q", "contact.faq.2.a"],
    ["contact.faq.3.q", "contact.faq.3.a"],
    ["contact.faq.4.q", "contact.faq.4.a"],
  ];

  return (
    <div className="pt-28">
      {/* ================================================================
          HERO — DJI 风格
          ================================================================ */}
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <p className="text-xs text-[#185abd] font-medium tracking-wider uppercase mb-4">{t("contact.hero.badge")}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4 leading-tight">
            {t("contact.hero.title")}
            <br />
            <span className="text-[#185abd]">{t("contact.hero.subtitle")}</span>
          </h1>
          <p className="text-sm text-[#64748b] font-light max-w-lg leading-relaxed">
            {t("contact.hero.desc")}
          </p>
        </div>
      </section>

      {/* ================================================================
          服务入口卡片（DJI 风格）
          ================================================================ */}
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <h2 className="text-xl font-bold text-[#0f172a] mb-8">{t("contact.services")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((svc, i) => (
              <Link
                key={svc.titleKey}
                to={svc.href}
                className={`animate-on-scroll delay-${(i + 1) * 100} group p-6 rounded-2xl bg-[#f8fafc] border border-[#f1f5f9] hover:border-[#cbd5e1] hover:shadow-sm transition-all`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#eff4fb] flex items-center justify-center mb-4 group-hover:bg-[#185abd] transition-colors">
                  <svc.icon className="w-5 h-5 text-[#185abd] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#0f172a] mb-2">{t(svc.titleKey)}</h3>
                <p className="text-xs text-[#64748b] font-light">{t(svc.descKey)}</p>
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
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">{t("contact.info.title")}</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-[#94a3b8] font-medium tracking-wider uppercase mb-1">{t("contact.info.email.label")}</p>
                  <a href="mailto:ur@ultrarock.net" className="text-sm text-[#185abd] hover:underline">ur@ultrarock.net</a>
                </div>
                <div>
                  <p className="text-xs text-[#94a3b8] font-medium tracking-wider uppercase mb-1">{t("contact.info.address.label")}</p>
                  <p className="text-sm text-[#475569]">{t("contact.info.address")}</p>
                </div>
                <div>
                  <p className="text-xs text-[#94a3b8] font-medium tracking-wider uppercase mb-1">{t("contact.info.hours.label")}</p>
                  <p className="text-sm text-[#475569]">{t("contact.info.hours")}</p>
                </div>
              </div>
            </div>

            {/* 右侧：表单 */}
            <div>
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 border border-[#f1f5f9] space-y-5">
                <h3 className="font-bold text-[#0f172a]">{t("contact.form.title")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#0f172a] mb-1.5">{t("contact.form.name")}</label>
                    <input name="name" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} required className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#185abd]" placeholder={t("contact.form.name.placeholder")} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#0f172a] mb-1.5">{t("contact.form.email")}</label>
                    <input name="email" type="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#185abd]" placeholder={t("contact.form.email.placeholder")} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0f172a] mb-1.5">{t("contact.form.company")}</label>
                  <input name="company" value={formData.company} onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))} className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#185abd]" placeholder={t("contact.form.company.placeholder")} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0f172a] mb-1.5">{t("contact.form.message")}</label>
                  <textarea name="message" value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} required rows={4} className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#185abd] resize-none" placeholder={t("contact.form.message.placeholder")} />
                </div>
                <button type="submit" disabled={isSubmitting || isSubmitted}
                  className={`w-full py-3.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    isSubmitted ? "bg-[#16a34a] text-white" : "bg-[#0f172a] text-white hover:bg-[#185abd]"
                  } disabled:opacity-70`}
                >
                  {isSubmitting ? t("contact.form.submitting") : isSubmitted ? t("contact.form.submitted") : <><Send className="w-4 h-4" />{t("contact.form.submit")}</>}
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
          <h2 className="text-2xl font-bold text-[#0f172a] mb-10 text-center">{t("contact.faq.title")}</h2>
          <div className="space-y-4">
            {faqs.map(([qk, ak], i) => (
              <div key={qk} className={`animate-on-scroll delay-${(i + 1) * 100} p-5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]`}>
                <p className="font-semibold text-[#0f172a] text-sm mb-2">{t(qk)}</p>
                <p className="text-sm text-[#64748b] font-light leading-relaxed">{t(ak)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
