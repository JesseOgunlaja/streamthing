import { notFound } from "next/navigation";
import { toast } from "sonner";
import { getUsage } from "@/actions/servers/usage";
import DeleteServerDialog from "@/components/protected/servers/DeleteServerDialog";
import RenameServerDialog from "@/components/protected/servers/RenameServerDialog";
import ResetServerPasswordDialog from "@/components/protected/servers/ResetServerPassword";
import ServerCredentials from "@/components/protected/servers/ServerCredentials";
import ServerDetails from "@/components/protected/servers/ServerDetails";
import { getUserFromHeaders } from "@/lib/server-utils";
import styles from "@/styles/protected/home/servers/server.module.css";

interface PropsType {
	params: Promise<{
		id: string;
	}>;
}

const Page = async ({ params }: PropsType) => {
	const user = await getUserFromHeaders();
	const serverID = (await params).id;

	const server = user.servers.find((server) => server.id === serverID);
	if (!server) notFound();

	const startingUsage = await getUsage(server);
	if ("message" in startingUsage) {
		return toast.error("An unexpected error occurred, please refresh the page");
	}

	return (
		<div id={styles.page}>
			<RenameServerDialog server={server} />
			<DeleteServerDialog server={server} />
			<ResetServerPasswordDialog server={server} />
			<ServerCredentials server={server} />
			<ServerDetails startingUsage={startingUsage} server={server} />
		</div>
	);
};

export default Page;
