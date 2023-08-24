import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
const nodemailer = require("nodemailer");

export const incidentNotification = (error: string) => {

  const client = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
      auth: {
          user: process.env.SYSTEM_MAILER_MAIL,
          pass: process.env.SYSTEM_MAILER_PASS
      }
  })

  client.sendMail(
    {
        from: process.env.SYSTEM_MAILER_MAIL,
        to: process.env.ADMIN_MAIL,
        subject: "BookHair - system issue",
        text: error
    }
)} ;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}