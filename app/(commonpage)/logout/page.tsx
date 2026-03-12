"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function LogoutPage() {
  const router = useRouter();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (hasLoggedOut.current) return;
    hasLoggedOut.current = true;

    const logout = async () => {
      try {
        await axios.post("/api/auth/logout");

        localStorage.removeItem("autoPartsUserData");
        localStorage.removeItem("loginTime");
        localStorage.removeItem("lastActivity");

        toast.success("Logged out successfully");

        router.push("/login");
      } catch (err) {
        toast.error("Failed to logout");
        console.error(err);
      }
    };

    logout();
  }, [router]);

  return null;
}