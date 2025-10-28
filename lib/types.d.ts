/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormEvent } from "react";

export interface UserType {
	id: string;
	name: string;
	email: string;
	password: string;
	githubID: string;
	githubLogin: string;
	verified: boolean;
	auth: ("Internal" | "GitHub")[];
	servers: Server[];
	plan: "Hobby" | "Startup" | "Premium" | "Enterprise" | "Pending";
	stripe_customer_id: string;
	stripe_subscription_id: string;
	profilePicture: string;
	profilePictureID: string;
}

export interface UsageData {
	connections: number;
	messages: number;
	peakConnections: number;
	connectionsToday: number;
	dataTransfer: number;
	maxMessageSize: number;
}

export interface Server {
	name: string;
	region: string;
	id: string;
	password: string;
	owner: string;
}
export interface SessionData {
	email: string;
	id: string;
	auth: "GitHub" | "Internal";
	createdAt: string;
	ip: string;
	active: boolean;
}

export type Theme = "light" | "dark";

export type GenericFunction<T = unknown> = (..._args: never[]) => T;
export type AsyncFunction<T = unknown> = (..._args: never[]) => Promise<T>;
export type GenericObject<T = unknown> = Record<any, T>;
export type GenericValue = string | number | boolean | Record<string, unknown>;
export type ReturnTypeOrAwaited<T extends GenericFunction> = T extends (
	..._args: any[]
) => Promise<any>
	? Awaited<ReturnType<T>>
	: ReturnType<T>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type Children = React.ReactNode;
export type LayoutPropsType = Readonly<{
	children: Children;
}>;

export interface BasePaymentMethod {
	active: boolean;
	id: string;
}

export interface PaymentMethod extends BasePaymentMethod {
	type: "card";
	brand: string;
	exp: string;
	number: string;
}

export type ThemeType = "light" | "dark";
export type NonNullableProperties<T> = {
	[K in keyof T]: NonNullable<T[K]>;
};
