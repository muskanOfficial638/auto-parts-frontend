/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { deletequote} from "@/app/utils/api";
import { toast } from "react-toastify";

export default function DeleteQuoteModal({
  open,
  requestId,
  onClose,
  onDeleted
}: {
  open: boolean;
  requestId: string;
  onClose: () => void;
  onDeleted: (status: string) => void;
}) {
  if (!open) return null;

  async function handleDeletePartRequest(quoteId: string) {
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    try {
      const response = await deletequote(
        loggedInUser?.access_token,
        "a5e209fe-3db0-4403-8e4d-3b6ea15b70a1"
      );

      if (response.data.detail.success) {
        toast.success("Quote deleted successfully");
        onDeleted("pending");
        onClose();
      }else {
        toast.error(response.data.detail.message || "Quote not Deleted");
         onClose();
      }
    } catch (err: any) {
      // Handle errors more gracefully
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Server error:", err.response.data);
        toast.error(err.response.data.detail || "log not found");
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response:", err.request);
        toast.error("No response from server");
      } else {
        // Something else happened
        console.error("Error:", err.message);
        toast.error("Unexpected error occurred");
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Delete Box */}
      <div className="relative bg-modalblue text-white w-xl max-w-full p-12 rounded-md shadow-xl border-2 border-borderblue">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-white cursor-pointer h-8 w-8 rounded-full m-2"
        >
          <span className="text-black">✕</span>
        </button>
        <div className="w-xl max-w-full">
          {/* Title */}
          <h2 className="text-center text-2xl leading-8 font-bold mb-12">
            Are you sure You want to delete this Quote?
          </h2>

          <div className="flex justify-center gap-8">
            <button
              onClick={() => handleDeletePartRequest(requestId)}
              className="bg-autoblue text-md w-full rounded-sm text-white py-4 font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className="bg-red-600 text-md w-full rounded-sm text-white py-4 font-semibold hover:bg-red-700 duration-400 cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
