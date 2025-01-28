import StripeCheckoutStyleElement from "@/components/StripeCheckoutStyleElement";
import UserStateProvider from "@/components/UserStateProvider";
import { getUserFromHeaders } from "@/lib/server-utils";
import { LayoutPropsType } from "@/lib/types";

export default async function Layout({ children }: LayoutPropsType) {
  const user = await getUserFromHeaders();

  return (
    <>
      <StripeCheckoutStyleElement />
      <UserStateProvider user={user}>{children}</UserStateProvider>
    </>
  );
}
