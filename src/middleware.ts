import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { jwtDecode } from "jwt-decode";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/verify",
  "/forgot-password",
  "/reset-password",
  "/unauthorized",
  "/not-found",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("walletwiseToken")?.value;
  if (!token && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);

      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("walletwiseToken");
        return response;
      }
    } catch {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("walletwiseToken");
      return response;
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
