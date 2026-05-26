import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authApiPath } from "./app/utils/api";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  const token = request.cookies.get("ATXAT")?.value;
  const tokenR = request.cookies.get("ATXRT")?.value;
  const userData = JSON.parse(request.cookies.get("ATXDT")?.value || "{}");

  if (url.pathname == "/login" || url.pathname == "/sign-up") {
    if (userData?.role === "buyer") {
      return NextResponse.redirect(new URL("/buyer-dashboard", request.url));
    }
    if (userData?.role === "supplier") {
      return NextResponse.redirect(new URL("/supplier-dashboard", request.url));
    }
    return NextResponse.next();
  }

  async function genToken() {
    try {
      const res = await fetch(`${authApiPath}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: tokenR }),
      });
      const data = await res.json();
      if (data.success) {
        const response = NextResponse.next();
        response.cookies.set("ATXAT", data.access_token, {
          httpOnly: true,
          secure: true,
          path: "/",
        });
        return response;
      } else {
        url.pathname = "/logout";
        return NextResponse.redirect(url);
      }
    } catch (err) {
      console.error(err);
      url.pathname = "/logout";
      return NextResponse.redirect(url);
    }
  }

  if (
    userData.role == "supplier" &&
    userData.profile.kyc_status !== "approved" &&
    url.pathname !== "/kyc-info"
  ) {
    return NextResponse.redirect(new URL("/kyc-info", request.url));
  }

  if (url.pathname == "/kyc-info") {
    const res = await fetch(`${authApiPath}/auth/verify-kyc`, {
      method: "POST",
      body: JSON.stringify({ user_id: userData.id }),
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.status) {
      const response = NextResponse.next();
        response.cookies.set("ATXDT", JSON.stringify(data.data), {
          httpOnly: true,
          secure: true,
          path: "/",
        });
    return response;
    }
     return NextResponse.next();
  }

  const buyerRoutes = ["/buyer-dashboard", "/request-part", "/orders"];
  const supplierRoutes = ["/supplier-dashboard", "/my-quote", "/kyc-info"];

  if (!userData.role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const role = userData?.role;
  if (
    role === "buyer" &&
    supplierRoutes.some((route) => url.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/buyer-dashboard", request.url));
  }
  if (
    role === "supplier" &&
    buyerRoutes.some((route) => url.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/supplier-dashboard", request.url));
  }

  if (token) {
    try {
      const res = await fetch(`${authApiPath}/auth/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });

      if (res.status == 200) {
        return NextResponse.next();
      } else if (res.status == 401) {
        return genToken();
      } else {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    } catch (err) {
      url.pathname = "/login";

      return NextResponse.redirect(url);
      console.log(err);
    }
  } else if (!tokenR) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (!token && tokenR) {
    return genToken();
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/buyer-dashboard",
    "/request-part",
    "/my-quote",
    "/supplier-dashboard",
    "/my-account",
    "/view-part-request/:path*",
    "/orders/:path*",
    "/kyc-info",
    "/login",
    "/sign-up",
  ],
};
