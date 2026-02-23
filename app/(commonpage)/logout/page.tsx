"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("/api/auth/logout");
        toast.success("Logged out successfully");

        // Also clear localStorage if you have stored user data there
        localStorage.removeItem("autoPartsUserData");
        localStorage.removeItem("loginTime");
        localStorage.removeItem("lastActivity");

        router.push("/login");
      } catch (err) {
        toast.error("Failed to logout");
        console.error(err);
      }
    };

    logout();
  }, [router]);

  return null; // optionally you can show a spinner
}