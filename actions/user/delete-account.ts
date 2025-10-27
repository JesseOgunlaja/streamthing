"use server";

import { cookies } from "next/headers";
import { serversByRegion, VM_FETCH_CONFIG } from "@/constants/constants";
import { isSignedIn } from "@/lib/auth";
import { kv } from "@/lib/redis";
import { stripeInstance } from "@/lib/stripe";

export async function deleteAccount() {
	const access_token = (await cookies()).get("access_token")?.value || "";
	const { signedIn, user } = await isSignedIn(access_token);

	if (!signedIn) {
		return {
			ok: false,
			message: "Unauthorized",
		};
	}

	const KVPipeline = kv.main.pipeline();
	user.servers.forEach((server) => {
		KVPipeline.del(`server-${server.id}`);
		fetch(
			`${serversByRegion[server.region]}/reset-user-cache/${user.id}`,
			VM_FETCH_CONFIG,
		);
		fetch(
			`${serversByRegion[server.region]}/reset-server-cache/${server.id}`,
			VM_FETCH_CONFIG,
		);
	});
	if (user.githubID) {
		KVPipeline.del(`github-${user.githubID}`);
	}
	KVPipeline.del(`user-${user.email}`);

	if (user.stripe_customer_id) {
		await Promise.all([
			KVPipeline.exec(),
			stripeInstance.customers.del(user.stripe_customer_id),
		]);
	} else {
		await KVPipeline.exec();
	}

	const cookiesInstance = await cookies();
	cookiesInstance.delete("session");

	return {
		ok: true,
		message: "Account deleted successfully",
	};
}
