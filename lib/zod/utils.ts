import { Schema, z } from "zod";
import { EmailSchema, PasswordSchema } from "./user";

export function isValid<T extends boolean>(
  schema: Schema,
  value: unknown,
  returnError?: T
) {
  const result = schema.safeParse(value);
  return (
    returnError
      ? {
          success: result.success,
          error: result.error?.issues[0].message || "",
        }
      : schema.safeParse(value).success
  ) as T extends true ? { success: boolean; error: string } : boolean;
}
export const ServerNameSchema = z
  .string()
  .min(1, {
    message: "Server name is required",
  })
  .max(64, {
    message: "Server name can't be more than 64 characters",
  })
  .regex(/^[a-zA-Z0-9\s_-]+$/, {
    message: "No symbols allowed",
  });
export const credentialsSchemas = {
  email: EmailSchema,
  password: PasswordSchema,
};
