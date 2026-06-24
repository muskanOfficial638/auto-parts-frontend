import { NextRequest, NextResponse } from "next/server";
import { authApiPath } from "@/app/utils/api";

export async function GET(request: NextRequest) {
  const refresh = request.cookies.get("ATXRT")?.value;
  if (!refresh) {
    return NextResponse.json({}, { status: 401 });
  }
  return genToken(refresh);
}

export async function POST(request: NextRequest) {
  const refresh = request.cookies.get("ATXRT")?.value;
  if (!refresh) {
    return NextResponse.json({}, { status: 401 });
  }
  return genToken(refresh);
}


export async function PUT(request: NextRequest) {
  const refresh = request.cookies.get("ATXRT")?.value;
  if (!refresh) {
    return NextResponse.json({}, { status: 401 });
  }
  return genToken(refresh);
}

export async function DELETE(request: NextRequest) {
  const refresh = request.cookies.get("ATXRT")?.value;
  if (!refresh) {
    return NextResponse.json({}, { status: 401 });
  }
  return genToken(refresh);
}

export async function PATCH(request: NextRequest) {
  const refresh = request.cookies.get("ATXRT")?.value;
  if (!refresh) {
    return NextResponse.json({}, { status: 401 });
  }
  return genToken(refresh);
}




async function genToken(refresh: string) {
  try {
    const res = await fetch(`${authApiPath}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refresh }),
    });
    const data = await res.json();

    if (data.success) {
      const response = NextResponse.json({success: true,});
      response.cookies.set("ATXAT", data.access_token, {
        httpOnly: true,
        secure: true,     
        path: "/",
      });
      return response;
    }else {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 },
      );
    }

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 },
    );
  }
}
