import { Router, type Request, type Response } from "express";
import nodemailer from "nodemailer";

type ContactInquiryPayload = {
  name: string;
  email: string;
  company: string;
  scene: string;
  material?: string;
  precision?: string;
  cycle?: string;
  message: string;
};

const FALLBACK_RECEIVER_EMAIL = "1335929010@qq.com";

function getMailerTransport() {
  const host = process.env.SMTP_HOST || "smtp.qq.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP_USER / SMTP_PASS 未配置");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function parsePayload(body: unknown): ContactInquiryPayload | null {
  if (!body || typeof body !== "object") return null;
  const candidate = body as Partial<ContactInquiryPayload>;

  if (
    !isNonEmptyString(candidate.name) ||
    !isNonEmptyString(candidate.email) ||
    !isNonEmptyString(candidate.company) ||
    !isNonEmptyString(candidate.scene) ||
    !isNonEmptyString(candidate.message)
  ) {
    return null;
  }

  return {
    name: candidate.name.trim(),
    email: candidate.email.trim(),
    company: candidate.company.trim(),
    scene: candidate.scene.trim(),
    material: candidate.material?.trim(),
    precision: candidate.precision?.trim(),
    cycle: candidate.cycle?.trim(),
    message: candidate.message.trim(),
  };
}

export const contactRouter = Router();

contactRouter.post("/", async (req: Request, res: Response) => {
  const payload = parsePayload(req.body);
  if (!payload) {
    res.status(400).json({ error: "提交信息不完整或格式错误" });
    return;
  }

  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || FALLBACK_RECEIVER_EMAIL;
  const senderEmail = process.env.CONTACT_SENDER_EMAIL || process.env.SMTP_USER;

  try {
    const transporter = getMailerTransport();

    await transporter.sendMail({
      from: senderEmail,
      to: receiverEmail,
      replyTo: payload.email,
      subject: `【商务咨询】${payload.company} - ${payload.name}`,
      text: [
        "收到新的商务咨询表单：",
        `姓名：${payload.name}`,
        `邮箱：${payload.email}`,
        `公司/机构：${payload.company}`,
        `应用场景：${payload.scene}`,
        `主要材料：${payload.material || "未填写"}`,
        `精度/质量指标：${payload.precision || "未填写"}`,
        `预算与期望周期：${payload.cycle || "未填写"}`,
        "",
        "补充说明：",
        payload.message,
      ].join("\n"),
      html: `
        <h2>收到新的商务咨询表单</h2>
        <ul>
          <li><strong>姓名：</strong>${payload.name}</li>
          <li><strong>邮箱：</strong>${payload.email}</li>
          <li><strong>公司/机构：</strong>${payload.company}</li>
          <li><strong>应用场景：</strong>${payload.scene}</li>
          <li><strong>主要材料：</strong>${payload.material || "未填写"}</li>
          <li><strong>精度/质量指标：</strong>${payload.precision || "未填写"}</li>
          <li><strong>预算与期望周期：</strong>${payload.cycle || "未填写"}</li>
        </ul>
        <p><strong>补充说明：</strong></p>
        <p>${payload.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("发送商务咨询邮件失败:", error);
    res.status(500).json({ error: "邮件发送失败，请稍后再试" });
  }
});
