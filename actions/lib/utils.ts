"use server";

import EmailComponent from "@/components/EmailComponent";
import { env } from "@/lib/env";
import { createTransport } from "nodemailer";
import { ComponentProps } from "react";

const transporter = createTransport({
  host: "mail.streamthing.dev",
  port: 587,
  auth: {
    user: env.EMAIL_USERNAME,
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
    from: "Streamthing <noreply@streamthing.dev>",
    to,
    subject,
    html: ReactDOMServer.renderToString(EmailComponent(props)),
  };

  await transporter.sendMail(mailOptions);
}
