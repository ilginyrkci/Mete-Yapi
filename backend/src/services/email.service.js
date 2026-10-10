import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
});

export async function sendEmail({ to, subject, html }) {
  if (!env.SMTP_USER) return;
  return transporter.sendMail({ from: env.SMTP_FROM, to, subject, html });
}
