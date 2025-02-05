"use server";

import { serversByRegion } from "@/constants/constants";
import { isSignedIn } from "@/lib/auth";
import { kv } from "@/lib/redis";
import { cookies } from "next/headers";

export async function editServerName(serverID: string, newName: string) {
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
      message: "Server with that name already exists",
    };
  }

  server.name = newName;

  const KVPipeline = kv.main.pipeline();
  KVPipeline.json.set(`server-${serverID}`, "$.name", JSON.stringify(newName));
  KVPipeline.json.set(
    `user-${user.email}`,
    "$.servers",
    JSON.stringify(user.servers)
  );
  await KVPipeline.exec();

  fetch(`${serversByRegion[server.region]}/reset-server-cache/${serverID}`, {
    method: "POST",
    headers: {
      authorization: server.password,
    },
  });

  return {
    ok: true,
    message: "Server name updated",
  };
}
