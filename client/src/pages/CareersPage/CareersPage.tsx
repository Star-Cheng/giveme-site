import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Gift, MessageCircle, Rocket, Upload } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function CareersPage() {
  useScrollReveal();
  const apiBaseUrl = (import.meta.env.VITE_CONTACT_API_BASE_URL || "").trim();
  const isGithubPages = window.location.hostname.endsWith("github.io");
  const formSubmitAjaxAction = "https://formsubmit.co/ajax/1335929010@qq.com";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const resolveSubmitTarget = () => {
    if (apiBaseUrl) {
      return `${apiBaseUrl.replace(/\/$/, "")}/api/resume-submissions`;
    }
    if (isGithubPages) {
      return formSubmitAjaxAction;
    }
    return "/api/resume-submissions";
  };

  const buildNormalizedFilename = (file: File) => {
    const rawName = file.name || "";
    const dotIndex = rawName.lastIndexOf(".");
    const ext = dotIndex >= 0 ? rawName.slice(dotIndex).toLowerCase() : "";
    const allowedExt = ext === ".pdf" || ext === ".doc" || ext === ".docx" ? ext : ".pdf";
    return `resume-${Date.now()}${allowedExt}`;
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
  };

  const handleResumeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    if (!resumeFile) {
      setSubmitError("请上传 PDF 或 Word 简历文件");
      setIsSubmitting(false);
      return;
    }
    const submitTarget = resolveSubmitTarget();

    const body = new FormData();
    body.append("name", formData.name);
    body.append("email", formData.email);
    body.append("position", formData.position);
    body.append("message", formData.message);
    const normalizedFilename = buildNormalizedFilename(resumeFile);
    body.append(isGithubPages ? "attachment" : "resume", resumeFile, normalizedFilename);
    if (isGithubPages) {
      body.append("_subject", `【简历投递】${formData.position} - ${formData.name}`);
      body.append("_cc", "fccgccn@gmail.com");
      body.append("_captcha", "false");
      body.append("_template", "table");
    }

    try {
      const response = await fetch(submitTarget, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(result.error || "提交失败");
      }

      setIsSubmitted(true);
      setResumeFile(null);
      setFormData({ name: "", email: "", position: "", message: "" });
      window.setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "提交失败，请稍后再试";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="container-custom max-w-3xl">
          <div className="animate-on-scroll rounded-2xl border border-border-light bg-card p-8 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-2">在线投递简历</h2>
            <p className="text-sm text-muted-foreground font-light mb-8">
              支持上传 PDF / Word（.pdf / .doc / .docx）。简历会同时发送到
              <span className="text-foreground"> 1335929010@qq.com </span>
              和
              <span className="text-foreground"> fccgccn@gmail.com</span>。
            </p>

            <form onSubmit={handleResumeSubmit} className="space-y-5">
<<<<<<< HEAD
              {isGithubPages ? (
                <>
                  <input
                    type="hidden"
                    name="_subject"
                    value={`【简历投递】${formData.position || "未填写岗位"} - ${formData.name || "未填写姓名"}`}
                  />
                  <input type="hidden" name="_cc" value="fccgccn@gmail.com" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                </>
              ) : null}
=======
>>>>>>> 5d893cf (```)
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="resume-name" className="block text-sm font-medium mb-2">
                    姓名 *
                  </label>
                  <input
                    id="resume-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleTextChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="resume-email" className="block text-sm font-medium mb-2">
                    邮箱 *
                  </label>
                  <input
                    id="resume-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleTextChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="resume-position" className="block text-sm font-medium mb-2">
                  投递岗位 *
                </label>
                <input
                  id="resume-position"
                  name="position"
                  type="text"
                  value={formData.position}
                  onChange={handleTextChange}
                  required
                  placeholder="例如：光学 AI 工程师"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                />
              </div>

              <div>
                <label htmlFor="resume-file" className="block text-sm font-medium mb-2">
                  简历附件（PDF / Word）*
                </label>
                <input
                  id="resume-file"
                  name="resume"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  required
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border file:border-border file:bg-background file:text-foreground file:cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  单个文件不超过 10MB；上传后会作为邮件附件发送。
                </p>
              </div>

              <div>
                <label htmlFor="resume-message" className="block text-sm font-medium mb-2">
                  补充说明
                </label>
                <textarea
                  id="resume-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleTextChange}
                  placeholder="可填写项目经历、可入职时间、城市偏好等"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all bg-foreground text-background hover:bg-brand disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    提交中…
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    提交简历
                  </>
                )}
              </button>

              {isSubmitted ? (
                <p className="text-sm text-success">投递成功，我们会尽快查收并联系你。</p>
              ) : null}
              {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}
            </form>
          </div>

          <div className="text-center mt-10">
            <Link to="/contact" className="btn-outline group inline-flex">
              其它商务咨询
              <ArrowRight className="w-4 h-4 arrow-icon" />
            </Link>
          </div>
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
