import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("user_id") || "";
  const status = url.searchParams.get("status") || "";
  const page = url.searchParams.get("page") || "";
  const limit = url.searchParams.get("limit") || "";

  const backendResponse = await fetch(
    `http://54.80.119.79:8005/v1/supplier/quote/view?user_id=${userId}&status=${status}&page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );

  if (!backendResponse.ok) {
    return new Response("Backend request failed", { status: 500 });
  }

  const data = await backendResponse.json();
  return Response.json(data);
}
