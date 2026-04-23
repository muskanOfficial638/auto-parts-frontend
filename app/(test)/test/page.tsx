"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/payment/create-session", {
        method: "POST",
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-500 text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Processing..." : "Pay ₹499"}
      </button>
    </div>
  );
}