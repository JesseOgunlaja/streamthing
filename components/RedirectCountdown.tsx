"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PropsType {
  time: number;
  redirectPath: string;
}

const RedirectCountdown = ({
  time: startingCount,
  redirectPath,
}: PropsType) => {
  const router = useRouter();
  const [count, setCount] = useState(startingCount);

  useEffect(() => {
    const timer = setInterval(() => {
      if (count === 0) router.push(redirectPath);
      else {
        setCount((prevCount) => {
          return prevCount - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [redirectPath]);

  return `${count} ${count === 1 ? "second" : "seconds"}`;
};

export default RedirectCountdown;
