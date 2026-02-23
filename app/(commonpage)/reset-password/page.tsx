"use client";

import { Suspense } from "react";
import ResetPassword from "@/app/components/auth/ResetPassword";
export default function ResetPasswordPage() {
  return (
       <Suspense fallback={<div>Loading...</div>}>
    <ResetPassword></ResetPassword>
      </Suspense>
  );
}