"use client";

import { getUsage } from "@/actions/servers/usage";
import { Server, UsageData } from "@/lib/types";
import styles from "@/styles/protected/home/servers/server-usage.module.css";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "../../UserStateProvider";
import ServerMetrics from "./ServerMetrics";
import ServerUsageData from "./ServerUsage";

interface PropsType {
  startingUsage: UsageData;
  server?: Server;
}

const ServerDetails = ({ startingUsage, server }: PropsType) => {
  const user = useUser();
  const [usageData, setUsageData] = useState(startingUsage);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getUsage(server);
      if (!data) return;

      if ("message" in data) {
        return toast.error(
          "An unexpected error occurred, please refresh the page"
        );
      }
      setUsageData(data);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="server-details" className={styles.serverDetails}>
      <ServerUsageData user={user} usageData={usageData} />
      <ServerMetrics usageData={usageData} />
    </div>
  );
};

export default ServerDetails;
