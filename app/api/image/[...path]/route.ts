import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path } = params;

    if (!path || !path.length) {
      return new NextResponse("Invalid path", { status: 400 });
    }

    const imagePath = path.join("/");
    const url = `https://api.autopartsxchange.co.za/8000/image/${imagePath}`;

 
    const response = await fetch(url);

    if (!response.ok) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.startsWith("image/")) {
      const text = await response.text();
      console.error("Invalid image response:", text);
      return new NextResponse("Invalid image response", { status: 400 });
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("[image-proxy]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}