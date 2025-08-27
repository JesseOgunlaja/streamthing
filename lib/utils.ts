import { FormSubmit, UserType } from "./types";

export function getFormValues(e: FormSubmit) {
  const formData = new FormData(e.currentTarget);
  const formValues = Object.fromEntries(formData.entries());
  return formValues as Record<string, string>;
}

export function areStrictlyEqual(val1: unknown, val2: unknown) {
  return JSON.stringify(val1) === JSON.stringify(val2);
}

export function indexOf<T>(array: T[], searchElement: T) {
  return array.findIndex((val) => areStrictlyEqual(val, searchElement));
}

export function generateUUID() {
  return crypto.randomUUID();
}

export function generateRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateRandomNumbers(length: number) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

export function hasExceededServerLimit(user: UserType) {
  return user.plan === "Hobby" && user.servers.length !== 0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findValueByKey<T extends Record<string, any>>(
  array: T[],
  key: keyof T,
  value: T[keyof T]
): T | undefined {
  return array.find((item) => item[key] === value);
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
