import nodemailer from "nodemailer";

export function getTransporter() {
  const port = Number(process.env.SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export function isMailerConfigured() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD
  );
}

export async function sendContactNotification(params: {
  toEmail: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  message: string;
  languagePair?: string;
}) {
  const transporter = getTransporter();
  const senderAddress = process.env.SMTP_FROM || process.env.SMTP_USER!;

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${senderAddress}>`,
    to: params.toEmail,
    replyTo: params.fromEmail,
    subject: `New inquiry: ${params.subject}`,
    text: [
      `Name: ${params.fromName}`,
      `Email: ${params.fromEmail}`,
      params.languagePair ? `Language pair: ${params.languagePair}` : null,
      "",
      params.message,
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <div style="font-family: sans-serif; font-size: 15px; color:#222;">
        <p><strong>Name:</strong> ${escapeHtml(params.fromName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(params.fromEmail)}</p>
        ${
          params.languagePair
            ? `<p><strong>Language pair:</strong> ${escapeHtml(params.languagePair)}</p>`
            : ""
        }
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;">${escapeHtml(params.message)}</p>
      </div>
    `,
  });
}

export async function sendContactAutoReply(params: {
  toEmail: string;
  toName: string;
  ownerName: string;
}) {
  const transporter = getTransporter();
  const senderAddress = process.env.SMTP_FROM || process.env.SMTP_USER!;

  await transporter.sendMail({
    from: `"${params.ownerName}" <${senderAddress}>`,
    to: params.toEmail,
    subject: `Thanks for reaching out, ${params.toName}`,
    text: `Hi ${params.toName},\n\nThanks for your message — I've received it and will reply within one business day.\n\nBest,\n${params.ownerName}`,
  });
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
