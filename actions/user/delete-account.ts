"use server";

import { serversByRegion } from "@/constants/constants";
import { isSignedIn } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { stripeInstance } from "@/lib/stripe";
import { cookies } from "next/headers";

export async function deleteAccount() {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { signedIn, user } = await isSignedIn(access_token);

  if (!signedIn) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  const redisPipeline = redis.pipeline();
  user.servers.forEach((server) => {
    redisPipeline.del(`server-${server.id}`);
    fetch(`${serversByRegion[server.region]}/reset-user-cache/${user.id}`, {
      method: "POST",
    });
    fetch(`${serversByRegion[server.region]}/reset-server-cache/${server.id}`, {
      method: "POST",
      headers: {
        authorization: server.password,
      },
    });
  });
  if (user.githubID) {
    redisPipeline.del(`github-${user.githubID}`);
  }
  redisPipeline.del(`user-${user.email}`);

  if (user.stripe_customer_id) {
    await Promise.all([
      redisPipeline.exec(),
      stripeInstance.customers.del(user.stripe_customer_id),
    ]);
  } else {
    await redisPipeline.exec();
  }

  const cookiesInstance = await cookies();
  cookiesInstance.delete("session");

  return {
    ok: true,
    message: "Account deleted successfully",
  };
}
