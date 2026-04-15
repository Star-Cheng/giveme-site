import { useEffect } from "react";
import { Award, BookOpen, Users, Heart } from "lucide-react";

export default function AboutPage() {
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

    // 立即显示头部元素
    setTimeout(() => {
      const heroElements = document.querySelectorAll(".animate-hero");
      heroElements.forEach((el) => el.classList.add("visible"));
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-32">
      {/* Hero 区域 */}
      <section className="section pb-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 左侧 - 图片 */}
            <div className="animate-hero order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[4/5] rounded-lg bg-gradient-to-br from-card via-border-light to-border overflow-hidden">
                  {/* 头像占位 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                      <span className="font-serif text-6xl text-brand/40">陈</span>
                    </div>
                  </div>
                </div>
                {/* 装饰 */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-brand/20 rounded-lg -z-10" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand/5 rounded-lg -z-10" />
              </div>
            </div>

            {/* 右侧 - 内容 */}
            <div className="order-1 lg:order-2">
              <span className="animate-hero text-xs tracking-widest uppercase text-brand font-medium">
                关于我
              </span>
              <h1 className="animate-hero delay-100 font-serif text-4xl md:text-5xl font-medium mt-4 mb-6">
                你好，我是陈思远
              </h1>
              <div className="animate-hero delay-200 space-y-4 text-muted-foreground font-light leading-relaxed">
                <p>
                  一名深耕品牌设计与数字体验的设计师，2016 年毕业于伦敦艺术大学传媒学院，
                  拥有 8 年+跨领域设计经验，服务过 startups 到世界 500 强企业。
                </p>
                <p>
                  我的设计哲学是「less but better」—— 不追求繁复的装饰，
                  而是专注于挖掘品牌的核心价值，用精准的视觉语言讲述独特的故事。
                </p>
                <p>
                  相信好的设计不仅是美的呈现，更是解决问题的工具，是连接品牌与用户的桥梁。
                </p>
              </div>

              {/* 签名 */}
              <div className="animate-hero delay-300 mt-8 flex items-center gap-4">
                <div className="font-serif text-2xl italic text-brand">
                  陈思远
                </div>
                <div className="w-12 h-px bg-border" />
                <span className="text-sm text-muted-foreground font-light">
                  深圳 · 2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 专业能力 */}
      <section className="section bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="animate-on-scroll text-xs tracking-widest uppercase text-brand font-medium">
              专业能力
            </span>
            <h2 className="animate-on-scroll delay-100 font-serif text-3xl md:text-4xl font-medium mt-4">
              我擅长的领域
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                className={`animate-on-scroll delay-${(index + 1) * 100} group p-8 bg-background rounded-xl hover:shadow-lg transition-shadow`}
              >
                <div className="w-12 h-12 rounded-lg bg-brand/10 text-brand flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-colors">
                  <skill.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-3">
                  {skill.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 工作经历 */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="animate-on-scroll text-xs tracking-widest uppercase text-brand font-medium">
              工作经历
            </span>
            <h2 className="animate-on-scroll delay-100 font-serif text-3xl md:text-4xl font-medium mt-4">
              走过的路
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`animate-on-scroll delay-${(index + 1) * 100} relative pl-8 pb-12 ${
                  index !== experiences.length - 1 ? "border-l border-border" : ""
                } last:pb-0`}
              >
                {/* 时间线点 */}
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-1/2 rounded-full bg-brand" />

                <div className="ml-6">
                  <span className="text-xs text-muted-foreground font-light">
                    {exp.period}
                  </span>
                  <h3 className="font-serif text-xl font-medium mt-1">
                    {exp.position}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 mb-4">
                    <span className="text-sm text-brand">{exp.company}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">
                      {exp.location}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 荣誉奖项 */}
      <section className="section bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="animate-on-scroll text-xs tracking-widest uppercase text-brand font-medium">
              荣誉奖项
            </span>
            <h2 className="animate-on-scroll delay-100 font-serif text-3xl md:text-4xl font-medium mt-4">
              业界认可
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div
                key={award.title}
                className={`animate-on-scroll delay-${(index + 1) * 100} group p-6 bg-background rounded-lg border border-border hover:border-brand/30 transition-colors`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{award.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {award.organization} · {award.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 教育背景 */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="animate-on-scroll text-xs tracking-widest uppercase text-brand font-medium">
                教育背景
              </span>
              <h2 className="animate-on-scroll delay-100 font-serif text-3xl font-medium mt-4 mb-8">
                专业训练
              </h2>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={edu.school}
                    className={`animate-on-scroll delay-${(index + 1) * 100}`}
                  >
                    <span className="text-xs text-muted-foreground font-light">
                      {edu.period}
                    </span>
                    <h3 className="font-medium mt-1">{edu.degree}</h3>
                    <p className="text-sm text-brand">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="animate-on-scroll text-xs tracking-widest uppercase text-brand font-medium">
                公益与活动
              </span>
              <h2 className="animate-on-scroll delay-100 font-serif text-3xl font-medium mt-4 mb-8">
                社会参与
              </h2>

              <div className="space-y-6">
                {activities.map((activity, index) => (
                  <div
                    key={activity.title}
                    className={`animate-on-scroll delay-${(index + 1) * 100} flex items-start gap-4`}
                  >
                    <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-sm text-muted-foreground font-light mt-1">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const skills = [
  {
    icon: BookOpen,
    title: "品牌策略",
    description: "深入理解品牌核心价值，制定差异化定位策略，构建独特的品牌识别系统",
  },
  {
    icon: Award,
    title: "视觉设计",
    description: "LOGO、VI 系统、品牌视觉规范，确保品牌形象的一致性与延展性",
  },
  {
    icon: Users,
    title: "用户体验",
    description: "从用户视角出发，设计直观、高效、愉悦的数字产品体验",
  },
  {
    icon: Heart,
    title: "包装设计",
    description: "产品包装的创意设计与结构优化，线上线下多场景应用",
  },
];

const experiences = [
  {
    period: "2021 - 至今",
    position: "设计总监",
    company: "Creative Studio",
    location: "深圳",
    description:
      "负责公司整体设计方向，带领 8 人设计团队，服务超过 30 个品牌客户，涵盖科技、消费、教育等多个领域",
  },
  {
    period: "2018 - 2021",
    position: "高级品牌设计师",
    company: "Digital Agency",
    location: "上海",
    description:
      "专注数字化品牌转型，为互联网企业提供从品牌策略到 UI 设计的全链路服务",
  },
  {
    period: "2016 - 2018",
    position: "品牌设计师",
    company: "Brand Consultancy",
    location: "伦敦",
    description:
      "参与多个国际品牌项目，积累了丰富的跨文化设计经验",
  },
];

const awards = [
  {
    title: "Pentawards 铜奖",
    organization: "Pentawards",
    year: "2023",
  },
  {
    title: "iF Design Award",
    organization: "iF International Forum Design",
    year: "2022",
  },
  {
    title: "CSS Design Awards",
    organization: "CSSDA",
    year: "2023",
  },
  {
    title: "站酷金奖",
    organization: "站酷",
    year: "2022",
  },
  {
    title: "纽约艺术指导俱乐部",
    organization: "NY ADC",
    year: "2021",
  },
  {
    title: "D&AD 木铅笔奖",
    organization: "D&AD",
    year: "2020",
  },
];

const education = [
  {
    period: "2014 - 2016",
    degree: "品牌设计硕士",
    school: "伦敦艺术大学传媒学院",
  },
  {
    period: "2010 - 2014",
    degree: "视觉传达学士",
    school: "中国美术学院",
  },
];

const activities = [
  {
    title: "DesignThinkers 分享嘉宾",
    description: "受邀分享品牌设计方法论与实践经验，线上观看人数超过 5000 人",
  },
  {
    title: "深圳大学 客座讲师",
    description: "为艺术设计学院学生开设品牌设计实践课程",
  },
  {
    title: "残障儿童艺术教育志愿者",
    description: "定期参与公益活动，用设计帮助特殊群体",
  },
];
