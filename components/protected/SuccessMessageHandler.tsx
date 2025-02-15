"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const SuccessMessageHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    setTimeout(() => {
      const successMessage = searchParams.get("success_message");
      if (successMessage) {
        toast.success(decodeURIComponent(successMessage));

        const newURL = new URL(window.location.href);
        newURL.searchParams.delete("success_message");
        newURL.searchParams.delete("auth");
        newURL.searchParams.delete("session");

        const newUrlString = newURL.toString().replace(/[?&]$/, "");
        window.history.pushState({}, "", newUrlString);
      }
    }, 100);
  }, [searchParams]);

  return null;
};

export default SuccessMessageHandler;
