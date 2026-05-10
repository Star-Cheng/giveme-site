import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Upload, Rocket } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/LangContext";

export default function CareersPage() {
  useScrollReveal();
  const { t } = useLang();
  const apiBaseUrl = (import.meta.env.VITE_CONTACT_API_BASE_URL || "").trim();
  // 静态托管（GitHub Pages / 自定义域名）→ FormSubmit 邮件中继
  const shouldUseFormSubmit = !apiBaseUrl;
  const [formData, setFormData] = useState({ name: "", email: "", position: "", message: "" });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResumeFile(e.target.files?.[0] || null);
  };

  const handleResumeSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    setSubmitError("");
    if (formRef.current && !formRef.current.reportValidity()) return;
    setIsSubmitting(true);

    if (!resumeFile) {
      setSubmitError(t("careers.form.errorUpload"));
      setIsSubmitting(false);
      return;
    }

    if (shouldUseFormSubmit) {
      formRef.current?.submit();
      setIsSubmitted(true);
      window.setTimeout(() => setIsSubmitted(false), 3000);
      setIsSubmitting(false);
      return;
    }

    const submitTarget = apiBaseUrl
      ? `${apiBaseUrl.replace(/\/$/, "")}/api/resume-submissions`
      : "/api/resume-submissions";
    const body = new FormData();
    body.append("name", formData.name);
    body.append("email", formData.email);
    body.append("position", formData.position);
    body.append("message", formData.message);
    body.append("resume", resumeFile);

    try {
      const response = await fetch(submitTarget, { method: "POST", headers: { Accept: "application/json" }, body });
      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(result.error || t("careers.form.errorGeneral"));
      }
      setIsSubmitted(true);
      setResumeFile(null);
      setFormData({ name: "", email: "", position: "", message: "" });
      window.setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t("careers.form.errorGeneral"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const roles = [
    { titleKey: "careers.role.1.title", focusKey: "careers.role.1.focus", descKey: "careers.role.1.desc" },
    { titleKey: "careers.role.2.title", focusKey: "careers.role.2.focus", descKey: "careers.role.2.desc" },
    { titleKey: "careers.role.3.title", focusKey: "careers.role.3.focus", descKey: "careers.role.3.desc" },
  ];

  const values = [
    { titleKey: "careers.value.1.title", bodyKey: "careers.value.1.body" },
    { titleKey: "careers.value.2.title", bodyKey: "careers.value.2.body" },
    { titleKey: "careers.value.3.title", bodyKey: "careers.value.3.body" },
    { titleKey: "careers.value.4.title", bodyKey: "careers.value.4.body" },
  ];

  return (
    <div className="pt-28">
      {/* HERO */}
      <section className="section pb-12">
        <div className="container-custom max-w-3xl">
          <span className="animate-hero text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
            {t("careers.hero.badge")}
          </span>
          <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl font-medium mt-4 mb-6 leading-tight">
            {t("careers.hero.title")}
            <br />
            <span className="text-accent italic">{t("careers.hero.subtitle")}</span>
          </h1>
          <p className="animate-hero delay-200 text-muted-foreground font-light leading-relaxed text-sm md:text-base">
            {t("careers.hero.desc")}
          </p>
        </div>
      </section>

      {/* 岗位 */}
      <section className="section bg-card border-y border-border-light">
        <div className="container-custom">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-8">{t("careers.roles.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, i) => (
              <div
                key={role.titleKey}
                className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-xl bg-background border border-border card-hover`}
              >
                <h3 className="font-serif text-lg font-medium mb-2">{t(role.titleKey)}</h3>
                <p className="text-xs text-accent font-medium uppercase tracking-wider mb-3">{t(role.focusKey)}</p>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{t(role.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 文化 */}
      <section className="section">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium text-center mb-10">{t("careers.values.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={v.titleKey}
                className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-xl border border-border-light`}
              >
                <h3 className="font-medium text-sm mb-2 text-foreground">{t(v.titleKey)}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{t(v.bodyKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 投递表单 */}
      <section className="section bg-card border-y border-border-light">
        <div className="container-custom max-w-xl mx-auto">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-2 text-center">{t("careers.form.title")}</h2>
          <p className="animate-on-scroll delay-100 text-sm text-muted-foreground font-light mb-8 text-center">
            {t("careers.form.desc")}
          </p>

          <div className="animate-on-scroll delay-200">
            <form
              ref={formRef}
              onSubmit={(e) => e.preventDefault()}
              action={shouldUseFormSubmit ? "https://formsubmit.co/ur@ultrarock.net" : undefined}
              method="POST"
              encType="multipart/form-data"
              className="p-8 rounded-2xl bg-background border border-border space-y-5"
            >
              {shouldUseFormSubmit && (
                <>
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_cc" value="rabbit@ultrarock.net" />
                  <input type="hidden" name="_subject" value={`【简历投递】${formData.position} - ${formData.name}`} />
                </>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="resume-name" className="block text-xs font-medium mb-1.5 text-foreground">{t("careers.form.name")}</label>
                  <input
                    id="resume-name" name="name" type="text" value={formData.name} onChange={handleTextChange} required
                    placeholder={t("careers.form.namePlaceholder")}
                    className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="resume-email" className="block text-xs font-medium mb-1.5 text-foreground">{t("careers.form.email")}</label>
                  <input
                    id="resume-email" name="email" type="email" value={formData.email} onChange={handleTextChange} required
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="resume-position" className="block text-xs font-medium mb-1.5 text-foreground">{t("careers.form.position")}</label>
                <input
                  id="resume-position" name="position" type="text" value={formData.position} onChange={handleTextChange} required
                  placeholder={t("careers.form.positionPlaceholder")}
                  className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="resume-file" className="block text-xs font-medium mb-1.5 text-foreground">{t("careers.form.file")}</label>
                <input
                  id="resume-file"
                  name={shouldUseFormSubmit ? "attachment" : "resume"}
                  type="file" onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  required
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border file:border-border file:bg-background file:text-foreground file:cursor-pointer file:text-xs"
                />
                <p className="text-xs text-muted-foreground mt-2">{t("careers.form.fileHint")}</p>
              </div>

              <div>
                <label htmlFor="resume-message" className="block text-xs font-medium mb-1.5 text-foreground">{t("careers.form.message")}</label>
                <textarea
                  id="resume-message" name="message" rows={4} value={formData.message} onChange={handleTextChange}
                  placeholder={t("careers.form.messagePlaceholder")}
                  className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="button"
                onClick={() => { void handleResumeSubmit(); }}
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm ${
                  isSubmitted ? "bg-success text-white" : "bg-foreground text-background hover:bg-accent"
                } disabled:opacity-70`}
              >
                {isSubmitting ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t("careers.form.submitting")}</>
                ) : isSubmitted ? (
                  t("careers.form.submitted")
                ) : (
                  <><Upload className="w-4 h-4" />{t("careers.form.submit")}</>
                )}
              </button>
              {isSubmitted ? <p className="text-sm text-success text-center">{t("careers.form.successMsg")}</p> : null}
              {submitError ? <p className="text-sm text-destructive text-center">{submitError}</p> : null}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
