"use server";

import { serversByRegion } from "@/constants/constants";
import { isSignedIn } from "@/lib/auth";
import { kv } from "@/lib/redis";
import { generateRandomString } from "@/lib/utils";
import { cookies } from "next/headers";

export async function resetServerPassword(serverID: string) {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);
  if (!signedIn) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  const server = user.servers.find((server) => server.id === serverID);
  if (!server) {
    return {
      ok: false,
      message: "Server not found",
    };
  }

  await fetch(
    `${serversByRegion[server.region]}/reset-server-cache/${serverID}`,
    {
      method: "POST",
      headers: {
        authorization: server.password,
      },
    }
  );

  server.password = generateRandomString(32);
  const kvPipeline = kv.main.pipeline();
  kvPipeline.json.set(
    `server-${serverID}`,
    "$.password",
    JSON.stringify(server.password)
  );
  kvPipeline.json.set(
    `user-${user.email}`,
    "$.servers",
    JSON.stringify(user.servers)
  );
  await kvPipeline.exec();

  return {
    ok: true,
    message: "Password reset successfully",
  };
}
