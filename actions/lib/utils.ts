"use server";

import EmailComponent from "@/components/EmailComponent";
import { env } from "@/lib/env";
import { createTransport } from "nodemailer";
import { ComponentProps } from "react";

const transporter = createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true,
  auth: {
    user: "noreply@whispernet.chat",
    pass: env.EMAIL_PASSWORD,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  props: ComponentProps<typeof EmailComponent>
) {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const mailOptions = {
    from: "WhisperNet <noreply@whispernet.chat>",
    to,
    subject,
    html: ReactDOMServer.renderToString(EmailComponent(props)),
  };

  await transporter.sendMail(mailOptions);
}
