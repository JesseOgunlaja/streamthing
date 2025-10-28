import { cachedIsSignedIn, createAccessToken } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function getAccessToken(
  request: NextRequest,
  session?: string | null
) {
  const access_token = request.cookies.get("access_token")?.value;
  const { signedIn } = await cachedIsSignedIn(access_token);

  return signedIn
    ? (access_token as string)
    : await createAccessToken(session || request.cookies.get("session")?.value);
}

export function isRouteInList(
  routes: string[],
  pathname: string,
  method: string
) {
  const filteredPathname = pathname.split("?")[0];
  return routes.some((route) => {
    let regexPattern = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    regexPattern = regexPattern.replace(/\\\[id\\\]/g, "([a-zA-Z0-9_-]+)");

    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(filteredPathname) && method === "GET";
  });
}
