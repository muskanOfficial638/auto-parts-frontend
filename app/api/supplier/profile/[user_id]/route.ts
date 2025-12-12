import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("user_id") || "";

  const backendResponse = await fetch(
    `http://54.80.119.79:8005/v1/supplier/profile/${userId}`,
    { cache: "no-store" }
  );

  if (!backendResponse.ok) {
    return new Response("Backend request failed", { status: 500 });
  }

  const data = await backendResponse.json();
  return Response.json(data);
}
