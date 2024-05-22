import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    const authorization = cookies().get("Authorization");
    if (!authorization) {
      return NextResponse.json(
        {
          message: "You are not authorized",
        },
        { status: 401 }
      );
    }
    const [bearer, token] = authorization.value.split(" ");
    if (bearer !== "Bearer" || !token) {
      return NextResponse.json(
        {
          message: "You are not authorized",
        },
        { status: 401 }
      );
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

    const { payload } = await jwtVerify<{
      _id: string;
      username: string;
      email: string;
    }>(token, secret);
    if (!payload) {
      return NextResponse.json(
        {
          message: "You are not authorized",
        },
        { status: 401 }
      );
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("userId", payload._id);
    requestHeaders.set("username", payload.username);
    requestHeaders.set("email", payload.email);

    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });

    return response;
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    const authorization = cookies().get("Authorization");
    if (authorization) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    const authorization = cookies().get("Authorization");
    if (!authorization) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
