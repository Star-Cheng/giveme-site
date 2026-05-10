import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Upload, Rocket } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function CareersPage() {
  useScrollReveal();
  const apiBaseUrl = (import.meta.env.VITE_CONTACT_API_BASE_URL || "").trim();
  const isGithubPages = window.location.hostname.endsWith("github.io");
  const shouldUseFormSubmit = !apiBaseUrl && isGithubPages;
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
      setSubmitError("请上传 PDF 或 Word 简历文件");
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
        throw new Error(result.error || "提交失败");
      }
      setIsSubmitted(true);
      setResumeFile(null);
      setFormData({ name: "", email: "", position: "", message: "" });
      window.setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "提交失败，请稍后再试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28">
      {/* HERO */}
      <section className="section pb-12">
        <div className="container-custom max-w-3xl">
          <span className="animate-hero text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
            加入我们
          </span>
          <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl font-medium mt-4 mb-6 leading-tight">
            在飞秒与磐石之间
            <br />
            <span className="text-accent italic">找到你的位置</span>
          </h1>
          <p className="animate-hero delay-200 text-muted-foreground font-light leading-relaxed text-sm md:text-base">
            与我们一起重新定义激光的极限——光子学 × 材料 × AI × 精密机械，跨学科团队等你加入。
          </p>
        </div>
      </section>

      {/* 岗位 */}
      <section className="section bg-card border-y border-border-light">
        <div className="container-custom">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-8">开放岗位</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, i) => (
              <div
                key={role.title}
                className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-xl bg-background border border-border card-hover`}
              >
                <h3 className="font-serif text-lg font-medium mb-2">{role.title}</h3>
                <p className="text-xs text-accent font-medium uppercase tracking-wider mb-3">{role.focus}</p>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 文化 */}
      <section className="section">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium text-center mb-10">我们相信</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`animate-on-scroll delay-${(i + 1) * 100} p-6 rounded-xl border border-border-light`}
              >
                <h3 className="font-medium text-sm mb-2 text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 投递表单 */}
      <section className="section bg-card border-y border-border-light">
        <div className="container-custom max-w-xl mx-auto">
          <h2 className="animate-on-scroll font-serif text-2xl font-medium mb-2 text-center">投递简历</h2>
          <p className="animate-on-scroll delay-100 text-sm text-muted-foreground font-light mb-8 text-center">
            没有找到完全匹配的岗位也欢迎投递——我们相信优秀的人会定义自己的角色。
          </p>

          <div className="animate-on-scroll delay-200">
            <form
              ref={formRef}
              onSubmit={(e) => e.preventDefault()}
              action={shouldUseFormSubmit ? "https://formsubmit.co/1335929010@qq.com" : undefined}
              method="POST"
              encType="multipart/form-data"
              className="p-8 rounded-2xl bg-background border border-border space-y-5"
            >
              {shouldUseFormSubmit && (
                <>
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_cc" value="fccgccn@gmail.com" />
                  <input type="hidden" name="_subject" value={`【简历投递】${formData.position} - ${formData.name}`} />
                </>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="resume-name" className="block text-xs font-medium mb-1.5 text-foreground">姓名 *</label>
                  <input
                    id="resume-name" name="name" type="text" value={formData.name} onChange={handleTextChange} required
                    placeholder="您的姓名"
                    className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="resume-email" className="block text-xs font-medium mb-1.5 text-foreground">邮箱 *</label>
                  <input
                    id="resume-email" name="email" type="email" value={formData.email} onChange={handleTextChange} required
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="resume-position" className="block text-xs font-medium mb-1.5 text-foreground">投递岗位 *</label>
                <input
                  id="resume-position" name="position" type="text" value={formData.position} onChange={handleTextChange} required
                  placeholder="例如：光学工程师"
                  className="w-full px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="resume-file" className="block text-xs font-medium mb-1.5 text-foreground">简历附件（PDF / Word）*</label>
                <input
                  id="resume-file"
                  name={shouldUseFormSubmit ? "attachment" : "resume"}
                  type="file" onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  required
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border file:border-border file:bg-background file:text-foreground file:cursor-pointer file:text-xs"
                />
                <p className="text-xs text-muted-foreground mt-2">单个文件不超过 10MB。</p>
              </div>

              <div>
                <label htmlFor="resume-message" className="block text-xs font-medium mb-1.5 text-foreground">补充说明</label>
                <textarea
                  id="resume-message" name="message" rows={4} value={formData.message} onChange={handleTextChange}
                  placeholder="可填写项目经历、可入职时间等"
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
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />提交中…</>
                ) : isSubmitted ? (
                  "提交成功"
                ) : (
                  <><Upload className="w-4 h-4" />提交简历</>
                )}
              </button>
              {isSubmitted ? <p className="text-sm text-success text-center">投递成功，我们会尽快查收并联系你。</p> : null}
              {submitError ? <p className="text-sm text-destructive text-center">{submitError}</p> : null}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

const roles = [
  {
    title: "光学工程师",
    focus: "光学 × 飞秒激光",
    desc: "飞秒激光系统光路设计与优化，高像差抑制与光束质量控制，面向硬脆材料加工的工艺光路开发。",
  },
  {
    title: "AI 算法工程师",
    focus: "机器学习 × 实时系统",
    desc: "加工质量预测模型、自适应参数优化、光束整形神经网络——把模型部署到产线上的每一颗光子。",
  },
  {
    title: "精密机械工程师",
    focus: "结构 × 热 × 运动",
    desc: "热—振—光一体化结构设计，长期重复精度保障，为飞秒加工提供磐石般的机械平台。",
  },
];

const values = [
  { title: "跨学科协作", body: "好激光是光子学 × 材料 × 机械 × AI 的乘积。尊重每一个领域的专业深度。" },
  { title: "工程资产化", body: "工艺不是玄学，是可版本管理的工程资产。用系统把个人经验沉淀为组织能力。" },
  { title: "快速实验闭环", body: "鼓励可证伪的技术假设与小规模验证——把试点数据当作一等公民。" },
  { title: "尊重创造者", body: "联合署名与知识产权条款事前书面约定。贡献被看见、被记录、被回报。" },
];
