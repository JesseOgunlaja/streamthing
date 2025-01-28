import numeral from "numeral";
import { toast } from "sonner";
import { GenericFunction } from "./types";

export function closeDialog(dialog: HTMLDialogElement | null | string) {
  if (!dialog) return;

  if (typeof dialog === "string") {
    const dialogElement = document.getElementById(dialog) as HTMLDialogElement;
    dialogElement.style.display = "none";
    dialogElement.close();
  } else {
    dialog.style.display = "none";
    dialog.close();
  }
}

export function openDialog(
  dialog: HTMLDialogElement | null | string,
  display = "flex"
) {
  if (!dialog) return;

  if (typeof dialog === "string") {
    const dialogElement = document.getElementById(dialog) as HTMLDialogElement;
    dialogElement.style.display = display;
    dialogElement.show();

    return dialogElement;
  } else {
    dialog.style.display = display;
    dialog.show();

    return dialog;
  }
}

export function formatTimestamp(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

export function formatNumber(number: string | number) {
  return numeral(number)
    .format("0.0a")
    .replace(".0", "")
    .replace("m", " million");
}

export interface OptionsType {
  customProps?: Partial<Parameters<typeof toast.promise>[1]>;
  successFunction?: GenericFunction;
  errorFunction?: GenericFunction;
}

export function promiseToast(
  promise: Promise<unknown>,
  options: OptionsType = {}
) {
  const { customProps, successFunction, errorFunction } = options;

  toast.promise(promise, {
    ...customProps,
    loading: "Loading...",
    success: (data) => {
      successFunction && successFunction();
      return data as string;
    },
    error: (data) => {
      errorFunction && errorFunction();
      return data;
    },
  });
}
