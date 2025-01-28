import { isSignedIn } from "@/lib/auth";
import { cookies } from "next/headers";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = async () => {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { signedIn, user } = await isSignedIn(access_token);

  return (
    <>
      <DesktopNavbar signedIn={signedIn} user={user} />
      <MobileNavbar signedIn={signedIn} user={user} />
    </>
  );
};

export default Navbar;
