import { access_token_config } from "@/constants/constants";
import { createAccessToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Token refreshed successfully" },
      { status: 200 }
    );

    const cookiesStore = await cookies();
    const session = cookiesStore.get("session")?.value;
    const access_token = await createAccessToken(session);
    response.cookies.set("access_token", access_token, access_token_config);

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error refreshing token:", error);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    );
  }
}
