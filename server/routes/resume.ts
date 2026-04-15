import path from "node:path";
import { Router, type Request, type Response } from "express";
import multer from "multer";
import nodemailer from "nodemailer";

const FALLBACK_RECEIVER_EMAILS = ["1335929010@qq.com", "fccgccn@gmail.com"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
});

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

function isAllowedFile(file: Express.Multer.File) {
  const ext = path.extname(file.originalname || "").toLowerCase();
  const extAllowed = ALLOWED_EXTENSIONS.has(ext);
  const mimeAllowed = ALLOWED_MIME_TYPES.has(file.mimetype);
  return extAllowed || mimeAllowed;
}

function normalizeAttachmentFilename(file: Express.Multer.File) {
  const original = (file.originalname || "").trim();
  const extFromName = path.extname(original).toLowerCase();
  const extFromMime =
    file.mimetype === "application/pdf"
      ? ".pdf"
      : file.mimetype === "application/msword"
        ? ".doc"
        : file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ? ".docx"
          : "";
  const ext = ALLOWED_EXTENSIONS.has(extFromName) ? extFromName : extFromMime || ".pdf";
  const nameWithoutExt = path.basename(original, ext).trim();
  const safePrefix = nameWithoutExt ? nameWithoutExt.replace(/[^\w\u4e00-\u9fa5-]+/g, "_") : "resume";
  return `${safePrefix || "resume"}-${Date.now()}${ext}`;
}

export const resumeRouter = Router();

resumeRouter.post("/", upload.single("resume"), async (req: Request, res: Response) => {
  const name = req.body.name;
  const email = req.body.email;
  const position = req.body.position;
  const message = req.body.message;
  const file = req.file;

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(position) ||
    !file
  ) {
    res.status(400).json({ error: "请填写姓名、邮箱、投递岗位并上传简历文件" });
    return;
  }

  if (!isAllowedFile(file)) {
    res.status(400).json({ error: "仅支持上传 PDF / Word（.pdf / .doc / .docx）文件" });
    return;
  }

  const receiverEmails = (process.env.RESUME_RECEIVER_EMAIL || FALLBACK_RECEIVER_EMAILS.join(","))
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const senderEmail = process.env.CONTACT_SENDER_EMAIL || process.env.SMTP_USER;

  try {
    const transporter = getMailerTransport();
    const attachmentFilename = normalizeAttachmentFilename(file);

    await transporter.sendMail({
      from: senderEmail,
      to: receiverEmails,
      replyTo: email,
      subject: `【简历投递】${position} - ${name}`,
      text: [
        "收到新的简历投递：",
        `姓名：${name}`,
        `邮箱：${email}`,
        `投递岗位：${position}`,
        `补充说明：${isNonEmptyString(message) ? message : "未填写"}`,
        "",
        `附件：${attachmentFilename}`,
      ].join("\n"),
      html: `
        <h2>收到新的简历投递</h2>
        <ul>
          <li><strong>姓名：</strong>${name}</li>
          <li><strong>邮箱：</strong>${email}</li>
          <li><strong>投递岗位：</strong>${position}</li>
          <li><strong>补充说明：</strong>${isNonEmptyString(message) ? message : "未填写"}</li>
          <li><strong>附件：</strong>${attachmentFilename}</li>
        </ul>
      `,
      attachments: [
        {
          filename: attachmentFilename,
          content: file.buffer,
          contentType: file.mimetype,
        },
      ],
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("发送简历邮件失败:", error);
    res.status(500).json({ error: "简历发送失败，请稍后再试" });
  }
});
