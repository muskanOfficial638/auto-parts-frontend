/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ user_id: string }> }
) {
  const { user_id } = await context.params;

  try {
    const response = await axios.get(
      `http://54.80.119.79:8005/v1/supplier/profile/${user_id}`,
      { responseType: "json" }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Failed to fetch supplier profile:", error.message);
    return new Response("Internal server error", { status: 500 });
  }
}
