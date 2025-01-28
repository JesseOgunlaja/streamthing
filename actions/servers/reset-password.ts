"use server";

import { serversByRegion } from "@/constants/constants";
import { isSignedIn } from "@/lib/auth";
import { redis } from "@/lib/redis";
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
  const redisPipeline = redis.pipeline();
  redisPipeline.json.set(
    `server-${serverID}`,
    "$.password",
    JSON.stringify(server.password)
  );
  redisPipeline.json.set(
    `user-${user.email}`,
    "$.servers",
    JSON.stringify(user.servers)
  );
  await redisPipeline.exec();

  return {
    ok: true,
    message: "Password reset successfully",
  };
}
