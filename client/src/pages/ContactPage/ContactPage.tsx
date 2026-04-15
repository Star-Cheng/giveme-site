import { useState, useEffect, type FormEvent } from "react";
import { Send, MapPin, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    setTimeout(() => {
      const heroElements = document.querySelectorAll(".animate-hero");
      heroElements.forEach((el) => el.classList.add("visible"));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟提交
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // 重置表单
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        budget: "",
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
    <div className="pt-32">
      {/* Hero */}
      <section className="section pb-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* 左侧内容 */}
            <div>
              <span className="animate-hero text-xs tracking-widest uppercase text-brand font-medium">
                联系方式
              </span>
              <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl lg:text-6xl font-medium mt-4 mb-6">
                让我们一起
                <br />
                <span className="text-brand italic">创造美好</span>
              </h1>
              <p className="animate-hero delay-200 text-lg text-muted-foreground font-light max-w-md">
                无论是新品牌启动还是品牌升级，我都很乐意了解您的项目。
                期待与您一起探讨合作的可能性。
              </p>

              {/* 联系信息 */}
              <div className="animate-hero delay-300 mt-12 space-y-6">
                <a
                  href="mailto:siyuan.chen@studio.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5 text-brand group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-light mb-1">
                      邮箱
                    </div>
                    <div className="font-medium">siyuan.chen@studio.com</div>
                  </div>
                </a>

                <a
                  href="tel:+8613912345678"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5 text-brand group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-light mb-1">
                      电话
                    </div>
                    <div className="font-medium">+86 139 1234 5678</div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-light mb-1">
                      地址
                    </div>
                    <div className="font-medium">深圳市南山区科兴科学园</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧表单 */}
            <div className="animate-hero delay-200">
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl p-8 md:p-10 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        您的姓名 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="张三"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        邮箱地址 *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="zhangsan@example.com"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium mb-2"
                      >
                        公司/品牌
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="您的公司名称"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium mb-2"
                      >
                        项目预算
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-brand transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">请选择预算范围</option>
                        <option value="5k-10k">¥ 5,000 - 10,000</option>
                        <option value="10k-30k">¥ 10,000 - 30,000</option>
                        <option value="30k-50k">¥ 30,000 - 50,000</option>
                        <option value="50k-100k">¥ 50,000 - 100,000</option>
                        <option value="100k+">¥ 100,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      项目描述 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="请描述您的项目需求，包括项目类型、目标、时间要求等..."
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
                        发送中...
                      </>
                    ) : isSubmitted ? (
                      "已发送！我会尽快回复您"
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        发送消息
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="animate-on-scroll text-xs tracking-widest uppercase text-brand font-medium">
              常见问题
            </span>
            <h2 className="animate-on-scroll delay-100 font-serif text-3xl md:text-4xl font-medium mt-4">
              您可能想了解
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className={`animate-on-scroll delay-${(index + 1) * 100} bg-background rounded-xl p-6 md:p-8`}
              >
                <h3 className="font-serif text-lg font-medium mb-3">
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {faq.a}
                </p>
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
    q: "设计项目的周期一般是多久？",
    a: "根据项目类型和复杂度而定。简单的品牌设计通常需要 4-6 周，完整的品牌系统设计可能需要 8-12 周或更长时间。我会在项目启动前提供详细的时间计划表。",
  },
  {
    q: "项目合作的付款方式是怎样的？",
    a: "通常采用「首付 + 阶段款」的付款模式。首付 50% 启动项目，中间阶段 30%，交付完成 20%。具体会根据项目规模和合作方式进行灵活调整。",
  },
  {
    q: "可以只做部分设计服务吗？",
    a: "当然可以。我提供灵活的服务组合，您可以根据实际需求选择 LOGO 设计、VI 系统、包装设计等单项服务，也可以打包选择全套品牌服务。",
  },
  {
    q: "如果对设计稿不满意怎么办？",
    a: "每个设计阶段都会充分沟通确认方向。如果确实需要调整，我会认真听取反馈并进行修改。通常在合同约定的修改次数内都是免费的。",
  },
  {
    q: "异地合作可以吗？",
    a: "完全没问题。目前我的客户遍布全国各地，甚至海外。通过线上会议、即时通讯和云端协作工具，我们可以高效完成任何距离的合作。",
  },
];
