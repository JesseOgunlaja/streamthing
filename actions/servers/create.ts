"use server";

import { cookies } from "next/headers";
import { isSignedIn } from "@/lib/auth";
import { redis } from "@/lib/redis";
import {
  findValueByKey,
  generateRandomNumbers,
  generateRandomString,
  hasExceededServerLimit,
} from "@/lib/utils";
import { ServerNameSchema, isValid } from "@/lib/zod/utils";

export async function createServer(name: string, region: string) {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);
  if (!signedIn) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  const serverID = generateRandomNumbers(20);
  const serverPassword = generateRandomString(32);

  const userKey = `user-${user.email}`;
  const serverKey = `server-${serverID}`;
  const currentServers = user.servers;

  if (!isValid(ServerNameSchema, name)) {
    return {
      ok: false,
      message: "Invalid name",
    };
  }

  if (findValueByKey(user.servers, "name", name)) {
    return {
      message: "Server with that name already exists",
      ok: false,
    };
  }

  if (hasExceededServerLimit(user)) {
    return {
      message: "Server limit exceeded, upgrade your plan to continue",
      ok: false,
    };
  }

  const newServer = {
    name,
    region,
    id: serverID,
    password: serverPassword,
    owner: user.email,
  };

  const newServers = [...currentServers, newServer];

  const redisPipeline = redis.pipeline();
  redisPipeline.json.set(serverKey, "$", newServer);
  redisPipeline.json.set(userKey, "$.servers", JSON.stringify(newServers));

  await redisPipeline.exec();

  return {
    message: "Successfully created server",
    ok: true,
  };
}
