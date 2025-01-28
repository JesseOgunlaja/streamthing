"use client";

import { decryptString } from "@/lib/encryption";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const SuccessMessageHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    setTimeout(() => {
      const successMessage = searchParams.get("success_message");
      if (successMessage) {
        try {
          toast.success(decryptString(decodeURIComponent(successMessage)));

          const newURL = new URL(window.location.href);
          newURL.searchParams.delete("success_message");

          const newUrlString = newURL.toString().replace(/[?&]$/, "");

          window.history.pushState({}, "", newUrlString);
        } catch (error) {
          console.error(error);
        }
      }
    }, 100);
  }, [searchParams]);

  return null;
};

export default SuccessMessageHandler;
