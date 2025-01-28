import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  access_token_config,
  protectedPages,
  redirectPages,
} from "./constants/constants";
import { handleAuth, handleProtectedRoute } from "./middleware/auth-middleware";
import { addCSP } from "./middleware/csp-middleware";
import { getAccessToken, isRouteInList } from "./middleware/utils";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  const method = request.method;
  const session = request.nextUrl.searchParams.get("session");

  if (request.nextUrl.searchParams.get("auth") === "params") {
    (await cookies()).set("session", session as string);
  }

  addCSP(requestHeaders);
  if (isRouteInList(redirectPages, pathname, method)) {
    return handleAuth(request, requestHeaders);
  }
  if (isRouteInList(protectedPages, pathname, method)) {
    return handleProtectedRoute(request, requestHeaders, session);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  if (method !== "POST") {
    const new_access_token = await getAccessToken(request);
    response.cookies.set("access_token", new_access_token, access_token_config);
  }
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    },
  ],
};
