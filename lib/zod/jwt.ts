import { z } from "zod";
import { UserSchema } from "./user";

export const SessionJWTSchema = z
  .object({
    sessionID: z.string(),
    type: z.literal("session"),
    iat: z.number(),
    exp: z.number(),
  })
  .strict();

export const AccessTokenJWTSchema = z
  .object({
    identifier: z.string(),
    type: z.literal("access_token"),
    iat: z.number(),
    exp: z.number(),
  })
  .strict();

export const EmailVerificationJWTSchema = z
  .object({
    email: z.string(),
    type: z.literal("verify email"),
    iat: z.number(),
    exp: z.number(),
  })
  .strict();

export const NewEmailVerificationJWTSchema = z
  .object({
    user: UserSchema,
    newEmail: z.string(),
    type: z.literal("update email"),
    iat: z.number(),
    exp: z.number(),
  })
  .strict();

export const ResetPasswordJWTSchema = z
  .object({
    email: z.string(),
    code: z.string(),
    type: z.literal("reset password"),
    iat: z.number(),
    exp: z.number(),
  })
  .strict();
