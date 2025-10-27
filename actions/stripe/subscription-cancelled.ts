"use server";

import { serversByRegion } from "@/constants/constants";
import { VM_FETCH_CONFIG } from "@/lib/server-utils";
import { getUserByEmail, kv } from "@/lib/redis";
import { StripeTypes } from "@/lib/stripe";
import { UserType } from "@/lib/types";

export async function onSubscriptionCancelled(
	subscription: StripeTypes.Subscription,
) {
	const email = subscription.metadata.email;
	const user = await getUserByEmail(email);
	if (!user) return { ok: false };

	const newServers = user.servers.slice(0, 1);
	const emptyString = JSON.stringify("");

	const KVPipeline = kv.main.pipeline();
	KVPipeline.json.set(`user-${user.email}`, "$", {
		...user,
		stripe_customer_id: emptyString,
		stripe_subscription_id: emptyString,
		plan: "Hobby",
		servers: newServers,
	} satisfies UserType);
	user.servers.forEach((server) => {
		if (server.id === newServers[0].id) return;
		KVPipeline.json.del(`server-${server.id}`);
	});
	await KVPipeline.exec();
	user.servers.forEach((server) => {
		if (server.id === newServers[0].id) return;
		fetch(
			`${serversByRegion[server.region]}/reset-server-cache/${server.id}`,
			VM_FETCH_CONFIG,
		);
	});
	fetch(
		`${serversByRegion[newServers[0].region]}/reset-user-cache/${user.id}`,
		VM_FETCH_CONFIG,
	);

	return { ok: true };
}
