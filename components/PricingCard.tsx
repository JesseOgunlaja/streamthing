import { Check } from "lucide-react";
import Balancer from "react-wrap-balancer";
import { subscriptionPlansArray } from "@/constants/plans";
import { formatNumber } from "@/lib/lib";
import { GenericFunction, GenericObject } from "@/lib/types";

type PropsType = (typeof subscriptionPlansArray)[0] & {
	styles: GenericObject<string>;
	hoverEffect?: boolean;
	onClick?: GenericFunction;
	children?: React.ReactNode;
};

const PricingCard = ({
	title,
	description,
	monthlyPrice,
	limits,
	Logo,
	styles,
	onClick,
	children,
	hoverEffect = true,
}: PropsType) => {
	return (
		<article
			onClick={onClick}
			className={`${styles["pricing-card"]} ${hoverEffect && styles.hover}`}
		>
			<Logo />
			<p className={styles["pricing-card-title"]}>{title}</p>
			<p className={styles["pricing-card-description"]}>
				<Balancer>{description}</Balancer>
			</p>
			<p className={styles["pricing-card-price"]}>{monthlyPrice}</p>
			<div className={styles.features}>
				<p>Includes:</p>
				<div className={styles.feature}>
					<Check />
					<span className={styles["feature-amount"]}>Fast</span> Servers
				</div>
				<div className={styles.feature}>
					<Check />
					<span className={styles["feature-amount"]}>
						{formatNumber(limits.connections)}
					</span>{" "}
					Concurrent Connections
				</div>
				<div className={styles.feature}>
					<Check />
					<span className={styles["feature-amount"]}>
						{formatNumber(limits.messages)}
					</span>{" "}
					Messages per day
				</div>
				<div className={styles.feature}>
					<Check />
					<span className={styles["feature-amount"]}>
						{limits.maxMessageSize} KB
					</span>{" "}
					Max message size
				</div>
				<div className={styles.feature}>
					<Check />
					<span className={styles["feature-amount"]}>{limits.servers}</span>{" "}
					{limits.servers === 1 ? "Server" : "Servers"}
				</div>
			</div>
			{children}
		</article>
	);
};

export default PricingCard;
