"use server";

import { serversByRegion } from "@/constants/constants";
import { isSignedIn } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { indexOf } from "@/lib/utils";
import { cookies } from "next/headers";

export async function deleteServer(serverID: string) {
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

  const redisPipeline = redis.pipeline();
  user.servers.splice(indexOf(user.servers, server), 1);
  redisPipeline.json.del(`server-${serverID}`);
  redisPipeline.json.set(
    `user-${user.email}`,
    "$.servers",
    JSON.stringify(user.servers)
  );
  await redisPipeline.exec();

  fetch(`${serversByRegion[server.region]}/reset-server-cache/${serverID}`, {
    method: "POST",
    headers: {
      authorization: server.password,
    },
  });

  return {
    ok: true,
    message: "Server successfully deleted",
  };
}
