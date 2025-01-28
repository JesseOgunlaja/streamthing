import { regions } from "@/constants/constants";
import { Server } from "@/lib/types";
import styles from "@/styles/protected/home/servers/server.module.css";
import ServerCredential from "./ServerCredential";

interface PropsType {
  server: Server;
}

const ServerCredentials = ({ server }: PropsType) => {
  return (
    <article className={styles.serverCredentials}>
      <ServerCredential name="Name" value={server.name} />
      <ServerCredential name="ID" value={server.id} />
      <ServerCredential
        name="Region"
        value={regions[server.region]}
        copyValue={server.region}
      />
      <ServerCredential name="Password" value={server.password} hidden />
    </article>
  );
};

export default ServerCredentials;
