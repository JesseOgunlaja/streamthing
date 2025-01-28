import { getUsage } from "@/actions/servers/usage";
import ServerDetails from "@/components/protected/servers/ServerDetails";
import styles from "@/styles/protected/home/dashboard.module.css";
import { toast } from "sonner";

const Page = async () => {
  const startingUsage = await getUsage();
  if ("message" in startingUsage) {
    return toast.error("An unexpected error occurred, please refresh the page");
  }

  return (
    <main id={styles.page}>
      <p>Overall usage</p>
      <ServerDetails startingUsage={startingUsage} />
    </main>
  );
};

export default Page;
