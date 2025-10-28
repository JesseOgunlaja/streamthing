"use cache";

import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";
import styles from "@/styles/auth-form.module.css";

const Page = async () => {
	return (
		<main className={styles.page}>
			<div className={styles.container}>
				<h1>Reset password</h1>
				<hr className={styles.separator} />
				<ForgetPasswordForm />
			</div>
		</main>
	);
};

export default Page;
