
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { cancelOrder } from "@/app/utils/api"; // Update API import

export default function CancelOrder({
  quoteId,
  open,
  onClose,
}: {
  quoteId: string;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const autoPartsUserData =
    typeof window !== "undefined"
      ? localStorage.getItem("autoPartsUserData")
      : null;

  const loggedInUser = JSON.parse(autoPartsUserData || "{}");

  if (!loggedInUser?.id && typeof window !== "undefined") {
    router.replace("/logout");
  }

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancelOrder = async () => {
    if (!acceptedTerms) {
      toast.error("Please accept the Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);

      const response = await cancelOrder(quoteId);

      if (response?.success) {
        toast.success("Order cancelled successfully!");
        onClose();
      
      } else {
        
        toast.error(
          response?.message || "Unable to cancel order."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-brandBlack text-white w-[700px] max-w-full rounded-[20px] p-8 md:p-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white cursor-pointer h-10 w-10 rounded-full flex items-center justify-center"
        >
          <span className="text-black text-lg">✕</span>
        </button>

        <div className="max-w-[600px] mx-auto">
          <h2 className="text-center text-3xl font-bold mb-6">
            Cancel Order
          </h2>

          <p className="text-center text-gray-300 mb-6">
            Please review and accept the terms before cancelling
            your order.
          </p>

          {/* Terms */}
          <div className="bg-[#1f1f1f] border border-gray-700 rounded-lg p-5 mb-6 max-h-[]">
            <h3 className="font-semibold text-lg mb-4">
              Terms & Conditions
            </h3>

            <ul className="list-disc pl-5 space-y-3 text-sm text-gray-300">
              <li>
                Once your cancellation request is submitted, it
                cannot be reversed.
              </li>

              <li>
                Refund eligibility depends on the current order
                status and company policy.
              </li>

              <li>
                Cancellation charges may apply where applicable.
              </li>


              <li>
                Orders already processed, dispatched, or delivered
                may not be eligible for cancellation.
              </li>

              <li>
                By proceeding, you confirm that you have read and
                accepted these terms.
              </li>
            </ul>
          </div>

          {/* Checkbox */}
          <label className="flex items-start gap-3 mb-8 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) =>
                setAcceptedTerms(e.target.checked)
              }
              className="mt-1 h-4 w-4"
            />

            <span className="text-sm text-gray-300">
              I have read and agree to the Terms & Conditions.
            </span>
          </label>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              disabled={!acceptedTerms || loading}
              onClick={handleCancelOrder}
              className={`w-full py-4 bg-red-600 rounded-sm font-semibold transition-all ${
                acceptedTerms && !loading
                  ? "  hover:bg-red-700 cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              {loading ? "Cancelling..." : "Confirm Cancel"}
            </button>

            <button
              onClick={onClose}
              disabled={loading}
              className="w-full py-4 rounded-sm font-semibold bg-autoblue hover:bg-hoverblue transition-all cursor-pointer"
            >
              Keep Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

