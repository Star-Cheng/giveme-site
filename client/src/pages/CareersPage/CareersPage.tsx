import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, Upload, MapPin, Clock, Search, ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/LangContext";

export default function CareersPage() {
  useScrollReveal();
  const { t } = useLang();
  const apiBaseUrl = (import.meta.env.VITE_CONTACT_API_BASE_URL || "").trim();
  const shouldUseFormSubmit = !apiBaseUrl;
  const [formData, setFormData] = useState({ name: "", email: "", position: "", message: "" });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [activeDept, setActiveDept] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResumeFile(e.target.files?.[0] || null);
  };

  const handleResumeSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault(); e?.stopPropagation();
    setSubmitError("");
    if (formRef.current && !formRef.current.reportValidity()) return;
    setIsSubmitting(true);
    if (!resumeFile) { setSubmitError(t("careers.form.errorUpload")); setIsSubmitting(false); return; }
    if (shouldUseFormSubmit) { formRef.current?.submit(); setIsSubmitted(true); setTimeout(() => setIsSubmitted(false), 3000); setIsSubmitting(false); return; }
    const target = apiBaseUrl ? `${apiBaseUrl.replace(/\/$/, "")}/api/resume-submissions` : "/api/resume-submissions";
    const body = new FormData();
    body.append("name", formData.name); body.append("email", formData.email);
    body.append("position", formData.position); body.append("message", formData.message);
    body.append("resume", resumeFile);
    try {
      const r = await fetch(target, { method: "POST", headers: { Accept: "application/json" }, body });
      if (!r.ok) { const j = await r.json().catch(() => ({})) as { error?: string }; throw new Error(j.error || t("careers.form.errorGeneral")); }
      setIsSubmitted(true); setResumeFile(null); setFormData({ name: "", email: "", position: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) { setSubmitError(err instanceof Error ? err.message : t("careers.form.errorGeneral")); }
    finally { setIsSubmitting(false); }
  };

  const allRoles = [
    { titleKey: "careers.role.1.title", focusKey: "careers.role.1.focus", descKey: "careers.role.1.desc", dept: "optics", locationKey: "careers.role.1.location", typeKey: "careers.role.1.type" },
    { titleKey: "careers.role.2.title", focusKey: "careers.role.2.focus", descKey: "careers.role.2.desc", dept: "ai", locationKey: "careers.role.2.location", typeKey: "careers.role.2.type" },
    { titleKey: "careers.role.3.title", focusKey: "careers.role.3.focus", descKey: "careers.role.3.desc", dept: "mech", locationKey: "careers.role.3.location", typeKey: "careers.role.3.type" },
  ];

  const depts = [
    { key: null, labelKey: "careers.filter.all" },
    { key: "optics", labelKey: "careers.filter.optics" },
    { key: "ai", labelKey: "careers.filter.ai" },
    { key: "mech", labelKey: "careers.filter.mech" },
  ];

  const filteredRoles = activeDept ? allRoles.filter(r => r.dept === activeDept) : allRoles;

  const values = [
    { n: "01", titleKey: "careers.value.1.title", bodyKey: "careers.value.1.body" },
    { n: "02", titleKey: "careers.value.2.title", bodyKey: "careers.value.2.body" },
    { n: "03", titleKey: "careers.value.3.title", bodyKey: "careers.value.3.body" },
    { n: "04", titleKey: "careers.value.4.title", bodyKey: "careers.value.4.body" },
  ];

  return (
    <div className="bg-white">
      {/* ================================================================
          HERO — 极简居中（DJI style）
          ================================================================ */}
      <section className="pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#94a3b8] font-medium mb-6">
            {t("careers.hero.badge")}
          </p>
          <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold text-[#0f172a] leading-[1.12] tracking-tight mb-6 max-w-4xl mx-auto">
            {t("careers.hero.title")}
            <br />
            <span className="text-[#94a3b8] font-light">{t("careers.hero.subtitle")}</span>
          </h1>
          <p className="text-sm sm:text-base text-[#94a3b8] font-light max-w-xl mx-auto leading-relaxed">
            {t("careers.hero.desc")}
          </p>
        </div>
      </section>

      {/* ================================================================
          WHY — 三栏轻量卡片
          ================================================================ */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#e2e8f0] rounded-2xl overflow-hidden">
            {[
              { k: "careers.why.1.title", d: "careers.why.1.desc" },
              { k: "careers.why.2.title", d: "careers.why.2.desc" },
              { k: "careers.why.3.title", d: "careers.why.3.desc" },
            ].map(({ k, d }, i) => (
              <div key={k} className="bg-white p-8 sm:p-10 flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#94a3b8] font-medium mb-4">
                  {`0${i + 1}`}
                </span>
                <h3 className="text-lg font-bold text-[#0f172a] mb-3">{t(k)}</h3>
                <p className="text-sm text-[#64748b] font-light leading-relaxed">{t(d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          开放岗位 + 筛选器（DJI 风格）
          ================================================================ */}
      <section id="positions" className="pb-20 sm:pb-28 bg-[#f8fafc]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-8">{t("careers.roles.title")}</h2>

            {/* 筛选条 */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Search className="w-4 h-4 text-[#94a3b8] mr-1" />
              {depts.map((d) => (
                <button
                  key={d.key ?? "all"}
                  onClick={() => setActiveDept(d.key)}
                  className={`text-xs px-4 py-2 rounded-full font-medium transition-colors ${
                    activeDept === d.key
                      ? "bg-[#0f172a] text-white"
                      : "bg-white text-[#64748b] border border-[#e2e8f0] hover:border-[#0f172a] hover:text-[#0f172a]"
                  }`}
                >
                  {t(d.labelKey)}
                </button>
              ))}
            </div>

            {/* 岗位列表 */}
            <div className="space-y-3">
              {filteredRoles.map((role) => (
                <div
                  key={role.titleKey}
                  className="group bg-white rounded-xl border border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-sm transition-all overflow-hidden"
                >
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-[#0f172a] group-hover:text-[#185abd] transition-colors">
                          {t(role.titleKey)}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eff4fb] text-[#185abd] font-medium">
                          {t(role.typeKey)}
                        </span>
                      </div>
                      <p className="text-xs text-[#185abd] font-medium mb-2">{t(role.focusKey)}</p>
                      <p className="text-sm text-[#64748b] font-light leading-relaxed line-clamp-2">{t(role.descKey)}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs text-[#94a3b8] flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {t(role.locationKey)}
                      </span>
                      <a
                        href="#apply"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0f172a] hover:text-[#185abd] transition-colors"
                      >
                        {t("careers.roles.apply")}
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRoles.length === 0 && (
              <p className="text-sm text-[#94a3b8] text-center py-12">{t("careers.roles.empty")}</p>
            )}
          </div>

          <p className="text-sm text-[#94a3b8] font-light text-center">{t("careers.roles.desc")}</p>
        </div>
      </section>

      {/* ================================================================
          人在疾石 — 价值观
          ================================================================ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-12">{t("careers.values.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#e2e8f0] rounded-2xl overflow-hidden">
            {values.map((v) => (
              <div key={v.titleKey} className="bg-white p-8 sm:p-10">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#94a3b8] font-medium mb-4 block">
                  {v.n}
                </span>
                <h3 className="text-lg font-bold text-[#0f172a] mb-3">{t(v.titleKey)}</h3>
                <p className="text-sm text-[#64748b] font-light leading-relaxed">{t(v.bodyKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          投递表单 — 极简
          ================================================================ */}
      <section id="apply" className="py-20 sm:py-28 bg-[#f8fafc]">
        <div className="max-w-[720px] mx-auto px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-2">{t("careers.form.title")}</h2>
          <p className="text-sm text-[#94a3b8] font-light mb-10">{t("careers.form.desc")}</p>

          <form
            ref={formRef}
            onSubmit={(e) => e.preventDefault()}
            action={shouldUseFormSubmit ? "https://formsubmit.co/ur@ultrarock.net" : undefined}
            method="POST" encType="multipart/form-data"
          >
            {shouldUseFormSubmit && (
              <>
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_cc" value="rabbit@ultrarock.net" />
                <input type="hidden" name="_subject" value={`【简历投递】${formData.position} - ${formData.name}`} />
              </>
            )}

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputRow label={t("careers.form.name")} name="name" value={formData.name} onChange={handleTextChange} placeholder={t("careers.form.namePlaceholder")} required />
                <InputRow label={t("careers.form.email")} name="email" type="email" value={formData.email} onChange={handleTextChange} placeholder="your@email.com" required />
              </div>
              <InputRow label={t("careers.form.position")} name="position" value={formData.position} onChange={handleTextChange} placeholder={t("careers.form.positionPlaceholder")} required />
              <div>
                <label className="block text-xs font-medium text-[#0f172a] mb-2">{t("careers.form.file")}</label>
                <input
                  name={shouldUseFormSubmit ? "attachment" : "resume"}
                  type="file" onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  required
                  className="block w-full text-sm text-[#64748b] file:mr-4 file:px-5 file:py-2.5 file:rounded-lg file:border-0 file:bg-[#f1f5f9] file:text-[#0f172a] file:font-medium file:cursor-pointer file:text-xs hover:file:bg-[#e2e8f0] transition-colors"
                />
                <p className="text-xs text-[#94a3b8] mt-2">{t("careers.form.fileHint")}</p>
              </div>
              <TextareaRow label={t("careers.form.message")} name="message" value={formData.message} onChange={handleTextChange} placeholder={t("careers.form.messagePlaceholder")} />

              <button
                type="button"
                onClick={() => { void handleResumeSubmit(); }}
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-3.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                  isSubmitted
                    ? "bg-[#16a34a] text-white"
                    : "bg-[#0f172a] text-white hover:bg-[#1e293b]"
                } disabled:opacity-60`}
              >
                {isSubmitting ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t("careers.form.submitting")}</>
                ) : isSubmitted ? (
                  t("careers.form.submitted")
                ) : (
                  <><Upload className="w-4 h-4" />{t("careers.form.submit")}</>
                )}
              </button>
              {isSubmitted && <p className="text-sm text-[#16a34a] text-center">{t("careers.form.successMsg")}</p>}
              {submitError && <p className="text-sm text-[#dc2626] text-center">{submitError}</p>}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

/* ---- 表单原子组件 ---- */
function InputRow({ label, name, type = "text", value, onChange, placeholder, required }: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; placeholder: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#0f172a] mb-2">{label}</label>
      <input
        name={name} type={type} value={value} onChange={onChange} required={required}
        placeholder={placeholder}
        className="w-full px-0 py-2.5 bg-transparent border-b border-[#e2e8f0] text-sm text-[#0f172a] placeholder:text-[#cbd5e1] focus:outline-none focus:border-[#0f172a] transition-colors"
      />
    </div>
  );
}

function TextareaRow({ label, name, value, onChange, placeholder }: {
  label: string; name: string; value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void; placeholder: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#0f172a] mb-2">{label}</label>
      <textarea
        name={name} rows={3} value={value} onChange={onChange}
        placeholder={placeholder}
        className="w-full px-0 py-2.5 bg-transparent border-b border-[#e2e8f0] text-sm text-[#0f172a] placeholder:text-[#cbd5e1] focus:outline-none focus:border-[#0f172a] transition-colors resize-none"
      />
    </div>
  );
}
