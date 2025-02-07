"use server";

import EmailComponent from "@/components/EmailComponent";
import { env } from "@/lib/env";
import { createTransport } from "nodemailer";
import { ComponentProps } from "react";

const transporter = createTransport({
  host: "in-v3.mailjet.com",
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
    headers: {
      "Sender-Avatar-Url":
        "https://gravatar.com/avatar/b47c3bf7a81a28130d5a07c58653ea48eeb8326258bf91e844088c31eeabdab2",
    },
  };

  await transporter.sendMail(mailOptions);
}
