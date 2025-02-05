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
      setCount((prevCount) => {
        if (prevCount > 0) return prevCount - 1;

        router.push(redirectPath);
        clearInterval(timer);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return `${count} ${count === 1 ? "second" : "seconds"}`;
};

export default RedirectCountdown;
