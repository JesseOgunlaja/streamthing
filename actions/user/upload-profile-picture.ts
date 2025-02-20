"use server";

import { utapi } from "@/app/api/uploadthing/core";
import { isSignedIn } from "@/lib/auth";
import { env } from "@/lib/env";
import { kv } from "@/lib/redis";
import { UserType } from "@/lib/types";
import { cookies } from "next/headers";

export async function uploadProfilePicture(id: string) {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);
  if (!signedIn) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  try {
    utapi.deleteFiles(user.profilePictureID);
  } catch {}

  await kv.main.json.set(`user-${user.email}`, "$", {
    ...user,
    profilePictureID: id,
    profilePicture: `https://${env.UPLOADTHING_APP_ID}.ufs.sh/f/${id}`,
  } satisfies UserType);

  return {
    ok: true,
    message: "Success",
  };
}
