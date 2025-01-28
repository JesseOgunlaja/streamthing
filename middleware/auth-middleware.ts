import { access_token_config } from "@/constants/constants";
import { cachedIsSignedIn } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "./utils";

export async function handleAuth(
  request: NextRequest,
  requestHeaders: Headers
) {
  const access_token = await getAccessToken(request);
  const { signedIn } = await cachedIsSignedIn(access_token);
  const back = request.nextUrl.searchParams.get("back");

  if (signedIn) {
    const response = NextResponse.redirect(
      new URL(back || "/dashboard", request.url),
      {
        headers: requestHeaders,
      }
    );
    response.cookies.set("access_token", access_token, access_token_config);
    return response;
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.cookies.delete("session");
  return response;
}

export async function handleProtectedRoute(
  request: NextRequest,
  requestHeaders: Headers,
  session?: string | null
) {
  const pathname = request.nextUrl.pathname;
  const access_token = await getAccessToken(request, session);
  const { signedIn, user } = await cachedIsSignedIn(access_token);
  if (!signedIn) {
    const response = NextResponse.redirect(
      new URL(`/signin?redirect_url=${pathname}`, request.url)
    );
    response.cookies.delete("session");
    return response;
  }

  const url = request.nextUrl.clone();
  url.searchParams.delete("auth");
  url.searchParams.delete("session");
  requestHeaders.set("user", JSON.stringify(user));

  const response = NextResponse.next({
    request: {
      ...new NextRequest(url, request),
      headers: requestHeaders,
    },
  });
  response.cookies.set("access_token", access_token, access_token_config);
  return response;
}
