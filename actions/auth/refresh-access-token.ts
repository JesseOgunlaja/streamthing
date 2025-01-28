"use server";

import { access_token_config } from "@/constants/constants";
import { createAccessToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function refreshAccessToken() {
  try {
    const cookiesInstance = await cookies();
    const session = cookiesInstance.get("session")?.value;
    const access_token = await createAccessToken(session);
    cookiesInstance.set("access_token", access_token, access_token_config);
  } catch {}
}
