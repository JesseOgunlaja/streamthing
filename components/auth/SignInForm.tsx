"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signUpWithGithub } from "@/actions/auth/github-signin";
import { signin_internal } from "@/actions/auth/signin";
import useGitHubOAuth from "@/hooks/useGitHubOAuth";
import { cache } from "@/lib/cache";
import { promiseToast } from "@/lib/lib";
import { FormSubmit } from "@/lib/types";
import { getFormValues } from "@/lib/utils";
import styles from "@/styles/auth-form.module.css";
import ForgetPasswordExpand from "./ForgetPasswordExpand";

const signin = cache(signin_internal, { duration: 20 });

const SignInForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	useGitHubOAuth(signUpWithGithub, {
		successFunction: () => {
			router.replace("/dashboard");
		},
	});

	async function formSubmit(e: FormSubmit) {
		e.preventDefault();

		const formValues = getFormValues(e);
		const promise = new Promise((resolve, reject) => {
			signin(formValues.email, formValues.password).then((data) => {
				const { message, ok } = data;

				if (ok) resolve(message);
				else reject(message);
			});
		});

		const redirect_url = searchParams.get("redirect_url") || "/dashboard";
		promiseToast(promise, {
			customProps: {
				duration: 2000,
			},
			successFunction: () => router.push(redirect_url),
		});
	}

	return (
		<form onSubmit={formSubmit} className={styles.form}>
			<label htmlFor="signin-email">Email</label>
			<input
				id="signin-email"
				name="email"
				placeholder="your.name@email.com"
				type="text"
			/>
			<label htmlFor="signin-password">
				Password
				<ForgetPasswordExpand />
			</label>
			<input
				id="signin-password"
				name="password"
				placeholder="•••••••••"
				type="password"
			/>
			<input value="Sign in" type="submit" />
		</form>
	);
};

export default SignInForm;
