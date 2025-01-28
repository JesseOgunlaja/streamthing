import Footer from "@/components/Footer";
import UserStateProvider from "@/components/UserStateProvider";
import ProtectedNavbar from "@/components/navbar/ProtectedNavbar";
import PurchasePlan from "@/components/protected/PurchasePlan";
import SuccessMessageHandler from "@/components/protected/SuccessMessageHandler";
import VerifyEmail from "@/components/protected/VerifyEmail";
import { getUserFromHeaders } from "@/lib/server-utils";
import { LayoutPropsType } from "@/lib/types";

export default async function Layout({ children }: LayoutPropsType) {
  const user = await getUserFromHeaders();

  return (
    <UserStateProvider user={user}>
      <ProtectedNavbar />
      <SuccessMessageHandler />
      {!user.verified ? (
        <VerifyEmail />
      ) : user.plan === "Pending" ? (
        <PurchasePlan />
      ) : (
        children
      )}
      <Footer />
    </UserStateProvider>
  );
}
