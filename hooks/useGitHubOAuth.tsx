import {
  OptionsType as PromiseToastOptionsType,
  promiseToast,
} from "@/lib/lib";
import { useEffect } from "react";

type ActionType = (_code: string) => Promise<{
  ok: boolean;
  message: string;
}>;

export default function useGitHubOAuth(
  action: ActionType,
  options?: PromiseToastOptionsType
) {
  return useEffect(() => {
    (async () => {
      const url = window.location.href.replace(window.location.search, "");
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get("code");

      if (code) {
        history.replaceState(null, "", url);
        const promise = new Promise((resolve, reject) => {
          action(code).then((data) => {
            const { message, ok } = data;
            if (ok) resolve(message);
            else reject(message);
          });
        });

        promiseToast(promise, options);
      }
    })();
  }, []);
}
