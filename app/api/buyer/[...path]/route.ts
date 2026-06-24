import { authApiPath, buyerAPI } from "@/app/utils/api";
import { NextRequest, NextResponse } from "next/server";

// ---------- GET ----------
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  return handle(request, context);
}

// ---------- POST ----------
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  return handle(request, context);
}

// ---------- PUT ----------
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  return handle(request, context);
}

// ---------- PATCH ----------
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  return handle(request, context);
}

// ---------- DELETE ----------
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  return handle(request, context);
}

interface NodeRequestInit extends RequestInit {
  duplex?: "half";
}

// ---------- COMMON ----------
async function handle(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  try {
    const { path } = await context.params;
    const search = request.nextUrl.search;

    if (!path || path.length === 0) {
      return NextResponse.json(
        { error: "Invalid API path" },
        { status: 400 }
      );
    }

    const apiPath = path.join("/");

    const token = request.cookies.get("ATXAT")?.value;
    const refreshToken = request.cookies.get("ATXRT")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const url = `${buyerAPI}/${apiPath}${search}`;

    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("content-length");
    headers.set("Authorization", `Bearer ${token}`);

    // Body ko ek baar read karo
    const bodyData =
      request.method !== "GET" && request.method !== "HEAD"
        ? await request.text()
        : undefined;

    const apiRes = await fetch(url, {
      method: request.method,
      headers,
      body: bodyData,
      duplex: "half",
    } as NodeRequestInit);


    if (apiRes.status === 401) {
      return refreshAndRetry(
        refreshToken,
        url,
        request.method,
        headers,
        bodyData
      );
    }

    const data = await apiRes.json();

    if (apiRes.status === 403) {
      if (data.detail === "User account is inactive") {
        const response = NextResponse.json(
          { error: "User account is inactive" },
          { status: 403 }
        );
        response.cookies.delete("ATXAT");
        response.cookies.delete("ATXRT");
        response.cookies.delete("ATXDT");

        return response;
      }

      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json(data, {
      status: apiRes.status,
    });

  } catch (err) {
    console.error("Proxy Error:", err);

    return NextResponse.json(
      { error: "Proxy failed" },
      { status: 500 }
    );
  }
}

// ---------- REFRESH + RETRY ----------
async function refreshAndRetry(
  refreshToken: string | undefined,
  url: string,
  method: string,
  headers: Headers,
  bodyData?: string
) {
  try {
    if (!refreshToken) {
      return logoutResponse();
    }

    const refreshRes = await fetch(
      `${authApiPath}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      }
    );

    const refreshData = await refreshRes.json();

    if (!refreshData.success || !refreshData.access_token) {
      return logoutResponse();
    }

    const newAccessToken = refreshData.access_token;

    headers.set(
      "Authorization",
      `Bearer ${newAccessToken}`
    );

    const retryRes = await fetch(url, {
      method,
      headers,
      body: bodyData,
      duplex: "half",
    } as NodeRequestInit);

    const retryData = await retryRes.json();

    const response = NextResponse.json(
      retryData,
      {
        status: retryRes.status,
      }
    );

    response.cookies.set("ATXAT", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return response;

  } catch (err) {
    console.error("Refresh Error:", err);

    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    );
  }
}

// ---------- LOGOUT ----------
function logoutResponse() {
  const response = NextResponse.json(
    { error: "Session expired" },
    { status: 401 }
  );

  response.cookies.delete("ATXAT");
  response.cookies.delete("ATXRT");
  response.cookies.delete("ATXDT");

  return response;
}