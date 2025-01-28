"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import RedirectCountdown from "./RedirectCountdown";

interface PropsType {
  toastErrorText: string;
  redirectPath: string;
  id: string;
  page?: string;
}

const ErrorComponent = ({
  toastErrorText,
  redirectPath,
  page,
  id,
}: PropsType) => {
  const displayPage = page || redirectPath.replace("/", "");

  useEffect(() => {
    toast.error(toastErrorText);
  }, []);

  return (
    <div id={id}>
      <p>
        You will be redirected to the {displayPage} page in
        <RedirectCountdown time={5} redirectPath={redirectPath} />
      </p>
    </div>
  );
};

export default ErrorComponent;
