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
    let redirect = false;
    const interval = setInterval(() => {
      if (redirect) router.push(redirectPath);
      setCount((prevCount) => {
        if (prevCount < 1) {
          redirect = true;
        }
        if (prevCount <= 0) return prevCount;
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return `${count} ${count === 1 ? "second" : "seconds  "}`;
};

export default RedirectCountdown;
