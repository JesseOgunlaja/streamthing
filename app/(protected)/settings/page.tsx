import AuthSettings from "@/components/protected/settings/AuthSettings";
import BillingSettings from "@/components/protected/settings/BillingSettings";
import GeneralSettings from "@/components/protected/settings/GeneralSettings";
import SettingsNavbar from "@/components/protected/settings/Navbar";
import StripeDataProvider from "@/components/protected/settings/StripeDataProvider";
import { getUserFromHeaders } from "@/lib/server-utils";
import { GenericObject } from "@/lib/types";
import styles from "@/styles/protected/settings/page.module.css";
import { Menu } from "lucide-react";

interface PropsType {
  searchParams: Promise<GenericObject<string>>;
}

const validTabs = ["general", "authentication", "billing"];

const Page = async ({ searchParams }: PropsType) => {
  let { tab } = await searchParams;
  const user = await getUserFromHeaders();

  if (!validTabs.includes(tab)) tab = "general";

  return (
    <div className={styles.page}>
      <SettingsNavbar tab={tab} />
      <StripeDataProvider user={user}>
        <main id={styles[tab]} className={styles.main}>
          <h1>
            Account settings <Menu tabIndex={0} />
          </h1>

          {tab === "general" && <GeneralSettings />}
          {tab === "authentication" && <AuthSettings />}
          {tab === "billing" && <BillingSettings />}
        </main>
      </StripeDataProvider>
    </div>
  );
};

export default Page;
