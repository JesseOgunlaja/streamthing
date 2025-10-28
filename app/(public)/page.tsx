"use cache";

import Image from "next/image";
import Link from "next/link";
import Curve from "@/components/home/Curve";
import ClientCode from "@/components/home/code-blocks/Client";
import ServerCode from "@/components/home/code-blocks/Server";
import LeftSide from "@/components/home/main/LeftSide";
import RightSide from "@/components/home/main/RightSide";
import PricingCard from "@/components/PricingCard";
import { subscriptionPlansArray } from "@/constants/plans";
import styles from "@/styles/home/page.module.css";

export default async function Home() {
	return (
		<div id={styles.page}>
			<main>
				<LeftSide />
				<RightSide />
			</main>
			<div className={styles.middle}>
				<Curve />
				<h2 className={styles.subTitle}>
					The right balance of security and flexibility.
				</h2>
				<div className={styles.code}>
					<ServerCode />
					<ClientCode />
				</div>
				<h2 className={styles.subTitle}>
					Easily manage your servers all in one place.
				</h2>
				<Image alt="Dashboard" src="/dashboard.png" width={1082} height={484} />
				<Image
					alt="Dashboard"
					src="/dashboard-dark.png"
					width={1082}
					height={484}
				/>
				<Curve />
			</div>
			<h2 className={styles.subTitle}>
				Worry about your <span>apps</span>, <br /> not your pricing.
			</h2>
			<div className={styles["pricing-cards"]}>
				{subscriptionPlansArray.map((plan) => (
					<PricingCard
						hoverEffect={false}
						styles={styles}
						key={plan.title}
						{...plan}
					>
						<Link href="/signup">Get started now</Link>
					</PricingCard>
				))}
			</div>
		</div>
	);
}
