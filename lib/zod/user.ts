import { z } from "zod";

export const NameSchema = z
  .string()
  .min(1, {
    message: "Name required",
  })
  .max(32, {
    message: "Name can't be more than 32 characters",
  })
  .regex(/^[a-zA-Z0-9\s_-]+$/, {
    message: "No symbols allowed",
  });

export const EmailSchema = z
  .string()
  .min(1, {
    message: "Email required",
  })
  .email();
export const PasswordSchema = z
  .string()
  .min(1, {
    message: "Password required",
  })
  .min(8, {
    message: "Password must be 8 or more characters",
  })
  .max(64, {
    message: "Password can't be more than 64 characters",
  })
  .regex(/^(?=.*[\W_])[a-zA-Z0-9\W_]+$/, {
    message: "Password must contain a symbol.",
  });

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  githubID: z.string(),
  githubLogin: z.string(),
  verified: z.boolean(),
  auth: z.array(z.enum(["Internal", "GitHub"])),
  servers: z.array(
    z.object({
      name: z.string(),
      region: z.string(),
      id: z.string(),
      password: z.string(),
      owner: z.string(),
    })
  ),
  plan: z.enum(["Hobby", "Startup", "Premium", "Enterprise", "Pending"]),
  stripe_customer_id: z.string(),
  stripe_subscription_id: z.string(),
  profilePicture: z.string(),
  profilePictureID: z.string(),
});
