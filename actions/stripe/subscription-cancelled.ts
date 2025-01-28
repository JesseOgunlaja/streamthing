"use server";

import { serversByRegion } from "@/constants/constants";
import { getUserByEmail, redis } from "@/lib/redis";
import { StripeTypes } from "@/lib/stripe";
import { UserType } from "@/lib/types";

export async function onSubscriptionCancelled(
  subscription: StripeTypes.Subscription
) {
  const email = subscription.metadata.email;
  const user = await getUserByEmail(email);
  if (!user) return { ok: false };

  const newServers = user.servers.slice(0, 1);
  const emptyString = JSON.stringify("");

  const redisPipeline = redis.pipeline();
  redisPipeline.json.set(`user-${user.email}`, "$", {
    ...user,
    stripe_customer_id: emptyString,
    stripe_subscription_id: emptyString,
    plan: "Hobby",
    servers: newServers,
  } satisfies UserType);
  user.servers.forEach((server) => {
    if (server.id === newServers[0].id) return;
    redisPipeline.json.del(`server-${server.id}`);
  });
  await redisPipeline.exec();
  user.servers.forEach((server) => {
    if (server.id === newServers[0].id) return;
    fetch(`${serversByRegion[server.region]}/reset-server-cache/${server.id}`, {
      method: "POST",
      headers: {
        authorization: server.password,
      },
    });
  });
  fetch(
    `${serversByRegion[newServers[0].region]}/reset-user-cache/${user.id}`,
    {
      method: "POST",
    }
  );

  return { ok: true };
}
