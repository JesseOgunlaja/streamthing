import ServerDeleteButton from "@/components/protected/servers/ServerDeleteButton";
import ServerMenuButton from "@/components/protected/servers/ServerMenuButton";
import ServerRenameButton from "@/components/protected/servers/ServerRenameButton";
import { regions } from "@/constants/constants";
import { getUserFromHeaders } from "@/lib/server-utils";
import styles from "@/styles/protected/home/servers/servers.module.css";
import { GlobeIcon } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const user = await getUserFromHeaders();

  return (
    <main id={styles.main}>
      <div className={styles.servers}>
        {user.servers.map((server) => (
          <Link
            href={`/servers/${server.id}`}
            className={styles.server}
            key={server.id}
          >
            <p className={styles.name}>{server.name}</p>
            <p className={styles.region}>
              <GlobeIcon />
              {server.region} <span>({regions[server.region]})</span>
            </p>
            <ServerMenuButton />
            <span className={styles.popup}>
              <ServerRenameButton server={server} />
              <ServerDeleteButton server={server} />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Page;
