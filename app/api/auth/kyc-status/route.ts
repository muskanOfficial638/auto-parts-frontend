import { NextResponse } from "next/server";
import { authApiPath } from "@/app/utils/api";

export async function POST(req: NextResponse) {
  const body = await req.json();
    const token = req.cookies.get("ATXAT")?.value;

  const res = await fetch(`${authApiPath}/auth/verify-kyc` ,{
    method: "POST",
    body: JSON.stringify(body),
    headers:{ "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
     }
   
  });

  const data = await res.json();

  console.log("KYC Status Response:", data);
  const response = NextResponse.json(data.user);
  if(data.user.role !== "admin"){

  response.cookies.set("ATXDT",JSON.stringify( data.user), {
    httpOnly: true,
    secure: true,
    path: "/",
  });
}

  return response;
}
