import { NextResponse } from "next/server";
import { authApiPath } from "@/app/utils/api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  const res = await fetch(`${authApiPath}/auth/verify-email?token=${token}`, {
    method: "GET",
  });

  const data = await res.json();
  const response = NextResponse.json(data);
  return response;
}


