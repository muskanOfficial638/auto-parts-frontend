"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";


import { toast } from "react-toastify";
import Header from "@/app/components/Header";

type PageProps = {
  params: Promise<{
    token: string;
  }>;
};
export default function VerifyTokenPage({ params }: PageProps) {
  const [status, setStatus] = useState(true); // 
  const router = useRouter();

  // 👇 IMPORTANT: params ko unwrap karna padega
  const { token } = use(params);

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {

      const res = await fetch(
        `http://54.80.119.79/:8001/v1/auth/verify-email?token=${token}`
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Email verified successfully!");
        router.push("/login");
      } else {
        setStatus(false);
        toast.error(data.message || "Invalid or expired token");

      }

    };

    verifyEmail();
  }, [token, router]);

  return (
   <div
        className="min-h-screen bg-black text-white flex flex-col overflow-hidden"      
      >
        <Header />
        <div
          className="flex-1 flex justify-center bg-cover bg-center bg-black pt-[90px] "
          style={{
            backgroundImage: "url('/signInNewBg.jpg')",
          }}
        >
          <div className="rounded-xl shadow-lg w-full lg:pt-0 pt-[30px] px-[20px] pb-[20px] flex items-center">        
              <div className="w-[650px]  max-w-[100%] ms-[auto] me-[auto] bg-[#1d4aa4]/15 backdrop-blur-xl  p-[25px] rounded-[20px] shadow-xl flex flex-col items-center border-2 border-borderblue">
            {status ? ( <>
              <h1 className="text-2xl font-bold mb-4 text-white">Verifying your email...</h1>
              <p className="text-gray-600 text-white">Please wait while we verify your email address.</p>
              </>
            ):(<>
              <h1 className="text-2xl font-bold mb-4 text-white">Email Verification Failed</h1>
              <p className="text-gray-600 text-white">The verification link is invalid or has expired.</p>
              </>
            )}
            
          </div>

        </div>
      </div>
    </div>

  );
}