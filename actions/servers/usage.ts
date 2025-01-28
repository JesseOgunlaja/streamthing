"use server";

import { serversByRegion } from "@/constants/constants";
import { isSignedIn } from "@/lib/auth";
import { Server, UsageData } from "@/lib/types";
import { cookies } from "next/headers";

export async function getUsage(server?: Server) {
  try {
    const usage = {
      connections: 0,
      messages: 0,
      peakConnections: 0,
      connectionsToday: 0,
      dataTransfer: 0,
      maxMessageSize: 0,
    };

    const access_token = (await cookies()).get("access_token")?.value || "";
    const { user, signedIn } = await isSignedIn(access_token);

    if (!signedIn) return usage;

    if (!server) {
      const serverData = await Promise.all(
        user.servers.map(async (server) => {
          const URL = `${serversByRegion[server.region]}/get-server/${
            server.id
          }`;
          const res = await fetch(URL, {
            headers: {
              authorization: server.password,
            },
          });
          return res.json();
        })
      );

      serverData.forEach((data) => {
        const serverUsage = data.usage as UsageData;
        Object.keys(usage).forEach((value) => {
          const key = value as keyof UsageData;
          if (key === "peakConnections" || key === "maxMessageSize") {
            if (serverUsage[key] > usage[key]) usage[key] = serverUsage[key];
          } else {
            usage[key] += serverUsage[key];
          }
        });
      });

      return usage;
    } else {
      const URL = `${serversByRegion[server.region]}/get-server/${server.id}`;
      const res = await fetch(URL, {
        headers: {
          authorization: server.password,
        },
      });

      const data = await res.json();
      return data.usage || (usage as UsageData);
    }
  } catch (error) {
    return { message: "An unexpected error occurred, please refresh the page" };
  }
}
